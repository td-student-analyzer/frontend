import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
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
    <Router>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

// function Header() {
//   return <h1>HEADER</h1>
// }

function Dashboard() {
  return <h1>Dashboard</h1>
}

function About() {
  return <ul>
    <li><div>Icons made by <a href="https://www.flaticon.com/authors/payungkead" title="Payungkead">Payungkead</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></li>
  </ul>
}

function Login() {
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
