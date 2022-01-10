import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Link to="/">Home</Link>
      <Link to="/viewContent">view</Link>
      <Link to="/test">test</Link>
      <Link to="/addContent">Add</Link>
      <Link to="/contentList">List</Link>
    </React.Fragment >
  );
}

export default App;
