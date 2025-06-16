from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from main import process_file  
import shutil
import os

app = FastAPI()

"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)"""

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = f"temp_files/{file.filename}"
    os.makedirs("temp_files", exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        extracted_text = process_file(file_path)
        return {"output": extracted_text}
    except Exception as e:
        return {"error": str(e)}
