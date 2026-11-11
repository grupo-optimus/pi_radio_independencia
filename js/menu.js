// menu do celular: o botão de três risquinhos abre e fecha o menu (o css mostra ele com a classe menu-aberto)
const cabecalho = document.querySelector(".cabecalho");
const botaoMenu = document.querySelector(".botao-menu-celular");

function abrirMenu(aberto) {
    cabecalho.classList.toggle("menu-aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

botaoMenu.addEventListener("click", function () {
    abrirMenu(!cabecalho.classList.contains("menu-aberto"));
});

// escolher um link leva para a seção e fecha o menu
cabecalho.querySelectorAll(".menu a").forEach(function (link) {
    link.addEventListener("click", function () {
        abrirMenu(false);
    });
});
