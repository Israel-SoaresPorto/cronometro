// pega o botão de mudar o tema
const changeThemeButton = document.querySelector('#change-theme');

// pega o tema salvo em localStorage
let theme = localStorage.getItem('theme');

// inicializa o tema salvo
if(theme === "light") {
    document.body.classList.add("light");
}

// adiciona um evento de clique ao botão de mudar o tema
changeThemeButton.addEventListener('click', () => {
    if(document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.add('light');
        localStorage.setItem("theme", "light");
    }
});
