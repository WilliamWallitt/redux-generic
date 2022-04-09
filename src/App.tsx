import React from 'react';
import './App.css';
import {Users} from "./features/users/users";
import {Component} from "./features/generic/component";

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
