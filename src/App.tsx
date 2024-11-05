import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainHome from "./components/main-home";
import FirebaseAuth from "./components/firebase-auth";
import FlowerRecognition from "./components/flower-recognition";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/auth" element={<FirebaseAuth />} />
        <Route path="/flower-recognition" element={<FlowerRecognition />} />
      </Routes>
    </Router>
  );
}

export default App;
