// ===============================
// DANE PARAGONÓW
// ===============================
const receiptsData = [
  {
    storeName: "Biedronka",
    date: "2025-12-23",
    itemCount: 5,
    total: 21,
  },
  {
    storeName: "Lidl",
    date: "2025-12-11",
    itemCount: 5,
    total: 12,
  },
  {
    storeName: "Auchan",
    date: "2025-12-12",
    itemCount: 5,
    total: 67,
  },
  {
    storeName: "Kaufland",
    date: "2025-09-10",
    itemCount: 100,
    total: 1562.98,
  },
];

// ===============================
// ELEMENTY DOM
// ===============================
const receiptsList = document.getElementById("receiptsList");
const totalSpentEl = document.getElementById("totalSpent");
const averageReceiptEl = document.getElementById("averageReceipt");

// ===============================
// RENDER PARAGONÓW
// ===============================
function renderReceipts() {
  receiptsList.innerHTML = "";

  receiptsData.forEach((receipt, index) => {
    const card = document.createElement("div");
    card.className = "receipt-card";

    card.innerHTML = `
      <div class="receipt-info">
        <h3>${receipt.storeName}</h3>
        <div class="receipt-meta">
          <span>📅 ${receipt.date}</span>
          <span>🛒 ${receipt.itemCount} items</span>
          <span>PLN ${receipt.total.toFixed(2)}</span>
        </div>
      </div>
      <button class="delete-btn" data-index="${index}">🗑️</button>
    `;

    receiptsList.appendChild(card);
  });

  updateStats();
}

// ===============================
// STATYSTYKI
// ===============================
function updateStats() {
  const total = receiptsData.reduce((sum, r) => sum + r.total, 0);
  const average = receiptsData.length ? total / receiptsData.length : 0;

  totalSpentEl.textContent = `PLN ${total.toFixed(2)}`;
  averageReceiptEl.textContent = `PLN ${average.toFixed(2)}`;
}

// ===============================
// USUWANIE PARAGONU
// ===============================
receiptsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    receiptsData.splice(index, 1);
    renderReceipts();
  }
});

// ===============================
// START
// ===============================
renderReceipts();

fetch("http://piotr106.mikrus.xyz:30106/api/recipes")
  .then(response => response.json())
  .then(receiptsArray => {
    const container = document.getElementById("receipts");

    receiptsArray.forEach(receipt => {
      const receiptDiv = document.createElement("div");
      receiptDiv.classList.add("receipt");

      receiptDiv.innerHTML = `
        <h3>${receipt.name}</h3>
        <p>Data: ${receipt.date}</p>
        <p>Cena: ${receipt.price} zł</p>
        <hr>
      `;

      container.appendChild(receiptDiv);
    });
  })
  .catch(err => {
    console.error("Błąd pobierania paragonów:", err);
  });
