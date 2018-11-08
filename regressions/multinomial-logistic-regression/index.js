require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
// const loadCSV = require('../load-csv');
const LogisticRegression = require('./logistic-regression');
const plot = require('node-remote-plot');
const _ = require('lodash');
const mnist = require('mnist-data');

function loadData() {

  const mnistData = mnist.training(0,60000);
  const features = mnistData.images.values.map(image => _.flatMap(image));
  const labels = mnistData.labels.values;
  const encodedLabels = encode(labels);

  return { features, encodedLabels };
}

const { features, encodedLabels} = loadData();

const regression = new LogisticRegression(features, encodedLabels, {
  learningRate: 1,
  iterations: 20,
  batchSize: 100,
});

regression.train(features, encodedLabels);

////////////////////////////////////////////////////
// Testing
const mnistTest = mnist.testing(0,1000);

const testFeatures = mnistTest.images.values.map(image => _.flatMap(image));
const testLabels = mnistTest.labels.values;
const encodedTestLabels = encode(testLabels);
const accuracy = regression.test(testFeatures, encodedTestLabels);

console.log('Accuracy is:', accuracy);

// Memory start
// 170 mb total
// 151 mb
// 12 mb

// --max-old-space-size=4090

function encode(labels) {
  return labels.map((v)=>{
    const arr = new Array(10).fill(0);
    arr[v] = 1;
    return arr;
  });
}

debugger;













// const { features, labels, testFeatures, testLabels } = loadCSV('../data/cars.csv', {
//   dataColumns: ['horsepower', 'displacement', 'weight'],
//   labelColumns: ['mpg'],
//   shuffle: true,
//   splitTest: 50,
//   converters: {
//     mpg: value => {
//       const mpg = parseFloat(value);
//       if(mpg < 15) { return [1,0,0] }
//       else if(mpg < 30) { return [0,1,0] }
//       else { return [0,0,1] }
//
//     }
//   }
// });
//
// const regression = new LogisticRegression(features, _.flatMap(labels), {
//   learningRate: 0.1,
//   iterations: 100,
//   batchSize: 50,
// });
//
// regression.train();
