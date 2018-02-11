import React, { Component } from 'react';
import './App.css';
import MemeGenerator from './components/memegenerator/MemeGenerator';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Meme Generator to Linkedin post (Code Challenge)</h1>
          <span>Fill the fields bellow with url image, heading and subheading inputs and select preview.</span>
        </header>
      <div className="container">
        <div className="row"></div>
        <MemeGenerator/>
        <div className="row"></div>
      </div>
      </div>
    );
  }
}

export default App;
