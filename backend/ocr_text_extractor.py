import os
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import fitz  # PyMuPDF
import pyttsx3
from langdetect import detect
from pathlib import Path

# Optional: Set path to Tesseract (Windows)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_pdf(file_path):
    text = ""
    try:
        doc = fitz.open(file_path)
        for page in doc:
            page_text = page.get_text()
            text += page_text
        if not text.strip():
            raise ValueError("No text found using PyMuPDF. Using OCR fallback.")
    except Exception as e:
        print("Error or scanned PDF. Trying OCR...")
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

def text_to_speech(text):
    engine = pyttsx3.init()
    
    # Optional: set voice/language
    voices = engine.getProperty('voices')
    # Print available voices
    print("\n🗣 Available voices:")
    for i, voice in enumerate(voices):
        print(f"{i}: {voice.name} - {voice.languages}")
    
    # Set to your preferred voice index
    engine.setProperty('voice', voices[0].id)  # Change index as needed
    engine.setProperty('rate', 150)  # Speed of speech
    
    engine.say(text)
    engine.runAndWait()

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
    print(f"\nDetected Language: {lang}")
    
    print("\n Reading aloud (offline)...")
    text_to_speech(text)

# === Example Usage ===
if __name__ == "__main__":
    file_path = "image.png"
    if os.path.exists(file_path):
        process_file(file_path)
    else:
        print("File not found.")
