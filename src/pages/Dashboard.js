import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron, Row, Col, Table } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart'
import Background1 from '../backgrounds/td-centre.jpg';

var gauge_counter = 0;

// THESE ARE FOR RATIOS
var tagMap = {
  "Education": "education",
  "Auto and Transportation": "transport",
  "Bills and Utilties": "bills",
  "Entertainment": "entertainment",
  "Food and Dining": "food",
  "Shopping": "shopping",
  "Other": "other",
  "Savings": "balanceRatio"
};

var tags = [
	{
		name: "Education",
		backgroundColor: '#394A6D',
		hoverBackgroundColor: '#394A6D',
	},
	{
		name: "Auto and Transportation",
		backgroundColor: '#3C9D98',
		hoverBackgroundColor: '#3C9D98',
	},
	{
		name: "Bills and Utilties",
		backgroundColor: '#52DE97',
		hoverBackgroundColor: '#52DE97',
	},
	{
		name: "Entertainment",
		backgroundColor: '#C0FFB3',
		hoverBackgroundColor: '#C0FFB3',
	},
	{
		name: "Food and Dining",
		backgroundColor: '#57A99A',
		hoverBackgroundColor: '#57A99A',
	},
	{
		name: "Shopping",
		backgroundColor: '#76DBD1',
		hoverBackgroundColor: '#76DBD1',
	},
	{
		name: "Other",
		backgroundColor: '#D1EECC',
		hoverBackgroundColor: '#D1EECC',
	},
	{
		name: "Savings",
		backgroundColor: '#DFD7DD',
		hoverBackgroundColor: '#DFD7DD',
	},
];

function TagGauge(props) {
  return (
    <div className="gauge-container">
      <GaugeChart id={"gauge-chart" + ++gauge_counter} textColor={'#000000'} nrOfLevels={20} percent={props.spendingRatio} />
    </div>
  );
}

export default class Dashboard extends React.Component {
  constructor(props) {
	  super(props);
    this.state = { 
      customerId: new URL(window.location.href).searchParams.get("customerId"),
      isGaugeVisible: false,
      isTransactionsVisible: false
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/processCustomer", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({custId: this.state.customerId}), 
    })
    .then(response => response.json())
      .then(response => this.setState({
        doughnutData: [
          response.currentCustomer.totalEducation, 
          response.currentCustomer.totalTransport,
          response.currentCustomer.totalBills,
          response.currentCustomer.totalEntertainment,
          response.currentCustomer.totalFood,
          response.currentCustomer.totalShopping,
          response.currentCustomer.totalOther,
          response.currentCustomer.balance
        ],
        data: response
      }));
  }

  getDoughnutConfig = () => {
    return {
    labels: tags.map(tag => tag.name),
    datasets: [{
      data: this.state.doughnutData,
      backgroundColor: tags.map(tag => tag.backgroundColor),
      hoverBackgroundColor: tags.map(tag => tag.hoverBackgroundColor)
    }]}
  };

  /**
 * Gets the name of the tag clicked by the user in the donut chart
 */
  getClickedTagFromDonutChart= (elements) => {
    if (elements.length === 0) {
      return;
    }
    var index = elements[0]._index;
    return tags[index].name;
  }

// TODO: Render tag gauge
  generateTagBreakdown = (elements) => {
    var tag = this.getClickedTagFromDonutChart(elements);
    var data = this.state.data;

    fetch("http://localhost:8080/transactionsByTags", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({custId: this.state.customerId, tag: tag}), 
    }).then((response => response.json()))
    .then(response => this.setState({ transactions: response} ));

    this.setState({
      isGaugeVisible: tag!=="Savings",
      isTransactionsVisible: tag!=="Savings",
      spendingRatio1: data.currentCustomer[tagMap[tag]] / (data.studentAverage[tagMap[tag]]),
      spendingRatio2: data.currentCustomer[tagMap[tag]] / (data.adultAverage[tagMap[tag]])
    });

  }

  render = () => {
	return (
	  <div style={{background: 'white'}}>
		<Jumbotron
		  style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.9)), url(${Background1})`, 
		  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}
		>
		  <h2 className="centered-text">Your Spending Breakdown</h2>
		  <p className="centered-text">Scroll down to view your data</p>
		</Jumbotron>
		<Container className="border-a" style={{ background: 'rgb(247, 247, 247)'}}>
		  <h2 className="centered-text" style={{ marginTop: '3%' }}>Personal Breakdown</h2>
		  <Row className="border-b">
			<div className="doughnut-container">
			  <Doughnut data={this.getDoughnutConfig()} onElementsClick={elems => this.generateTagBreakdown(elems)}/>
			</div>
		  </Row>
		  <Row>
      {this.state.isGaugeVisible ? (
       <Col className="border-r">
        <Row className="border-b">
        <h3 className="centered-text">Spending Relative to Average Student</h3>
        {/* <TagGauge spendingRatio={this.state.spendingRatio1}></TagGauge> */}
        <h2 className="centered-text">{this.state.spendingRatio1.toFixed(2)}x</h2>
        </Row>
        <Row>
        <h3 className="centered-text">Spending Relative to Average Young Adult</h3>
        {/* <TagGauge spendingRatio={this.state.spendingRatio2}></TagGauge> */}
        <h2 className="centered-text">{this.state.spendingRatio2.toFixed(2)}x</h2>
        </Row>
      </Col>   
      ) : null}
      {this.state.isTransactionsVisible && this.state.transactions ? (
        <Col style={{maxHeight: '350px', overflow: 'auto'}}>
			  <h3 className="centered-text">List of Transactions</h3>
			  <Table striped bordered hover responsive>
				<thead>
				  <tr>
					<th>Date</th>
					<th>Description</th>
					<th>Amount</th>
				  </tr>
				</thead>
				<tbody>
          {this.state.transactions.map(function(transaction, i) {
            return (
              <tr>
              <td>{transaction.originationDateTime}</td>
              <td>{transaction.description}</td>
              <td>$ {transaction.currencyAmount * -1}</td>
              </tr>
            )
          })}
				  
				</tbody>
			  </Table>
			  </Col>
      ) : null}
			
		  </Row>
		</Container>
	  </div>
	);
  }
};
