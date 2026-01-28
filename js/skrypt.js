

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