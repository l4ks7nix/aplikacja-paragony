

document.addEventListener('DOMContentLoaded', () => {
    // Pobieramy elementy z DOM
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#apiKey');

    // Sprawdzamy, czy elementy istnieją na stronie
    if (togglePassword && passwordInput) {
        
        // Funkcja obsługująca kliknięcie w oko
        togglePassword.addEventListener('click', function () {
            // Sprawdzamy aktualny typ pola (password lub text)
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            
            // Zmieniamy typ pola, co pokazuje lub ukrywa znaki
            passwordInput.setAttribute('type', type);

            // Zmiana ikonę 
            this.textContent = type === 'password' ? '👁️' : '🙈';
            
            // Log do konsoli dla celów testowych (opcjonalnie)
            console.log(`Password visibility changed to: ${type}`);
        });
    } else {
        console.warn("Nie znaleziono elementówapiKey w pliku HTML.");
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.querySelector('.btn-primary');
    // 1. Obsługa zapisu klucza
    saveButton.addEventListener('click', (event) => {
        // Zatrzymujemy domyślne przeładowanie formularza
        event.preventDefault();

        const keyValue = apiKeyInput.value.trim();

        if (keyValue === "") {
            alert("Please enter an API key");
        } else {
            // Zapis do LocalStorage pod wymaganą nazwą
            localStorage.setItem('fl_api_key', keyValue);
        }
    });

});
document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.querySelector('.btn-primary');

    // - 1. WCZYTYWANIE KLUCZA PRZY OTWARCIU STRONY -
    // Pobierz wartość z LocalStorage
    const savedKey = localStorage.getItem('fl_api_key');

    // Jeśli klucz istnieje (nie jest null), wpisz go do inputa
    if (savedKey) {
        apiKeyInput.value = savedKey;
    }

    // - 2. ZAPISYWANIE KLUCZA -
        const keyValue = apiKeyInput.value.trim();

        if (keyValue === "") {
            alert("Please enter an API key");
        } else {
            localStorage.setItem('fl_api_key', keyValue);
            alert("API Key saved!");
        }
    });
// zoorganizowac listenery
//zniemic pobieranie z klasy prim-bt na ID
//zdeugować kod

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
