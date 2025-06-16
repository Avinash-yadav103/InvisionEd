import os
import queue
import sounddevice as sd
import vosk
import sys
import json

def speech_to_text(model_path):
    if not os.path.exists(model_path):
        print(f" Model not found at: {model_path}")
        return

    print("Loading Vosk model...")
    model = vosk.Model(model_path)

    q = queue.Queue()

    def callback(indata, frames, time, status):
        if status:
            print(status, file=sys.stderr)
        q.put(bytes(indata))

    print("\n Speak now (Ctrl+C to stop):")

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
                        print(" You said:", text)
        except KeyboardInterrupt:
            print("\n Exiting...")
        except Exception as e:
            print(" Error:", e)

# === Example Usage ===
if __name__ == "__main__":
    # Replace with path to your downloaded language model
    model_path = r"model\vosk-model-small-en-us-0.15"  # or "models/vosk-model-small-hi-0.22" for Hindi
    speech_to_text(model_path)
