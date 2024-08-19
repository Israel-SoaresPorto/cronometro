const changeThemeButton = document.querySelector('#change-theme');

let theme = localStorage.getItem('theme');

if(theme === "light") {
    document.body.classList.add("light");
}

changeThemeButton.addEventListener('click', () => {
    if(document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.add('light');
        localStorage.setItem("theme", "light");
    }
});
