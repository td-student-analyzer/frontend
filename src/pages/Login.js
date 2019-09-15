import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card} from 'react-bootstrap';
import Background1 from '../backgrounds/td-centre.jpg';

export default class Login extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <header 
          className="Login-page"
          style={{ minHeight: 750, padding: '1em 0em' , backgroundImage: `url(${Background1})`, 
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
          <Card style={{ width: '33%', padding: '5%', backgroundColor: '#414141', opacity: '0.85', borderRadius: '50px' }}>
            <img src={logo} className="App-logo" alt="logo" />
              <p 
                className="centered-text"
                style={{ color: 'white' }}
              >
                Enter your Customer ID to analyze your spending habits.
              </p> 
              <Form className="LoginForm">
                <Form.Group style={{ width: '70%', margin: '1% 15%' }}>
                  <Form.Control type="id" id="customerId" placeholder="Customer ID" name={"test"}/>
                </Form.Group>
                <Button variant="dark" type="button" onClick={this.props.loginHandler}>
                  Submit
                </Button>
              </Form>
            </Card>
          <div style={{backgroundColor: 'white'}}>
            
          </div>
        </header>
    );
    }
  }