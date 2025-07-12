from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import os
import tempfile
import threading
import time
from pathlib import Path
import google.generativeai as genai
import pyttsx3

# Import the text extraction functions
from ocr_text_extractor import extract_text_from_pdf, extract_text_from_image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Gemini API
GOOGLE_API_KEY = "AIzaSyCK3hk8fVMkzF9NrL2-nRLCBeZZ2CtpB_0"
genai.configure(api_key=GOOGLE_API_KEY)

# Store extracted text for current session
session_data = {
    "current_text": "",
    "current_filename": ""
}

# Global variables for TTS control
tts_thread = None
is_reading = False
tts_lock = threading.Lock()
tts_engine = None

# Add a global variable for volume
tts_volume = 1.0  # 0.0 to 1.0

def text_to_speech(text):
    """Text-to-speech function that reads the provided text aloud"""
    global tts_engine
    global is_reading
    global tts_volume
    
    try:
        # Create a local engine that doesn't depend on global state
        local_engine = pyttsx3.init()
        
        # Update global reference for volume control
        with tts_lock:
            if not is_reading:
                return
            tts_engine = local_engine
        
        # Configure TTS with current volume
        voices = local_engine.getProperty('voices')
        print("\nAvailable voices:")
        for i, voice in enumerate(voices):
            print(f"{i}: {voice.name}")
            
        local_engine.setProperty('voice', voices[0].id)
        local_engine.setProperty('rate', 150)
        local_engine.setProperty('volume', tts_volume)
        
        # Add the text to speak
        local_engine.say(text)
        
        # Run speech in this thread
        local_engine.startLoop(False)  # Start non-blocking loop
        
        # Process speech in small chunks to allow interruption
        while local_engine.isBusy() and is_reading:
            local_engine.iterate()
            time.sleep(0.1)
            
        # Properly end the loop
        local_engine.endLoop()
            
    except Exception as e:
        print(f"TTS Error: {str(e)}")
    finally:
        # Cleanup
        with tts_lock:
            if tts_engine == local_engine:
                tts_engine = None
            is_reading = False

def start_tts_in_background(text):
    """Start TTS in a background thread"""
    global tts_thread
    global is_reading
    
    with tts_lock:
        # Only start if not already reading
        if is_reading:
            return False
        
        # Set flag first
        is_reading = True
        
    # Create and start thread
    tts_thread = threading.Thread(target=text_to_speech, args=(text,), daemon=True)
    tts_thread.start()
    return True

