import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron, Row, Col, Table } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart'

var isGaugeVisible = true; // boolean that will change upon user clicking section
// TODO: Fetch from back-end
var spendingRatio1 = 0.86; // dummy number for now
var spendingRatio2 = 0.76;

var customerTagRatios = [5, 5, 10, 10, 10, 10, 10, 40];
var gauge_counter = 0;

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

const doughnutData = {
	labels: tags.map(tag => tag.name),
	datasets: [{
		data: customerTagRatios,
		backgroundColor: tags.map(tag => tag.backgroundColor),
		hoverBackgroundColor: tags.map(tag => tag.hoverBackgroundColor)
	}]
};

function TagGauge(props) {
	if (isGaugeVisible) {
		return (
			<div className="gauge-container">
				<GaugeChart id={"gauge-chart" + ++gauge_counter} textColor={'#000000'} nrOfLevels={20} percent={props.spendingRatio} />
			</div>
		);
	}
	else {
		return null;
	}
}

/**
 * Gets the name of the tag clicked by the user in the donut chart
 */
function getClickedTagFromDonutChart(elements) {
	if (elements.length === 0) {
		return;
	}
	var index = elements[0]._index;
	return tags[index].name;
}

// TODO: Render tag gauge
function generateTagBreakdown(elements) {
	var tag = getClickedTagFromDonutChart(elements);
}

export default function Dashboard() {
	return (
		<div>
			<Jumbotron>
				<h2 className="centered-text">Your spending breakdown</h2>
				<p className="centered-text">Click a region to expand.</p>
			</Jumbotron>
			<Container className="border-a">
				<Row className="border-b">
					<div className="doughnut-container">
						<Doughnut data={doughnutData} onElementsClick={elems => generateTagBreakdown(elems)} />
					</div>
				</Row>
				<Row>
					<Col className="border-r">
						<Row className="border-b">
							<h2 className="centered-text">Spending Relative to Other Students</h2>
							<TagGauge spendingRatio={spendingRatio1}></TagGauge>
						</Row>
						<Row>
							<h2 className="centered-text">Spending Relative to Young Adults</h2>
							<TagGauge spendingRatio={spendingRatio2}></TagGauge>
						</Row>
					</Col>
					<Col>
						<h2 className="centered-text">List of Transactions</h2>
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>Date</th>
									<th>Account</th>
									<th>Description</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>*** VISA</td>
									<td>Tim Hortons</td>
									<td>$3.21</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
