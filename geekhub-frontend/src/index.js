import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Test from './components/testComp'
import ContentInfo from './components/contentInfo';
import AddContent from './components/addContent';
import ContentList from './components/contentList';
import Login from './components/Login';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div id='navbar'>
        <ul>
          <li><p><Link to="/">Home</Link></p></li>
          <li><p><Link to="/Login">Login</Link></p></li>
          <li><p><Link to="/addContent">Add</Link></p></li>
          <li><p><Link to="/contentList">List</Link></p></li>
          <li><p><Link to="/test">test</Link></p></li>
          <li><p>{localStorage.getItem("username")}</p></li>
        </ul>
      </div>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/viewContent" element={<ContentInfo />} />
        <Route path="/addContent" element={<AddContent />} />
        <Route path="/contentList" element={<ContentList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