# HTML template for the homepage
homepage_html = """
<!DOCTYPE html>
<html>
<head>
    <title>InVisionEd API</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1 {
            color: #0066cc;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        h2 {
            color: #444;
            margin-top: 30px;
        }
        pre {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .endpoint {
            background-color: #e9f5ff;
            border-left: 4px solid #0066cc;
            padding: 15px;
            margin: 20px 0;
        }
        footer {
            margin-top: 50px;
            border-top: 1px solid #eee;
            padding-top: 20px;
            color: #777;
            font-size: 0.9em;
        }
        .highlight {
            font-weight: bold;
            color: #0066cc;
        }
    </style>
</head>
<body>
    <h1>InVisionEd API</h1>
    <p>Welcome to the InVisionEd backend API. This server processes files for the InVisionEd application, 
       extracting text from PDFs and images using OCR technology.</p>
    
    <h2>Available Endpoints</h2>
    
    <div class="endpoint">
        <h3>POST /process-file</h3>
        <p>Upload a file (PDF or image) to extract text content.</p>
    </div>
    
    <div class="endpoint">
        <h3>GET /summarize-text</h3>
        <p>Summarize the last extracted text using Gemini AI.</p>
    </div>
    
    <div class="endpoint">
        <h3>GET /read-aloud</h3>
        <p>Read the last extracted text aloud.</p>
    </div>
    
    <div class="endpoint">
        <h3>GET /summarize-and-read</h3>
        <p>Summarize and read aloud the last extracted text.</p>
    </div>
    
    <h2>Supported File Types</h2>
    <ul>
        <li>PDF documents (.pdf)</li>
        <li>Images (.jpg, .jpeg, .png,.bmp,.tiff)</li>
    </ul>
    
    <h2>Testing the API</h2>
    <p>You can test file uploads using the form below:</p>
    
    <form id="upload-form" enctype="multipart/form-data">
        <input type="file" id="file-input" name="file" accept=".pdf,.jpg,.jpeg,.png,.bmp,.tiff">
        <button type="submit">Upload & Process</button>
    </form>
    
    <div id="result" style="margin-top: 20px;"></div>
    
    <div id="actions" style="margin-top: 20px; display: none;">
        <h3>Actions</h3>
        <button id="summarize-btn">Summarize Text</button>
        <button id="read-btn">Read Aloud</button>
        <button id="summarize-read-btn">Summarize & Read</button>
        <button id="stop-btn" style="background-color: #ff4444; color: white; margin-left: 10px; display: none;">Stop Reading</button>
    </div>
    
    <script>
        document.getElementById('upload-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p>Processing file...</p>';
            
            const fileInput = document.getElementById('file-input');
            if (!fileInput.files.length) {
                resultDiv.innerHTML = '<p style="color:red">Please select a file first.</p>';
                return;
            }
            
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            
            try {
                const response = await fetch('/process-file', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    throw new Error('Server returned ' + response.status);
                }
                
                const data = await response.json();
                resultDiv.innerHTML = `
                    <h3>Processing Results:</h3>
                    <p><strong>File:</strong> ${data.filename}</p>
                    <p><strong>Extracted Text:</strong></p>
                    <pre style="max-height: 300px; overflow-y: auto;">${data.text}</pre>
                `;
                
                // Show action buttons
                document.getElementById('actions').style.display = 'block';
            } catch (error) {
                resultDiv.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
            }
        });
        
        // Check reading status periodically
        let statusInterval = null;
        
        function startStatusCheck() {
            document.getElementById('stop-btn').style.display = 'inline-block';
            document.getElementById('read-btn').disabled = true;
            document.getElementById('summarize-read-btn').disabled = true;
            
            // Poll status every second
            statusInterval = setInterval(async () => {
                try {
                    const response = await fetch('/reading-status');
                    const data = await response.json();
                    
                    if (!data.is_reading) {
                        stopStatusCheck();
                    }
                } catch (error) {
                    console.error('Error checking status:', error);
                }
            }, 1000);
        }
        
        function stopStatusCheck() {
            clearInterval(statusInterval);
            document.getElementById('stop-btn').style.display = 'none';
            document.getElementById('read-btn').disabled = false;
            document.getElementById('summarize-read-btn').disabled = false;
        }
        
        // Setup action buttons
        document.getElementById('summarize-btn').addEventListener('click', async () => {
            const resultDiv = document.getElementById('result');
            try {
                const response = await fetch('/summarize-text');
                if (!response.ok) throw new Error('Server returned ' + response.status);
                const data = await response.json();
                
                resultDiv.innerHTML += `
                    <h3>Summary:</h3>
                    <pre style="max-height: 300px; overflow-y: auto;">${data.summary}</pre>
                `;
            } catch (error) {
                resultDiv.innerHTML += `<p style="color:red">Error: ${error.message}</p>`;
            }
        });
        
        document.getElementById('read-btn').addEventListener('click', async () => {
            const resultDiv = document.getElementById('result');
            try {
                resultDiv.innerHTML += '<p>Reading text aloud...</p>';
                const response = await fetch('/read-aloud');
                if (response.ok) {
                    startStatusCheck();
                }
            } catch (error) {
                resultDiv.innerHTML += `<p style="color:red">Error: ${error.message}</p>`;
            }
        });
        
        document.getElementById('stop-btn').addEventListener('click', async () => {
            try {
                await fetch('/stop-reading');
                stopStatusCheck();
                document.getElementById('result').innerHTML += '<p>Reading stopped.</p>';
            } catch (error) {
                console.error('Error stopping reading:', error);
            }
        });
        
        document.getElementById('summarize-read-btn').addEventListener('click', async () => {
            const resultDiv = document.getElementById('result');
            try {
                const response = await fetch('/summarize-and-read');
                if (!response.ok) throw new Error('Server returned ' + response.status);
                const data = await response.json();
                
                resultDiv.innerHTML += `
                    <h3>Summary (Being Read Aloud):</h3>
                    <pre style="max-height: 300px; overflow-y: auto;">${data.summary}</pre>
                `;
                
                if (response.ok && data.message.includes("Reading")) {
                    startStatusCheck();
                }
            } catch (error) {
                resultDiv.innerHTML += `<p style="color:red">Error: ${error.message}</p>`;
            }
        });
    </script>
    
    <footer>
        <p>InVisionEd API Server | Where Voice Meets Vision, and Knowledge Knows No Boundaries.</p>
    </footer>
</body>
</html>
"""

