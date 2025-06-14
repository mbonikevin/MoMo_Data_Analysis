let data = [];

// fetching data
async function loadData() {
  try {
    const res = await fetch("./js/dummy_data.json");
    if (!res.ok) throw new Error("fail to get data");
    data = await res.json();
    renderCategoryList();
    renderTable(data);
    document.querySelector(".category_list div:first-child").click();
  } catch (err) {
    console.error("could not load data", err);
  }
}

loadData();

const categoryList = document.getElementById("category_list");
const tableBody = document.getElementById("table_body");
const modal = document.getElementById("modal");
const modalList = document.getElementById("modal_list");
const closeModal = document.getElementById("close_modal");

function getAllCategories() {
  return [...new Set(data.map((item) => item.category))];
}

function renderCategoryList() {
  categoryList.innerHTML = "";

  const categories = getAllCategories();
  const all = [
    `All (${data.length})`,
    ...categories.map((cat) => {
      const count = data.filter((d) => d.category === cat).length;
      return `${cat} (${count})`;
    }),
  ];

  all.forEach((label) => {
    const div = document.createElement("div");
    div.textContent = label;

    div.onclick = () => {
      const cat = label.split(" (")[0];
      const filtered =
        cat === "All" ? data : data.filter((d) => d.category === cat);
      renderTable(filtered);
      document
        .querySelectorAll(".category_list div")
        .forEach((el) => el.classList.remove("active"));
      div.classList.add("active");
    };

    categoryList.appendChild(div);
  });
}

function renderTable(list) {
  tableBody.innerHTML = "";
  list.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${i + 1}</td>
                <td>${item.category}</td>
                <td>${item.date}</td>
                <td class='message'>${item.message}</td>
                <td>${item.balance}</td>
                <td>${item.phone_number ?? ""}</td>
            `;
    row.onclick = () => showModal(item, i + 1);
    tableBody.appendChild(row);
  });
}

function showModal(item, id) {
  modalList.innerHTML = `
                <li><strong>Id:</strong> ${id}</li>
                <li><strong>Transaction Id:</strong> ${
                  item.transaction_id ?? ""
                }</li>
                <li><strong>Category:</strong> ${item.category}</li>
                <li><strong>Date:</strong> ${item.date}</li>
                <li><strong>Message:</strong> ${item.message}</li>
                <li><strong>Balance:</strong> ${item.balance}</li>
                <li><strong>Phone Number:</strong> ${
                  item.phone_number ?? ""
                }</li>
            `;
  modal.style.display = "flex";
}

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};


document.querySelector('.search').addEventListener('input', function () {
    const value = this.value.toLowerCase().trim()
    const filtered = data.filter(item => item.message.toLowerCase().includes(value))
    renderTable(filtered)
})