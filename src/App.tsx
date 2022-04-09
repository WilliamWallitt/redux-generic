import React from 'react';
import './App.css';
import {Users} from "./components/users/users";
import {Component} from "./components/generic/component";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Users/>
          <Component/>
      </header>
    </div>
  );
}

export default App;
