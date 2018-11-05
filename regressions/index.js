require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');
const getHeaders = require('./extractHeaders');


let { features, labels, testFeatures, testLabels} = loadCSV('./cars.csv', {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['horsepower', 'displacement', 'weight'],
  labelColumns: ['mpg']
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 100
});

regression.train();
const r2 = regression.test(testFeatures, testLabels);

plot({
  x: regression.mseHistory.reverse(),
  xLabel: 'Iteration #',
  yLabel: 'Mean Squared Error'
});

console.log('r2 is:', r2);
