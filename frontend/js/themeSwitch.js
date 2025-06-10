function handleThemeSwitch() {
    const toggle = document.getElementById('toggle');
    localStorage.setItem('MDA_darkMode', toggle.checked);
    document.body.classList.toggle('dark', toggle.checked);
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const savedTheme = localStorage.getItem('MDA_darkMode');
    if (savedTheme !== null) {
        toggle.checked = savedTheme === 'true';
        document.body.classList.toggle('dark', toggle.checked);
    }
});