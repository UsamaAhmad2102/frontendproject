// src/App.js
import React from 'react';
import FakePerson from './FakePerson';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fake Data Generator</h1>
      </header>
      <main>
        <FakePerson />
      </main>
    </div>
  );
}

export default App;
