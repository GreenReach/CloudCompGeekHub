import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Link to="/">Home</Link>
      <Link to="/content">CI</Link>
      <Link to="/test">test</Link>
    </React.Fragment >
  );
}

export default App;
