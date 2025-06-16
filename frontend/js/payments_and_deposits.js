fetch("http://localhost:3000/transactions")
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
              "#D4B483",
              "#C1666B",
              "#42A5F5",
              "#48A9A6",
              "#5FA8D3",
              "#F4A261",
              "#E76F51",
              "#2A9D8F",
              "#264653",
              "#E9C46A",
              "#6A4C93",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              color: "#9f9f9f",
              font: {
                size: 15,
              },
              padding: 20,
            },
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
