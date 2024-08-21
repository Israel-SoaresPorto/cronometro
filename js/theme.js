// pega o botão de mudar o tema
const changeThemeButton = document.querySelector('#change-theme');

// pega o tema salvo em localStorage
let theme = localStorage.getItem('theme');

// inicializa o tema salvo
if(theme === "light") {
    document.documentElement.dataset.bsTheme = "light";
}

// adiciona um evento de clique ao botão de mudar o tema
changeThemeButton.addEventListener('click', () => {
    if(theme === "light") {
        theme = "dark";
        document.documentElement.dataset.bsTheme = "dark";
        localStorage.setItem("theme", theme);
    } else {
        theme = "light";
        document.documentElement.dataset.bsTheme = "light";
        localStorage.setItem("theme", theme);
    }
});
