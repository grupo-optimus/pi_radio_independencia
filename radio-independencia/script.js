const botaoTema = document.querySelector(".botao-tema");
const html = document.documentElement;

botaoTema.addEventListener("click", function () {

    if (html.dataset.tema === "claro") {
        html.dataset.tema = "escuro";
        botaoTema.setAttribute("aria-label", "Ativar modo claro");
        botaoTema.setAttribute("aria-pressed", "true");
    } else {
        html.dataset.tema = "claro";
        botaoTema.setAttribute("aria-label", "Ativar modo escuro");
        botaoTema.setAttribute("aria-pressed", "false");
    }

});