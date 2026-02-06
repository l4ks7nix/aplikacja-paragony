
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