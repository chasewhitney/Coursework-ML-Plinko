const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function distance(pointA, pointB) {
  return _.chain(pointA)
  	.zip(pointB)
  	.map(([a,b]) => ( a - b ) ** 2)
  	.sum()
  	.value() ** .5;
}

function splitDataSet(data, testCount){
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);
  return [testSet, trainingSet];

}

function knn(data, point, k){
    return _.chain(data)
    .map(row => [distance(_.initial(row), point), _.last(row)])
    .sortBy(row => row[0])
    .slice(0,k)
    .countBy(row => row[1])
    .toPairs()
    .last()
    .first()
    .parseInt()
    .value();
}

function runAnalysis() {
  const testSetSize = 100;
  const [testSet, trainingSet] = splitDataSet(outputs, testSetSize);

  _.range(1,21).forEach(k => {
    const accuracy = _.chain(testSet)
      .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint))
      .size()
      .divide(testSetSize)
      .value()
    console.log(k,'Accuracy is', accuracy);
  });


}
