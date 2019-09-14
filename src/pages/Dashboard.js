import React from 'react';
import GaugeChart from 'react-gauge-chart'

var isGaugeVisible = true; // boolean that will change upon user clicking section
var spendingRatio = 0.86;

function TagGauge() {
  if (isGaugeVisible) {
    return (
      <div>
        <GaugeChart id="gauge-chart2" textColor={'#000000'} nrOfLevels={20} percent={spendingRatio}/>
      </div>
    );
  }
  else {
    return null;
  }
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <TagGauge></TagGauge>
    </div>
  );
};