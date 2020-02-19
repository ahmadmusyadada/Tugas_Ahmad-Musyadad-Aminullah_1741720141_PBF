import React from 'react';
import logo from './DSC_0030-12.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="row">
          <div class="col-5">
          <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div class="col-2">
            <p>Nama:</p>
            <p>TTL:</p>
          </div>
          <div class="col-5">
            <p>Ahmad Musyadad Aminullah</p>
            <p>20 August 1999</p>
          </div>
      </div>
      </header>
    </div>
  );
}

export default App;
