//CHART JS
const config1 = {
  type: "line",
  data: {
    labels: ["", ""],
    datasets: [
      {
        label: "SMALL",
        backgroundColor: "#edc9ff",
        borderColor: "#541388",
        data: [],
      },
      {
        label: "MEDIUM",
        backgroundColor: "#83c5be",
        borderColor: "#b8dedc",
        data: [],
      },
      {
        label: "LARGE",
        backgroundColor: "#ffddd2",
        borderColor: "#e29578",
        data: [],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
};
const config2 = {
  type: "line",
  data: {
    labels: ["", ""],
    datasets: [
      {
        label: "SMALL",
        backgroundColor: "#edc9ff",
        borderColor: "#541388",
        data: [],
      },
      {
        label: "MEDIUM",
        backgroundColor: "#83c5be",
        borderColor: "#b8dedc",
        data: [],
      },
      {
        label: "LARGE",
        backgroundColor: "#ffddd2",
        borderColor: "#e29578",
        data: [],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
};
const config3 = {
  type: "line",
  data: {
    labels: ["", ""],
    datasets: [
      {
        label: "SMALL",
        backgroundColor: "#edc9ff",
        borderColor: "#541388",
        data: [],
      },
      {
        label: "MEDIUM",
        backgroundColor: "#83c5be",
        borderColor: "#b8dedc",
        data: [],
      },
      {
        label: "LARGE",
        backgroundColor: "#ffddd2",
        borderColor: "#e29578",
        data: [],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
};


const oneMinuteChart = new Chart(document.getElementById("oneMinuteChart"), config1);
const twoMinuteChart = new Chart(document.getElementById("twoMinuteChart"), config2);
const threeMinuteChart = new Chart(document.getElementById("threeMinuteChart"), config3);

const chart1Display = document.querySelector('#chart1')
const chart2Display = document.querySelector('#chart2')
const chart3Display = document.querySelector('#chart3')
const chartDisplayArray = [
  chart1Display,
  chart2Display,
  chart3Display
]

var setAllChartDisplayToOff = function() {
  for (let element of chartDisplayArray) {
    setDisplayToDefault(element)
    element.classList.add('display-off')
  }
}

//adds data to the correct minute chart and to the right datasetindex
var addData = function (chart, datasetIndex) {
  if (!chart.config.data.datasets[datasetIndex].data.length) {
    chart.config.data.datasets[datasetIndex].data.push(0);
  }
  //append the data to the dataset and push a label to the labels array so it follows the documentation
  chart.config.data.datasets[datasetIndex].data.push(scoreInt);
  chart.config.data.labels.push("");
};

//updates the chart with the newly finished score
var updateChart = function () {
  let difficulity = targetSizeSelect.value;
  let datasetIndex;
  let chart;
  setAllChartDisplayToOff()
  if (difficulity === "hard") {
    datasetIndex = 0;
  } else if (difficulity === "medium") {
    datasetIndex = 1;
  } else if (difficulity === "easy") {
    datasetIndex = 2;
  }
  if (minutes === 1) {
    chart = oneMinuteChart
    chart1Display.classList.remove('display-off')
  } else if (minutes === 2) {
    chart = twoMinuteChart
    chart2Display.classList.remove('display-off')
  } else if (minutes === 3) {
    chart = threeMinuteChart
    chart3Display.classList.remove('display-off') 
  }
  addData(chart, datasetIndex);
  chart.update();
};
