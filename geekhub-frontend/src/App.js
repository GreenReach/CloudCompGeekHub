import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Link to="/">Home</Link>
      <br />
      <Link to="/viewContent">view</Link>
      <br />
      <Link to="/test">test</Link>
      <br />
      <Link to="/addContent">Add</Link>
      <br />
      <Link to="/contentList">List</Link>
      <br />
      <Link to="/login">Login</Link>
    </React.Fragment >
  );
}

export default App;
