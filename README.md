# InVisionEd

**InVisionEd** is an offline, voice-controlled education platform designed to make reading and comprehension more accessible and efficient. With multi-language support and summarization and can even ask questions realted to the material, this tool is ideally built to help out **visually challenged** community of students, researchers, who want a hands-free, intelligent and dignified experience in their academics.

# Figma (UI) Link: https://www.figma.com/design/WwlIIkgbhA9O8Nmd076v0z/Untitled?node-id=0-1&t=7VHmCN0vK1MYTvGM-1

# Video demo Link: https://drive.google.com/file/d/1iprR2k39EV48AooN3BG1-k_h-reYvI7w/view?usp=sharing
##  Features

- **Voice-Controlled Navigation**: Use voice commands to go through, summarise and ask questions regarding the content.
- **Multi-Language Support**: Read PDFs and images both textual and scanned in multiple languages, including Hindi and English and many more languages to come.
- **Text Summarization**: Get concise summaries of long documents using NLP-based models.
- **Offline Functionality**: Works in hybrid mode, making it suitable for use in low-connectivity environments.
- **Text-to-Speech (TTS)**: Converts text to speech using offline TTS engines.
- **Speech-to-Text (STT)**: Interact with the app using your voice, powered by VOSK .


## Usage

1. Launch the application:

   bash
   python main(2).py
   

2. Speak commands like:

   * "Open file"
   * "Read from page 5"
   * "Summarize this chapter"
   * "Read in Hindi"

3. Listen as the app reads and summarizes your document!


## How InVisionEd Functions (Step-by-Step):
<img width="856" height="768" alt="Picture1" src="https://github.com/user-attachments/assets/348dc066-ee83-4e50-a39c-b0dd6305fa6b" />

1. User gives a voice command, such as:
   “Open file”, “Read from page 3”, or “Summarize this chapter”
2. Speech-to-Text (STT) converts the spoken command into text using VOSK
3. The app opens the selected file (PDF or image) provided by the user
4. If it’s a scanned document or image, OCR extracts the text using Tesseract
5. Based on the command:
   For “read” → The text is read aloud using Text-to-Speech (TTS)
   For “summarize” → AI generates a short summary using NLP
6. The output (text or summary) is then spoken aloud, creating a hands-free learning    experience
7. All interaction is done via voice or text as per user demand, making it              accessible and easy to use

##  Technologies Used

* **Python**
* **VOSK** (Offline speech recognition)
* **Pyttsx3** or **gTTS** (Text-to-Speech)
* **PyMuPDF / PyPDF2** (PDF parsing)
* **SpeechRecognition**, **pyaudio**

## Ideal Users:

1. Visually impaired or low-vision learners
2. Students preparing for competitive exams like UPSC, NEET, JEE
3. Learners in rural areas with limited access to Braille or support systems
4. Anyone seeking hands-free learning


![image](https://github.com/user-attachments/assets/0096e301-5462-4761-956e-36ac0a455f1b)
![image](https://github.com/user-attachments/assets/318e7524-50a8-487d-ae7d-4fb4344dc967)


