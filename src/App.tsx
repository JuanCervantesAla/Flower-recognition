import React from 'react';
import FlowerRecognition from './components/flower-recognition.tsx';
import FirebaseAuth from './components/firebase-auth.tsx';

function App() {
  return (
    <div className="App">
      <h1>Flower Recognition App</h1>
      <FirebaseAuth />
    </div>
  );
}

export default App;