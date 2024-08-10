const toggleButton = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');

toggleButton.addEventListener('click', () => {
    if (themeStylesheet.getAttribute('href') === 'style.css/light-mode.css') {
        themeStylesheet.setAttribute('href', 'style.css/dark-mode.css');
        localStorage.setItem('theme', 'dark');
    } else {
        themeStylesheet.setAttribute('href', 'style.css/light-mode.css');
        localStorage.setItem('theme', 'light');
    }
});

// Load the saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    themeStylesheet.setAttribute('href', savedTheme === 'dark' ? 'style.css/dark-mode.css' : 'style.css/light-mode.css');
}
