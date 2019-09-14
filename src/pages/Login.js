import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
    return (
        <header className="Login-page">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="centered-text">
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
    );
  }