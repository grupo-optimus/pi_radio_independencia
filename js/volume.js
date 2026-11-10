// volume: as barras do card e do player fixo mudam o mesmo áudio e andam juntas
// o último volume fica salvo no navegador
const barrasVolume = document.querySelectorAll("[data-volume]");
const botoesMudo = document.querySelectorAll("[data-mudo]");

// mostra nas barras e nos botões de mudo o volume atual do áudio
// no mudo as barras vão pro zero e o alto-falante ganha um x, quando o som volta elas voltam pro volume de antes
function atualizarVolume() {
    const valor = audio.muted ? 0 : Math.round(audio.volume * 100);

    barrasVolume.forEach(function (barra) {
        barra.value = valor;
        barra.style.setProperty("--volume", valor + "%"); // pinta a parte cheia da barra
    });

    botoesMudo.forEach(function (botao) {
        botao.setAttribute("aria-pressed", audio.muted);
        botao.querySelector("use").setAttribute("href", audio.muted ? "#icone-mudo" : "#icone-volume");
        botao.closest(".volume").classList.toggle("mudo", audio.muted);
    });
}

// o volumechange acontece sempre que o volume ou o mudo do áudio mudam
audio.addEventListener("volumechange", atualizarVolume);

barrasVolume.forEach(function (barra) {
    barra.addEventListener("input", function () {
        // mexer na barra tira o mudo
        audio.muted = false;
        audio.volume = barra.value / 100;
        localStorage.setItem("ri-volume", barra.value);
    });
});

botoesMudo.forEach(function (botao) {
    botao.addEventListener("click", function () {
        audio.muted = !audio.muted;
    });
});

// começa no último volume salvo ou em 70
audio.volume = (localStorage.getItem("ri-volume") || 70) / 100;
atualizarVolume();
