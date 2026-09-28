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

// player fixo: fica escondido enquanto o card grande do player (no topo) aparece na tela
// quando o card some, o player fixo aparece na base, assim sempre tem um player só na tela
const playerCard = document.querySelector(".player-card");
const playerFixo = document.querySelector(".player-fixo");

// o if evita erro nas páginas que não têm o card grande
if (playerCard && playerFixo) {
    const observadorCard = new IntersectionObserver(function (entradas) {
        const cardNaTela = entradas[0].isIntersecting;
        playerFixo.classList.toggle("escondido", cardNaTela);
    });

    observadorCard.observe(playerCard);
}

// play e pausa: todos os botões com data-acao="tocar" (cabeçalho, hero, card, player fixo e rodapé) controlam o mesmo áudio
const audio = document.querySelector("#radio-audio");
const botoesTocar = document.querySelectorAll('[data-acao="tocar"]');

botoesTocar.forEach(function (botao) {
    botao.addEventListener("click", function () {

        if (audio.paused) {
            // recarrega o stream para tocar o ao vivo de agora, e não de onde parou
            audio.load();
            audio.play().catch(function () {
                // se o stream não carregar, o player volta para o estado pausado
                audio.pause();
            });
        } else {
            audio.pause();
        }

    });
});

// troca o ícone de play pelo de pausa e marca os botões como apertados para o leitor de tela
function atualizarBotoesTocar(tocando) {
    botoesTocar.forEach(function (botao) {
        botao.setAttribute("aria-pressed", tocando);

        const icone = botao.querySelector("use");
        if (icone) {
            icone.setAttribute("href", tocando ? "#icone-pausa" : "#icone-play");
        }
    });
}

audio.addEventListener("play", function () {
    atualizarBotoesTocar(true);
});

audio.addEventListener("pause", function () {
    atualizarBotoesTocar(false);
});

// volume: as barras do card e do player fixo mudam o mesmo áudio e andam juntas
// o --volume pinta a parte cheia da barra e o último volume fica salvo no navegador
const barrasVolume = document.querySelectorAll("[data-volume]");

function mudarVolume(valor) {
    audio.volume = valor / 100;

    barrasVolume.forEach(function (barra) {
        barra.value = valor;
        barra.style.setProperty("--volume", valor + "%");
    });

    localStorage.setItem("ri-volume", valor);
}

barrasVolume.forEach(function (barra) {
    barra.addEventListener("input", function () {
        mudarVolume(barra.value);
    });
});

mudarVolume(localStorage.getItem("ri-volume") || 70);