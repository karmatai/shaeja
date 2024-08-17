import React from 'react';
import './App.css';
import MicrophoneButton from './components/Home';
import NavBar from './components/Header';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <MicrophoneButton />
    </div>
  );
}

export default App;
