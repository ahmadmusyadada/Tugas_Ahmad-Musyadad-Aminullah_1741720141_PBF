import React from 'react';
import logo from './DSC_0030-12.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="Title">B I O D A T A</p>
        <div class="row">
          <div class="col-5">
          <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div class="col-1">
            <p>Nama:</p>
            <p>TTL:</p>
            <p>Gender:</p>
            <p>Alamat:</p>
            <p>Status:</p>
            <p>Hobi:</p>
            <p>Email:</p>
            <p>Github:</p>
          </div>
          <div class="col-6">
            <p>Ahmad Musyadad Aminullah</p>
            <p>Malang, 20 August 1999</p>
            <p>Laki - Laki</p>
            <p>Jl. Kalpataru No. 49B</p>
            <p>Mahasiswa</p>
            <p>Game</p>
            <p>ahmadmusyadadaminullah@gmail.com</p>
            <a href="https://github.com/ahmadmusyadada" target="_blank">https://github.com/ahmadmusyadada</a>
          </div>
      </div>
      </header>
    </div>
  );
}

export default App;
