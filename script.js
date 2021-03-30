let dataArr = [];
var data = {
  header: ['Weapon', 'Number of Times Used'],
  rows: [],
};

function getStats() {
  fetch(
    'https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/homicide-offenses/offense/national/WEAPONS?API_KEY=ZzVVKGxH8p4Fcd0fpa4o5QLBSUnGT0N18jao0Jv1'
  )
    .then(response => response.json())
    .then(result => {
      let allData = result.results;
      for (let i = 0; i < allData.length; i++) {
        if (allData[i].data_year >= 2000) {
          dataArr.push(allData[i]);
        }
      }
      console.log(dataArr);
      sortData(dataArr);
    });
}

function sortData(dataArr) {
  let newArr = [];
  for (let j = 0; j < dataArr.length; j++) {
    if (dataArr[j].data_year == 2019) {
      newArr.push(dataArr[j]);
    }
  }
  console.log(newArr);
  manageData(newArr);
}

function manageData(newArr) {
  const result = {};

  newArr.forEach(killType => {
    for (let [key, value] of Object.entries(killType)) {
      if (result[key]) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    }
  });
  console.log(result);
  displayData(result);
}

function displayData(result) {
  for (const [key, value] of Object.entries(result)) {
    data.rows.push([key, value]);
  }

  data.rows.pop();
  console.log(data.rows);

  var chart = anychart.bar();

  chart.data(data);

  chart.title('Most Frequently Used Weapons For All Homicides in 2019');

  anychart.theme(anychart.themes.darkTurquoise);

  chart.yScale().ticks().interval(100);

  chart.yGrid().enabled(true);

  chart.animation(true);

  chart.container('container');

  chart.draw();
}

getStats();
