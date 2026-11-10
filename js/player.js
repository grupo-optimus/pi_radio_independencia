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
const estadoPlayer = document.querySelector("[data-estado-player]");

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

// mostra se a rádio está tocando ou pausada
function atualizarEstadoPlayer(tocando) {

    // troca o ícone de play pelo de pausa e marca os botões como apertados para o leitor de tela
    botoesTocar.forEach(function (botao) {
        botao.setAttribute("aria-pressed", tocando);

        const icone = botao.querySelector("use");
        if (icone) {
            icone.setAttribute("href", tocando ? "#icone-pausa" : "#icone-play");
        }
    });

    // player fixo igual ao figma: "Ao vivo" com bolinha vermelha tocando e "Pausado" com bolinha cinza parado
    playerFixo.classList.toggle("tocando", tocando);
    estadoPlayer.textContent = tocando ? "Ao vivo" : "Pausado";
}

audio.addEventListener("play", function () {
    atualizarEstadoPlayer(true);
});

audio.addEventListener("pause", function () {
    atualizarEstadoPlayer(false);
});
