#importing libraries and packages
import os
import sys
import queue
import json
import sounddevice as sd
import vosk
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import fitz  
import pyttsx3
from langdetect import detect
from pathlib import Path

# ---------- SPEECH-TO-TEXT USING VOSK ----------
def recognize_command(model_path):
    if not os.path.exists(model_path):
        print(f"Model not found at: {model_path}")
        return ""

    print("\n Loading Vosk model...")
    model = vosk.Model(model_path)
    q = queue.Queue()

    def callback(indata, frames, time, status):
        if status:
            print(status, file=sys.stderr)
        q.put(bytes(indata))

    print("\n Speak your command (e.g., 'read file')...")

    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16',
                           channels=1, callback=callback):
        rec = vosk.KaldiRecognizer(model, 16000)
        try:
            while True:
                data = q.get()
                if rec.AcceptWaveform(data):
                    result = json.loads(rec.Result())
                    text = result.get("text", "")
                    if text:
                        print(f" You said: {text}")
                        return text
        except KeyboardInterrupt:
            print("\n Exiting voice input.")
        except Exception as e:
            print("Error:", e)

    return ""

# ---------- FILE PROCESSING ----------
def extract_text_from_pdf(file_path):
    text = ""
    try:
        doc = fitz.open(file_path)
        for page in doc:
            page_text = page.get_text()
            text += page_text
        if not text.strip():
            raise ValueError("Empty text. Trying OCR fallback...")
    except Exception as e:
        print("Trying OCR for scanned PDF...")
        images = convert_from_path(file_path)
        for img in images:
            text += pytesseract.image_to_string(img)
    return text

def extract_text_from_image(file_path):
    image = Image.open(file_path)
    text = pytesseract.image_to_string(image)
    return text

def detect_language(text):
    try:
        lang = detect(text)
        return lang
    except:
        return "en"

# ---------- TEXT-TO-SPEECH ----------
def text_to_speech(text):
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    
    print("\nAvailable voices:")
    for i, voice in enumerate(voices):
        print(f"{i}: {voice.name} - {voice.languages}")
    
    engine.setProperty('voice', voices[0].id)
    engine.setProperty('rate', 150)
    engine.say(text)
    engine.runAndWait()

# ---------- PROCESS FILE ----------
def process_file(file_path):
    ext = Path(file_path).suffix.lower()
    if ext in [".jpg", ".jpeg", ".png", ".bmp", ".tiff"]:
        text = extract_text_from_image(file_path)
    elif ext == ".pdf":
        text = extract_text_from_pdf(file_path)
    else:
        raise ValueError("Unsupported file format")
    
    print("\n Extracted Text:\n")
    print(text)
    
    lang = detect_language(text)
    print(f"\n Detected Language: {lang}")
    
    print("\n Reading aloud (offline)...")
    text_to_speech(text)

# ---------- MAIN ----------
if __name__ == "__main__":
    # Change this to the path of your Vosk model
    model_path = r"model\vosk-model-small-en-us-0.15"

    command = recognize_command(model_path)

    if any(word in command.lower() for word in ["read", "open", "file", "start"]):
        file_path = "image.png".strip()
        if os.path.exists(file_path):
            process_file(file_path)
        else:
            print(" File not found.")
    else:
        print(" Command not recognized. Try saying 'read file' or similar.")
