// for messing around with data

require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

const getHeaders = require('./extractHeaders');
const headers = getHeaders('./cars.csv');
let rList = [];

function analyze(heads) {
  let { features, labels, testFeatures, testLabels} = loadCSV('./cars.csv', {
    shuffle: true,
    splitTest: 50,
    dataColumns: heads,
    labelColumns: ['mpg']
  });

  const regression = new LinearRegression(features, labels, {
    learningRate: 0.1,
    iterations: 100
  });

  regression.train();
  const r2 = regression.test(testFeatures, testLabels);

  // console.log('r2 is:', r2);
  return r2;
}


const getAllSubsets =
  theArray => {
    let a = theArray.reduce(
    (subsets, value) => subsets.concat(
     subsets.map(set => [value,...set])
    ),
    [[]]
  );
  a.shift();
  return a;
}

// console.log(headers);

const allCombos = getAllSubsets(headers);

// console.log(allCombos);

console.log('Running...');
allCombos.map(heads => {
  rList.push(analyze(heads));
});

// console.log(rList);

let i = rList.indexOf(Math.max(...rList));


console.log('------------------------------------------');
// console.log('index:', i);
console.log('Max value:', rList[i]);
console.log('Predictors:', allCombos[i]);
