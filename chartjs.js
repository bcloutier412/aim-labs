//CHART JS
const data = {
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
  };
  
  const config = {
    type: "line",
    data: data,
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  };
  
  const myChart = new Chart(document.getElementById("myChart"), config);

  //updates the chart with the newly finished score
  var updateChart = function () {
    let difficulity = targetSizeSelect.value;
    let datasetIndex;
    if (difficulity === "hard") {
      datasetIndex = 0;
    } else if (difficulity === "medium") {
      datasetIndex = 1;
    } else if (difficulity === "easy") {
      datasetIndex = 2;
    }
    //if there is no data in the dataset add a 0 to produce a line on the chart
    if (!myChart.config.data.datasets[datasetIndex].data.length) {
      myChart.config.data.datasets[datasetIndex].data.push(0);
    }
    //append the data to the dataset and push a label to the labels array so it follows the documentation
    myChart.config.data.datasets[datasetIndex].data.push(scoreInt);
    myChart.config.data.labels.push("");
    myChart.update();
  };
  