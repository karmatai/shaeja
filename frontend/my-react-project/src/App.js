import React from 'react';
import './App.css';
import MicrophoneButton from './components/Home';
import NavBar from './components/Header';
import Result from './components/Result/index';
import { useSelector } from 'react-redux';

function App() {
  const { doneRecording } = useSelector((state) => state.app);
  return (
    <div className="App">
        <NavBar />
        {doneRecording ? <Result /> : <MicrophoneButton />}
      {/* <MicrophoneButton /> */}
      {/* <Result/> */}
      </div>
  );
}

export default App;
