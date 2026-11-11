// modo escuro: o script no <head> já colocou o tema salvo (ou o do sistema) no data-tema do <html>
// o css troca as cores pelas variáveis do html[data-tema="escuro"], aqui o botão troca o tema e salva a escolha
const botaoTema = document.querySelector(".botao-tema");
const html = document.documentElement;

function aplicarTema(tema) {
    const escuro = tema === "escuro";

    html.dataset.tema = tema;
    botaoTema.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
    botaoTema.setAttribute("aria-pressed", escuro);
}

botaoTema.addEventListener("click", function () {
    const novoTema = html.dataset.tema === "escuro" ? "claro" : "escuro";

    aplicarTema(novoTema);
    localStorage.setItem("ri-tema", novoTema);
});

// quem nunca apertou o botão acompanha o sistema, até quando ele troca de tema com o site aberto
const temaDoSistema = window.matchMedia("(prefers-color-scheme: dark)");

temaDoSistema.addEventListener("change", function () {
    if (!localStorage.getItem("ri-tema")) {
        aplicarTema(temaDoSistema.matches ? "escuro" : "claro");
    }
});

// deixa o botão com o nome certo para o tema com que a página abriu
aplicarTema(html.dataset.tema);
