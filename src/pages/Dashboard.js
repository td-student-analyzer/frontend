import React from 'react';
import { Doughnut } from 'react-chartjs-2';

// TODO: Fetch from back-end
var customerTagRatios = [5, 5, 10, 10, 10, 10, 10, 40];

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

const donutData = {
	labels: tags.map(tag => tag.name),
	datasets: [{
		data: customerTagRatios,
		backgroundColor: tags.map(tag => tag.backgroundColor),
		hoverBackgroundColor: tags.map(tag => tag.hoverBackgroundColor)
	}]
};

/**
 * Gets the name of the tag clicked by the user in the donut chart
 */
function getClickedTagFromDonutChart(elements) {
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
          <h2>Your spending breakdown</h2>
		  <p>Click to expand.</p>
          <Doughnut data={donutData} onElementsClick={elems => generateTagBreakdown(elems)}/>
        </div>
      );
};