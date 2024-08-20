// src/App.js
import React from 'react';
import PersonForm from './components/PersonForm';
import PersonDetail from './components/PersonDetail';

function App() {
  return (
    <div className="App">
      <h1>Person Management</h1>
      <PersonForm />
      <hr />
      <PersonDetail />
    </div>
  );
}

export default App;
