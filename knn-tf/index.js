require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');

let { features, labels, testFeatures, testLabels} = loadCSV(
  'kc_house_data.csv',
  {
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat', 'long', 'sqft_lot'],
    labelColumns: ['price']
  }
);

features = tf.tensor(features);
labels = tf.tensor(labels);


function knn(features, labels, predictionPoint, k){
  const { mean, variance } = tf.moments(features, 0);
  const scaledPredictionPoint = predictionPoint.sub(mean).div(variance.pow(.5))

  return features
    .sub(mean)
    .div(variance.pow(.5))
    .sub(scaledPredictionPoint)
    .pow(2)
    .sum(1)
    .pow(0.5)
    .expandDims(1)
    .concat(labels,1)
    .unstack()
    .sort((a,b)=>a.get(0) - b.get(0))
    .slice(0,k)
    .reduce((acc, i)=>acc + i.get(1),0)
    /k
};

testFeatures.forEach((testPoint, i)=>{
  const result = knn(features, labels, tf.tensor(testPoint), 10);
  const err = ((testLabels[i][0] - result) / testLabels[i][0]) * 100;
  console.log('Guess:', result, 'Actual:', testLabels[i][0]);
  console.log(`Error is ${err}%`);
});
