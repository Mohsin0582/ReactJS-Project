import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneBookApp from './components/phoneBookApp.component';
import ContactPageForm from './components/contactPageForm.component';


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Route path="/" exact component={PhoneBookApp} />          
        <Route path="/ContactPageForm" exact component={ContactPageForm} />          
      </div>
    </Router>
  );
}

export default App;
