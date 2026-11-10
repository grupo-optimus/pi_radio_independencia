// carrossel da equipe: as setas andam um card por vez, as bolinhas mostram a posição
// no celular dá pra arrastar com o dedo, o scroll-snap do css encaixa o card no lugar
const trilhoEquipe = document.querySelector("[data-carrossel-trilho]");
const setaVoltar = document.querySelector('[data-carrossel="voltar"]');
const setaAvancar = document.querySelector('[data-carrossel="avancar"]');
const pontosEquipe = document.querySelector(".carrossel-pontos");

// um passo do carrossel: a largura de um card mais o espaço até o próximo
function passoCarrossel() {
    const cards = trilhoEquipe.children;
    return cards[1].offsetLeft - cards[0].offsetLeft;
}

// cria as bolinhas, marca a da posição atual e apaga a seta do começo ou do fim
function atualizarCarrossel() {
    const passo = passoCarrossel();
    const fim = trilhoEquipe.scrollWidth - trilhoEquipe.clientWidth;

    // uma bolinha para cada posição em que o carrossel pode parar (no desktop cabem 4 cards, então são poucas)
    const posicoes = Math.ceil(fim / passo) + 1;

    // só recria as bolinhas quando a quantidade muda (quando a tela muda de tamanho)
    if (pontosEquipe.children.length !== posicoes) {
        pontosEquipe.innerHTML = "";

        for (let i = 0; i < posicoes; i++) {
            const ponto = document.createElement("span");
            ponto.className = "ponto";
            pontosEquipe.appendChild(ponto);
        }
    }

    // o -1 dá uma folga porque a rolagem às vezes para em meio pixel
    const noComeco = trilhoEquipe.scrollLeft <= 1;
    const noFim = trilhoEquipe.scrollLeft >= fim - 1;

    // no fim a última bolinha fica ativa, mesmo quando o último passo é menor que um card
    const atual = noFim ? posicoes - 1 : Math.round(trilhoEquipe.scrollLeft / passo);

    Array.from(pontosEquipe.children).forEach(function (ponto, indice) {
        ponto.classList.toggle("ativo", indice === atual);
    });

    setaVoltar.setAttribute("aria-disabled", noComeco);
    setaAvancar.setAttribute("aria-disabled", noFim);
}

// o if evita erro nas páginas que não têm o carrossel da equipe
if (trilhoEquipe) {
    setaVoltar.addEventListener("click", function () {
        trilhoEquipe.scrollBy({ left: -passoCarrossel(), behavior: "smooth" });
    });

    setaAvancar.addEventListener("click", function () {
        trilhoEquipe.scrollBy({ left: passoCarrossel(), behavior: "smooth" });
    });

    // arrastando, pelas setas ou mudando o tamanho da tela, as bolinhas e as setas acompanham
    trilhoEquipe.addEventListener("scroll", atualizarCarrossel);
    window.addEventListener("resize", atualizarCarrossel);

    atualizarCarrossel();
}
