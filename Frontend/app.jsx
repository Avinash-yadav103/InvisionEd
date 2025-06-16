// src/App.jsx
import { useState } from "react";
import { Moon, Sun, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [fileName, setFileName] = useState(null);
  const [outputText, setOutputText] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("http://localhost:8000/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setOutputText(response.data.output);
      } catch (error) {
        console.error("Upload failed:", error);
        setOutputText("Failed to process file.");
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-black text-white" : "bg-yellow-100 text-black"}`}>
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-opacity-90">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-lg font-bold">InvisionEd</h1>
        </div>
        <p className="text-sm italic text-center">Where Voice Meets Vision, and Knowledge Knows No Boundaries.</p>
        <Toggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Toggle>
      </div>

      <div className="relative flex flex-1">
        {/* Left Panel */}
        <div className={`w-full md:w-[48%] flex flex-col items-center justify-center px-6 py-10 ${darkMode ? "bg-[#1a1a1a]" : "bg-[#f5f5dc]"}`}>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-4">Upload your File</h2>
            <label className="inline-block">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <div className="px-6 py-2 bg-white text-black rounded-md cursor-pointer shadow">Choose File</div>
            </label>
            {fileName && <p className="mt-2 text-sm">Selected: {fileName}</p>}
          </div>
        </div>

        {/* Mic Button Positioned in the Center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Button variant="secondary" className="rounded-full w-28 h-28 shadow-2xl bg-yellow-400 hover:bg-yellow-500 text-black flex items-center justify-center">
            <Mic className="w-10 h-10" />
          </Button>
        </div>

        {/* Right Panel */}
        <div className={`w-full md:w-[48%] px-4 py-10 ${darkMode ? "bg-[#2a2a2a]" : "bg-white"} ml-auto z-10`}>
          <Card className="max-w-2xl mx-auto shadow-xl border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm">Summarise the content</Button>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm">How to check that?</Button>
              </div>
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">{outputText}</pre>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="text-center py-4 text-sm border-t border-gray-700">
        © 2025 InVisionEd | Designed with inclusion in heart
      </footer>
    </div>
  );
}

export default App;
