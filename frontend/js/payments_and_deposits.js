fetch("./js/dummy_data.json")
  .then((res) => res.json())
  .then((rawData2) => {
    const categoryTotals = {};

    rawData2.forEach((tx) => {
      const cat = tx.category;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + tx.amount_rwf;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    new Chart(document.querySelector(".payment_distribution_chart"), {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#1E88E5",
              "#90CAF9",
              "#42A5F5",
              "#BBDEFB",
              "#64B5F6",
            ],
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
            text: "Distribution of Payments and Deposits",
            align: "start",
            font: { size: 16 },
          },
        },
      },
    });
  })
  .catch((error) => console.error("Chart data load error:", error));
