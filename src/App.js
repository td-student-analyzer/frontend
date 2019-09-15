import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.SERVER_URL = "https://localhost:3000";
    this.state = { customerId: null }
  }

  setCustomerId = (custId, callback) => {
    this.setState({ customerId: custId }, callback);
  }

  loginHandler = () => {
    this.setCustomerId(document.getElementById("customerId").value, () =>  {
      window.location.href = "http://localhost:3000/dashboard?customerId=" + this.state.customerId;
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={() => <Login loginHandler={this.loginHandler} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

function About() {
  return <ul>
    <li><div>Icons made by <a href="https://www.flaticon.com/authors/payungkead" title="Payungkead">Payungkead</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></li>
  </ul>
}

