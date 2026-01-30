import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar3D from "../components/Avatar3D";
import "./ConversationPage.css";
import "./PageBase.css";

function ConversationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "chitchat";

  const recognitionRef = useRef(null);
  const speakingRef = useRef(false);
  const listeningRef = useRef(false);
  const cooldownRef = useRef(false);

  // 🔑 THIS CONTROLS VIDEO PLAYBACK
  const [aiSpeaking, setAiSpeaking] = useState(false);

  /* =========================
     GREETING (MODE BASED)
  ========================= */
  const getGreeting = useCallback(() => {
    if (mode === "interview") {
      return "Hello. This will be a professional interview. Please introduce yourself.";
    }
    if (mode === "study") {
      return "Hi. What topic would you like to study today?";
    }
    return "Hello. How can I help you today?";
  }, [mode]);

  /* =========================
     START LISTENING
  ========================= */
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (speakingRef.current || listeningRef.current) return;

    try {
      recognitionRef.current.start();
      listeningRef.current = true;
    } catch {}
  }, []);

  /* =========================
     STOP LISTENING
  ========================= */
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      listeningRef.current = false;
    } catch {}
  }, []);

  /* =========================
     SPEAK AI RESPONSE
     (THIS CONTROLS VIDEO TIMING)
  ========================= */
  const speak = useCallback(
    (text) => {
      if (!text) return;

      speakingRef.current = true;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      // ▶️ AI STARTS SPEAKING → VIDEO STARTS
      utterance.onstart = () => {
        setAiSpeaking(true);
      };

      // ⏸ AI STOPS SPEAKING → VIDEO STOPS
      utterance.onend = () => {
        speakingRef.current = false;
        setAiSpeaking(false);
        cooldownRef.current = false;
        startListening();
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [startListening]
  );

  /* =========================
     INIT SPEECH RECOGNITION
  ========================= */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      if (speakingRef.current || cooldownRef.current) return;

      const transcript =
        event.results[0][0].transcript.toLowerCase().trim();

      console.log("User:", transcript);

      if (transcript.includes("bye")) {
        stopListening();
        speak("Goodbye. Have a nice day.");
        setTimeout(() => navigate("/"), 1200);
        return;
      }

      cooldownRef.current = true;
      stopListening();

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript, mode }),
        });

        const data = await response.json();
        speak(data.reply);
      } catch {
        speak("Sorry, I could not process that.");
      }
    };

    recognition.onerror = () => {
      startListening();
    };

    recognitionRef.current = recognition;

    // Initial greeting
    speak(getGreeting());

    return () => {
      stopListening();
      window.speechSynthesis.cancel();
    };
  }, [mode, navigate, getGreeting, speak, startListening, stopListening]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div
      className="conversation-root"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 🔑 VIDEO IS CONTROLLED BY AI SPEECH */}
      <Avatar3D speaking={aiSpeaking} />
      <div className="conversation-overlay">
        <p>Speak to continue. Say "bye" to exit.</p>
      </div>
    </div>
  );
}

export default ConversationPage;