# --- Route handlers ---
# DEFINE EACH ROUTE ONLY ONCE

@app.route('/')
def index():
    return render_template_string(homepage_html)

@app.route('/process-file', methods=['POST'])
def process_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save uploaded file to temporary location
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(temp_dir, file.filename)
    file.save(temp_path)
    
    try:
        # Process file based on extension
        ext = Path(file.filename).suffix.lower()
        if ext in [".jpg", ".jpeg", ".png", ".bmp", ".tiff"]:
            text = extract_text_from_image(temp_path)
        elif ext == ".pdf":
            text = extract_text_from_pdf(temp_path)
        else:
            return jsonify({"error": "Unsupported file format"}), 400
        
        # Store the text for later use
        session_data["current_text"] = text
        session_data["current_filename"] = file.filename
        
        # Return extracted text
        return jsonify({
            "text": text,
            "filename": file.filename
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.route('/summarize-text', methods=['GET'])
def summarize_text_route():
    if not session_data["current_text"]:
        return jsonify({"error": "No text has been extracted yet"}), 400
    
    summary = summarize_text(session_data["current_text"])
    
    return jsonify({
        "summary": summary,
        "original_text": session_data["current_text"],
        "filename": session_data["current_filename"]
    })

@app.route('/read-aloud', methods=['GET'])
def read_aloud_route():
    """API endpoint to read text aloud"""
    if not session_data["current_text"]:
        return jsonify({"error": "No text has been extracted yet"}), 400
    
    success = start_tts_in_background(session_data["current_text"])
    
    if not success:
        return jsonify({"error": "Reading already in progress"}), 409
    
    return jsonify({
        "message": "Reading text aloud",
        "status": "started"
    })

@app.route('/stop-reading', methods=['GET'])
def stop_reading_route():
    """API endpoint to stop reading"""
    global is_reading
    global tts_engine
    
    with tts_lock:
        was_reading = is_reading
        is_reading = False
        
        # Try to stop the engine if it exists
        if tts_engine:
            try:
                # Try to end any ongoing processing
                tts_engine.stop()
            except Exception as e:
                print(f"Error stopping TTS: {e}")
    
    return jsonify({
        "message": "Reading stopped" if was_reading else "No reading in progress",
        "status": "stopped" if was_reading else "idle"
    })

@app.route('/reading-status', methods=['GET'])
def reading_status_route():
    """API endpoint to check reading status"""
    with tts_lock:
        status = is_reading
    
    return jsonify({
        "is_reading": status
    })

# Add this route to control volume

@app.route('/adjust-volume', methods=['GET'])
def adjust_volume_route():
    """API endpoint to adjust TTS volume"""
    global tts_volume
    global tts_engine
    
    try:
        volume = request.args.get('volume', default=80, type=int)
        # Convert from 0-100 range to 0.0-1.0 range
        tts_volume = max(0.0, min(1.0, volume / 100.0))
        
        # If there's an active TTS engine, update its volume
        if tts_engine:
            tts_engine.setProperty('volume', tts_volume)
        
        return jsonify({
            "message": f"Volume adjusted to {volume}%",
            "volume": volume
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Make sure you have this function for summarization
def summarize_text(text):
    """Use Gemini API to summarize text"""
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(
            f"Please summarize the following text concisely:\n\n{text}"
        )
        return response.text
    except Exception as e:
        print(f"Error in summarization: {e}")
        return f"Failed to summarize text: {str(e)}"

@app.route('/summarize-and-read', methods=['GET'])
def summarize_and_read_route():
    """API endpoint to summarize text and read it aloud"""
    if not session_data["current_text"]:
        return jsonify({"error": "No text has been extracted yet"}), 400
    
    summary = summarize_text(session_data["current_text"])
    
    # Start TTS in background
    success = start_tts_in_background(summary)
    
    return jsonify({
        "summary": summary,
        "message": "Reading summary aloud" if success else "Summary created but reading already in progress",
        "status": "started" if success else "queued"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)