import { useNavigate } from "react-router-dom";
import "./ModeSelection.css";
import "./PageBase.css";

function ModeSelection() {
  const navigate = useNavigate();

  const selectMode = (mode) => {
    navigate("/conversation", { state: { mode } });
  };

  return (
    <div
      className="page mode-bg"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `
          linear-gradient(
            rgba(7, 12, 35, 0.85),
            rgba(7, 12, 35, 0.85)
          ),
          url("/modeselection-bg.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="mode-container" style={{ textAlign: "center" }}>
        <h2 className="mode-title" style={{ color: "#fff", marginBottom: "36px" }}>
          Choose Conversation Type
        </h2>

        <div
          className="mode-buttons-row"
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="mode-btn glow-blue"
            onClick={() => selectMode("chitchat")}
          >
            Chit Chat
          </button>

          <button
            className="mode-btn glow-green"
            onClick={() => selectMode("interview")}
          >
            Interview
          </button>

          <button
            className="mode-btn glow-orange"
            onClick={() => selectMode("study")}
          >
            Study Discussion
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModeSelection;
