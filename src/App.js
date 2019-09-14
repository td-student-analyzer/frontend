import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const textStyle = {
  color: 'black',
  fontSize: '15px',
  textAlign: 'center'
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={textStyle}>
          Enter your Customer ID to analyze your spending habits.
        </p> 
        <Form className="LoginForm">
          <Form.Group controlId="formCustomerId">
            <Form.Control type="id" placeholder="Customer ID" />
          </Form.Group>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </header>
    </div>
  );
}

export default App;
