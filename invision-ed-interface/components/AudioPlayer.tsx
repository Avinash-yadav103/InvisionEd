import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Square, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  isPlaying: boolean;
  onStop: () => void;
  isDarkMode: boolean;
}

export function AudioPlayer({ isPlaying, onStop, isDarkMode }: AudioPlayerProps) {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Estimate duration based on text length (this is a simulation since we don't have actual audio)
  useEffect(() => {
    if (isPlaying) {
      setDuration(100); // 100 seconds as placeholder duration
      startTimeRef.current = Date.now();
      
      // Update progress bar every 100ms
      const updateProgress = () => {
        const elapsedTime = (Date.now() - (startTimeRef.current || Date.now())) / 1000;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(newProgress);
        
        if (newProgress < 100) {
          animationRef.current = requestAnimationFrame(updateProgress);
        } else {
          // Auto-stop when completed
          onStop();
        }
      };
      
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      // Cancel animation if not playing
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, duration, onStop]);
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate current time based on progress
  const currentTime = (progress / 100) * duration;
  
  // Handle volume change
  const handleVolumeChange = async (newValue: number[]) => {
    const volumeValue = newValue[0];
    setVolume(volumeValue);
    
    if (volumeValue === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
    
    try {
      // Send volume update to backend
      await fetch(`/api/adjust-volume?volume=${volumeValue}`);
    } catch (error) {
      console.error("Failed to adjust volume:", error);
    }
  };
  
  // Handle seek
  const handleSeek = async (newValue: number[]) => {
    const seekValue = newValue[0];
    setProgress(seekValue);
    
    // Adjust the start time based on the new position
    if (startTimeRef.current) {
      const seekTime = (seekValue / 100) * duration;
      startTimeRef.current = Date.now() - (seekTime * 1000);
    }
    
    try {
      // Seek functionality would require backend support
      // This is a placeholder for now
      console.log("Seek to", seekValue);
    } catch (error) {
      console.error("Failed to seek:", error);
    }
  };
  
  // Toggle mute
  const handleToggleMute = async () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    // Save previous volume to restore when unmuting
    const newVolume = newMuteState ? 0 : (volume === 0 ? 80 : volume);
    
    try {
      // Send volume update to backend
      await fetch(`/api/adjust-volume?volume=${newMuteState ? 0 : newVolume}`);
    } catch (error) {
      console.error("Failed to toggle mute:", error);
    }
  };

  return (
    <div 
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 rounded-lg shadow-xl w-96 p-4 z-50 ${
        isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      }`}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm">Now Reading Aloud</h3>
          <span className="text-xs opacity-70">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        
        {/* Seek slider */}
        <Slider
          value={[progress]}
          min={0}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        
        {/* Playback controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              className={`p-1.5 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button 
              onClick={onStop}
              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
            >
              <Square className="w-4 h-4" />
            </button>
            
            <button 
              className={`p-1.5 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          {/* Volume control */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleToggleMute}
              className={`p-1.5 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-24 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}