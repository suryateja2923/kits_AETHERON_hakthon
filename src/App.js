import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ModeSelection from "./pages/ModeSelection";
import ConversationPage from "./pages/ConversationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/mode" element={<ModeSelection />} />
      <Route path="/conversation" element={<ConversationPage />} />
    </Routes>
  );
}

export default App;
