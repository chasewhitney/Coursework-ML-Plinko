require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
// const loadCSV = require('../load-csv');
const LogisticRegression = require('./logistic-regression');
const plot = require('node-remote-plot');
const _ = require('lodash');
const mnist = require('mnist-data');

mnistData = mnist.training(0,1000);
mnistTest = mnist.testing(0,100);

const features = mnistData.images.values.map(image => _.flatMap(image));
const labels = mnistData.labels.values;
const testFeatures = mnistTest.images.values.map(image => _.flatMap(image));
const testLabels = mnistTest.labels.values;

function encode(labels) {
  return labels.map((v)=>{
    const arr = new Array(10).fill(0);
    arr[v] = 1;
    return arr;
  });
}

const encodedLabels = encode(labels);
const encodedTestLabels = encode(testLabels);



const regression = new LogisticRegression(features, encodedLabels, {
  learningRate: 5,
  iterations: 100,
  batchSize: 100,
});

regression.train(features, labels);
const accuracy = regression.test(testFeatures, encodedTestLabels);

console.log('Accuracy is:', accuracy);

















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
