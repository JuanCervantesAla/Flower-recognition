import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const MainHome = lazy(() => import("./components/main-home"));
const FirebaseAuth = lazy(() => import("./components/firebase-auth"));
const FlowerRecognition = lazy(() => import("./components/flower-recognition"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/auth" element={<FirebaseAuth />} />
          <Route path="/flower-recognition" element={<FlowerRecognition />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
