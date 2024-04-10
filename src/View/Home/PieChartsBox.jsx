import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const PieChartsBox = ({ AnsPercentage, AnsOption }) => {
  console.log(AnsPercentage, AnsOption, "awd");
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const data = AnsPercentage.map((item) => parseFloat(item.toFixed(2)));
    console.log(data, "data2", AnsPercentage);

    if (data) {
      const colors = ["#cc002f", "#00E396", "#f3a742", "#3F51B5"];
      setChartState((prevState) => ({
        ...prevState,
        series: data,
        options: {
          ...prevState.options,
          colors: colors.slice(0, data.length),
          labels: AnsOption,
        },
      }));
    }
  }, [AnsPercentage, AnsOption]);

  return (
    <section className="piechartsBox_area">
      <div id="chart">
        {AnsPercentage.length > 0 && (
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="donut"
          />
        )}
      </div>
    </section>
  );
};

export default PieChartsBox;
