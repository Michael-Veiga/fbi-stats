// let submit = document
//   .getElementById('submit')
//   .addEventListener('click', getStats);
let dataArr = [];
var data = {
  header: ['Weapon', 'Number of Times Used'],
  rows: [],
};

// fetch function to retrieve crime data from FBI API
function getStats() {
  fetch(
    'https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/homicide-offenses/offense/national/WEAPONS?API_KEY=ZzVVKGxH8p4Fcd0fpa4o5QLBSUnGT0N18jao0Jv1'
  )
    .then(response => response.json())
    .then(result => {
      let allData = result.results;
      //   loop through results and only return JSON data that has a data year greater than or equal to 2000
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
  //   let yearSelection = document.getElementById('yearInput');
  let newArr = [];
  for (let j = 0; j < dataArr.length; j++) {
    if (dataArr[j].data_year == 2018) {
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

  function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return b[1] < a[1] ? -1 : 1;
    }
  }

  let sortedData = data.rows.sort(compareSecondColumn);

  console.log(data.rows);

  var chart = anychart.bar();

  chart.data(sortedData);

  chart.title('Most Frequently Used Weapons For All Homicides in 2019');

  anychart.theme(anychart.themes.darkTurquoise);

  chart.yScale().ticks().interval(100);

  chart.yGrid().enabled(true);

  chart.animation(true);

  chart.container('container');

  chart.draw();
}

getStats();
