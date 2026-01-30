import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import "./PageBase.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(7,12,35,0.92) 35%, rgba(7,12,35,0.6)), url('/background.jpg')",
      }}
    >
      {/* NAVBAR */}
      <header className="landing-navbar">
        <div className="nav-left">
          <span className="brand">VIRTUAL AI</span>
          <nav>
            <span>Home</span>
            <span>Modes</span>
            <span>About</span>
          </nav>
        </div>

        <div className="nav-right">
          <button className="nav-outline" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="nav-filled" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Virtual AI <br />
            Conversation Assistant
          </h1>

          <p>
            A voice-driven intelligent assistant that listens, understands,
            and responds naturally using real-time AI and immersive interaction.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/mode")}
          >
            Start Conversation
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
