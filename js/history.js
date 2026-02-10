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
// ZMIENNE
// ===============================
let searchTimeout = null;

// ===============================
// ELEMENTY DOM
// ===============================
const receiptsList = document.getElementById("receiptsList");
const totalSpentEl = document.getElementById("totalSpent");
const averageReceiptEl = document.getElementById("averageReceipt");
const searchInput = document.getElementById("searchInput");

// ===============================
// RENDER PARAGONÓW
// ===============================
function renderReceipts(data = receiptsData) {
  receiptsList.innerHTML = "";

  data.forEach((receipt, index) => {
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

  updateStats(data);
}

// ===============================
// STATYSTYKI
// ===============================
function updateStats(data = receiptsData) {
  const total = data.reduce((sum, r) => sum + r.total, 0);
  const average = data.length ? total / data.length : 0;

  totalSpentEl.textContent = `PLN ${total.toFixed(2)}`;
  averageReceiptEl.textContent = `PLN ${average.toFixed(2)}`;
}

// ===============================
// USUWANIE PARAGONU
// ===============================
receiptsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = Number(e.target.dataset.index);
    receiptsData.splice(index, 1);
    renderReceipts();
  }
});

// ===============================
// WYSZUKIWANIE (filter + debounce 1.5s)
// ===============================
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim().toLowerCase();

  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    if (!value) {
      renderReceipts(receiptsData);
      return;
    }

    const filtered = receiptsData.filter(r =>
      r.storeName.toLowerCase().includes(value)
    );

    renderReceipts(filtered);
  }, 1500);
});

// ===============================
// START
// ===============================
renderReceipts();

// ===============================
// POBIERANIE Z SERWERA
// ===============================
fetch("http://piotr106.mikrus.xyz:30106/api/recipes")
  .then(res => res.json())
  .then(receiptsArray => {
    const mapped = receiptsArray.map(r => ({
      storeName: r.name,
      date: r.date ?? "—",
      itemCount: r.itemCount ?? 0,
      total: Number(r.total) || 0,
    }));

    receiptsData.push(...mapped);
    renderReceipts();
  })
  .catch(err => {
    console.error("Błąd pobierania paragonów:", err);
  });
