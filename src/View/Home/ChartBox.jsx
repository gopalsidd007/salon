import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import HttpClient from "../../utils/HttpClient";

const ChartBox = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "HR",
        data: [],
      },
      {
        name: "Manager",
        data: [],
      },
      {
        name: "Employee",
        data: [],
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        title: {
          text: "Employee Strength",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " unit";
          },
        },
      },
    },
  });

  const monthData = async () => {
    const res = await HttpClient.requestData(
      "view-card-month-group",
      "POST",
      {}
    );

    console.log(res?.data, "resmonth");
    const data = await res?.data;
    // Extract month-wise data
    if (
      Array.isArray(data?.hrData) &&
      Array.isArray(data?.managerData) &&
      Array.isArray(data?.hrData?.employeeData)
    ) {
      const HRData = data?.hrData?.map((item) => item?.totalAdmins);
      const ManagerData = data?.managerData?.map((item) => item?.totalManagers);
      const EmployeeData = data?.employeeData?.map(
        (item) => item?.totalEmployees
      );

      setChartData((prevState) => ({
        ...prevState,
        series: [
          { name: "HR", data: HRData },
          { name: "Manager", data: ManagerData },
          { name: "Employee", data: EmployeeData },
        ],
      }));
    } else {
      // alert("Chart data not loaded");
    }
  };
  useEffect(() => {
    monthData();
  }, []);
  return (
    <>
      <section className="chartBox_area">
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </section>
    </>
  );
};

export default ChartBox;
