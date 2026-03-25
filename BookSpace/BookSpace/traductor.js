document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('translate-button');
    let currentLang = 'es'; // Empieza en español

    button.addEventListener('click', () => {
        const targetLang = currentLang === 'es' ? 'en' : 'es';

        // ⚠️ Aquí es donde integras la llamada a tu API/Librería de traducción
        // Ejemplo conceptual:
        // translatePage(targetLang);

        if (targetLang === 'en') {
            button.textContent = '🌐 Translate (EN/ES)';
        } else {
            button.textContent = '🌐 Traducir (ES/EN)';
        }

        currentLang = targetLang;
        alert(`Página traducida a: ${targetLang}`); // Reemplazar con lógica real
    });
});