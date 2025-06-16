fetch("http://localhost:3000/transactions")
  .then((res) => res.json())
  .then((rawData) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const incomeByMonth = Array(12).fill(0);
    const expenseByMonth = Array(12).fill(0);

    rawData.forEach((tx) => {
      const date = new Date(tx.date);
      const monthIndex = date.getMonth();

      if (tx.category.includes("Incoming") || tx.category.includes("Deposit")) {
        incomeByMonth[monthIndex] += tx.amount_rwf;
      } else {
        expenseByMonth[monthIndex] += tx.amount_rwf;
      }
    });

    new Chart(document.querySelector(".in_out_chart"), {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Money in",
            data: incomeByMonth,
            backgroundColor: "#1E88E5",
            borderRadius: 10,
            barPercentage: 0.6,
          },
          {
            label: "Money out",
            data: expenseByMonth,
            backgroundColor: "rgba(30, 136, 229, 0.3)",
            borderRadius: 10,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: { usePointStyle: true, boxWidth: 8 },
          },
          title: {
            display: true,
            text: "Monthly summaries of transactions",
            align: "start",
            font: { size: 16 },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (val) => (val >= 1000 ? val / 1000 + "k" : val),
            },
            grid: {
              drawBorder: false,
              color: "#ececec",
            },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  })
  .catch((error) => console.error("Monthly chart data load error:", error));
