"use client"

import type React from "react"
import type SpeechRecognition from "speech-recognition"
import { useState, useEffect, useRef } from "react"
import { Upload, Mic, MicOff, Sun, Moon, FileText, Sparkles, User, Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: number
  type: "user" | "ai"
  message: string
  timestamp: string
}

export default function InVisionEdInterface() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "user",
      message: "Summarise the content",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      type: "ai",
      message:
        "Writing Challenge\n\nAnother writing challenge can be to take the individual sentences in the random paragraph and incorporate them into a short story. Unlike the random sentence generator, the sentences from the random paragraph will have some connection to one another so it will be a bit easier.\n\nYou also won't know exactly how many sentences will appear in the random paragraph. It could be anywhere from one sentence to many more and it will randomly change each time you use the generator.",
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      type: "user",
      message: "How to check that?",
      timestamp: "2:32 PM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      if (recognitionRef.current) {
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          handleSendMessage(transcript)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }
      }
    }
  }, [])

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Add a message about file upload
      const fileMessage: ChatMessage = {
        id: Date.now(),
        type: "user",
        message: `Uploaded file: ${file.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => [...prev, fileMessage])
    }
  }

  const handleVoiceCommand = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
    }
  }

  const handleSendMessage = (message: string = newMessage) => {
    if (!message.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        type: "ai",
        message: `I understand you said: "${message.trim()}". Let me help you with that. This is a simulated AI response that would analyze your request and provide relevant information.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div
      className={`h-screen flex flex-col transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-amber-50 text-gray-900"
      }`}
    >
      {/* Compact Header */}
      <header className={`px-6 py-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">InVisionEd</h1>
            </div>
          </div>

          <div className="flex-1 text-center px-4">
            <p className="text-xs font-medium opacity-80">
              Where Voice Meets Vision, and Knowledge Knows No Boundaries.
            </p>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isDarkMode ? "bg-yellow-400" : "bg-gray-300"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 absolute top-0.5 flex items-center justify-center ${
                  isDarkMode ? "translate-x-6" : "translate-x-0.5"
                }`}
              >
                {isDarkMode ? <Moon className="w-3 h-3 text-gray-600" /> : <Sun className="w-3 h-3 text-yellow-600" />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel - File Upload */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center space-y-6 max-w-sm w-full">
            {/* Enhanced Upload Icon */}
            <div className="relative group cursor-pointer">
              <div className="w-20 h-24 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center relative shadow-xl transform transition-transform group-hover:scale-105">
                <div className="w-12 h-16 bg-gradient-to-br from-cyan-300 to-cyan-400 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Upload className="w-3 h-3 text-gray-900" />
                </div>
              </div>
            </div>

            {/* Upload Heading */}
            <h2 className="text-xl font-semibold text-center">Upload your File</h2>

            {/* File Selection */}
            <div className="w-full space-y-3">
              <label htmlFor="file-upload" className="block text-sm font-medium">
                Select File:
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`block w-full px-3 py-2 border rounded-lg cursor-pointer text-center text-sm transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800 hover:bg-gray-700 hover:border-gray-500"
                        : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    Choose File
                  </label>
                </div>
                <div
                  className={`px-3 py-2 border rounded-lg text-xs whitespace-nowrap flex items-center ${
                    isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"
                  }`}
                >
                  {selectedFile ? "File Selected" : "No File Chosen"}
                </div>
              </div>
              {selectedFile && (
                <div className="flex items-center space-x-2 text-xs text-green-500 bg-green-500 bg-opacity-10 p-2 rounded-lg">
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Voice Command Button - Centered on Dividing Line */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handleVoiceCommand}
              className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:ring-4 focus:ring-opacity-50 border-4 border-white ${
                isListening
                  ? "bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 focus:ring-red-400 animate-pulse"
                  : "bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-400"
              }`}
              aria-label={isListening ? "Stop voice recording" : "Start voice recording"}
            >
              {isListening ? (
                <MicOff className="w-7 h-7 mx-auto text-white" />
              ) : (
                <Mic className="w-7 h-7 mx-auto text-gray-900" />
              )}
            </button>
            <div className="text-center">
              <span className={`text-xs font-medium ${isListening ? "text-red-400" : "opacity-70"}`}>
                {isListening ? "Listening..." : "Voice"}
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div
          className={`w-px ${isDarkMode ? "bg-gray-700" : "bg-gray-300"} absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2`}
        />

        {/* Right Panel - AI Chat Assistant */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="w-full h-full flex flex-col max-w-lg mx-auto">
            {/* AI Assistant Header */}
            <div
              className={`rounded-xl p-4 mb-4 shadow-lg border ${
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>AI Assistant</span>
                {isListening && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">Listening</span>
                )}
              </h3>
            </div>

            {/* Chat Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === "user"
                          ? "bg-yellow-400 text-gray-900"
                          : isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-md ${
                        msg.type === "user"
                          ? "bg-yellow-400 text-gray-900"
                          : isDarkMode
                            ? "bg-gray-800 border border-gray-700"
                            : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-line">{msg.message}</div>
                      <div className={`text-xs mt-2 ${msg.type === "user" ? "text-gray-700" : "opacity-60"}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* AI Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Bot className="w-4 h-4" />
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-md ${
                        isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div
              className={`p-3 rounded-xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-3 py-2 rounded-lg border-none outline-none text-sm ${
                    isDarkMode
                      ? "bg-gray-700 text-white placeholder-gray-400"
                      : "bg-gray-100 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="sm"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <footer className={`py-2 text-center border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
        <p className="text-xs opacity-70">© 2025 InVisionEd | Designed with inclusion in heart</p>
      </footer>
    </div>
  )
}
