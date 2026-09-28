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

// programação: a grade fica no arquivo js/programacao.js
// pelo horário de Brasília o site mostra no player quem está no ar e marca o programa na linha do tempo

// o Brasil não tem mais horário de verão, então Brasília fica sempre 3 horas atrás do horário UTC
// por isso as contas usam getUTCHours e getUTCDay, assim não depende do fuso do computador de quem abre o site
function horarioDeBrasilia() {
    return new Date(Date.now() - 3 * 60 * 60 * 1000);
}

// minutos desde a meia-noite: 14:30 vira 870, fica fácil comparar horários
function minutosAgora() {
    const agora = horarioDeBrasilia();
    return agora.getUTCHours() * 60 + agora.getUTCMinutes();
}

// "14:30" vira 870
function paraMinutos(horario) {
    const partes = horario.split(":");
    return Number(partes[0]) * 60 + Number(partes[1]);
}

// 870 vira "14:30"
function paraHorario(minutos) {
    const horas = String(Math.floor(minutos / 60)).padStart(2, "0");
    const resto = String(minutos % 60).padStart(2, "0");
    return horas + ":" + resto;
}

// qual lista da grade vale hoje: getUTCDay dá 0 no domingo, 5 na sexta e 6 no sábado
function diaDeHoje() {
    const dia = horarioDeBrasilia().getUTCDay();

    if (dia === 0) {
        return "domingo";
    }
    if (dia === 5) {
        return "sexta";
    }
    if (dia === 6) {
        return "sabado";
    }
    return "segunda-a-quinta";
}

// procura na grade de hoje o programa que começou e ainda não terminou
function programaNoAr() {
    const agora = minutosAgora();

    const programa = programacao[diaDeHoje()].find(function (programa) {
        return agora >= paraMinutos(programa.inicio) && agora < paraMinutos(programa.fim);
    });

    return programa || programaForaDaGrade;
}

// coloca no card grande e no player fixo o programa, o locutor e a foto de quem está no ar
function atualizarPlayerNoAr() {
    const programa = programaNoAr();

    document.querySelectorAll("[data-programa-atual]").forEach(function (elemento) {
        elemento.textContent = programa.programa;
    });

    // programa sem locutor esconde a linha do "com ..."
    document.querySelectorAll("[data-locutor-atual]").forEach(function (elemento) {
        elemento.textContent = "com " + programa.locutor;
        elemento.hidden = !programa.locutor;
    });

    // sem foto aparece a logo branca da rádio (a classe sem-foto deixa ela inteira no meio)
    const foto = document.querySelector("[data-foto-atual]");

    // a página de história não troca a foto do card, então para aqui
    if (!foto) {
        return;
    }

    const caminhoFoto = programa.foto || "img/logos/logo-branca.svg";

    if (foto.getAttribute("src") !== caminhoFoto) {
        foto.src = caminhoFoto;
    }

    foto.alt = programa.locutor ? programa.locutor + " no estúdio da Rádio Independência" : "Logo da Rádio Independência";
    foto.parentElement.classList.toggle("sem-foto", !programa.foto);
}

const listaProgramas = document.querySelector("[data-lista-programas]");
const abas = document.querySelectorAll(".aba");

// monta os cards da linha do tempo do dia escolhido na aba
// só no dia de hoje tem programa que já passou, programa no ar e o marcador "Agora"
function mostrarProgramacao(dia) {
    const agora = minutosAgora();
    const hoje = dia === diaDeHoje();

    listaProgramas.innerHTML = "";

    programacao[dia].forEach(function (programa) {
        const inicio = paraMinutos(programa.inicio);
        const fim = paraMinutos(programa.fim);
        const noAr = hoje && agora >= inicio && agora < fim;

        const item = document.createElement("li");
        item.className = "programa";

        if (hoje && agora >= fim) {
            item.classList.add("ja-passou");
        }

        let html = "";

        if (noAr) {
            item.classList.add("no-ar");
            item.setAttribute("aria-current", "true");
            html += `<p class="agora-marcador">Agora ${paraHorario(agora)}</p>`;
        }

        html += `<time class="programa-horario">${programa.inicio} às ${programa.fim}</time>`;

        if (noAr) {
            html += `<span class="selo-no-ar">No ar</span>`;
        }

        html += `<h3 class="programa-nome">${programa.programa}</h3>`;

        if (programa.locutor) {
            html += `<p class="programa-locutor">${programa.locutor}</p>`;
        }

        // a barrinha enche conforme o programa anda: (agora - início) / (fim - início)
        if (noAr) {
            const andamento = (agora - inicio) / (fim - inicio) * 100;
            html += `<span class="programa-progresso" aria-hidden="true"><span class="programa-progresso-barra" style="width: ${andamento}%"></span></span>`;
        }

        item.innerHTML = html;
        listaProgramas.appendChild(item);
    });
}

// rola a linha do tempo deixando no meio o programa de agora (ou o próximo, ou o último se todos já passaram)
function rolarAteAgora() {
    const programas = listaProgramas.children;
    const atual = listaProgramas.querySelector(".programa:not(.ja-passou)") || programas[programas.length - 1];

    // dia sem nenhum programa na grade
    if (!atual) {
        return;
    }

    const distancia = atual.getBoundingClientRect().left - listaProgramas.getBoundingClientRect().left;
    listaProgramas.scrollLeft += distancia - (listaProgramas.clientWidth - atual.offsetWidth) / 2;
}

// marca a aba escolhida e mostra os programas daquele dia
function escolherAba(dia) {
    abas.forEach(function (aba) {
        aba.setAttribute("aria-selected", aba.dataset.dia === dia);
    });

    mostrarProgramacao(dia);

    if (dia === diaDeHoje()) {
        rolarAteAgora();
    } else {
        listaProgramas.scrollLeft = 0;
    }
}

abas.forEach(function (aba) {
    aba.addEventListener("click", function () {
        escolherAba(aba.dataset.dia);
    });
});

// ao abrir o site: player com quem está no ar e a aba do dia de hoje (sábado e domingo abrem nas suas abas)
// o if evita erro nas páginas que não têm a linha do tempo da programação
atualizarPlayerNoAr();

if (listaProgramas) {
    escolherAba(diaDeHoje());
}

// a cada minuto atualiza o player e a aba aberta (programa no ar, marcador "Agora" e barrinha)
// a rolagem da linha do tempo é guardada antes para não voltar pro começo
setInterval(function () {
    atualizarPlayerNoAr();

    if (!listaProgramas) {
        return;
    }

    const abaAberta = document.querySelector('.aba[aria-selected="true"]');
    const rolagem = listaProgramas.scrollLeft;

    mostrarProgramacao(abaAberta.dataset.dia);
    listaProgramas.scrollLeft = rolagem;
}, 60 * 1000);

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

// pedido de música: o site não tem servidor, então o pedido vai pronto numa conversa do whatsapp da rádio
// os botões "Peça uma música" são links que descem até a seção verde (na página de história, voltam para ela)
const formularioPedido = document.querySelector("[data-form-pedido]");
const whatsappRadio = "5545999358890";

// o que a pessoa escreve no formulário entra no lugar do nome, da música e do recado
// a cidade vai junto do nome, como no exemplo do campo ("Maria, de Medianeira")
function mensagemPedido() {
    const dados = new FormData(formularioPedido);
    const nome = dados.get("nome").trim();
    const musica = dados.get("musica").trim();
    const recado = dados.get("recado").trim();

    let mensagem = `Olá, sou ${nome}, e gostaria de pedir a música ${musica}`;

    // o recado vai numa linha separada
    if (recado) {
        mensagem += `\n\nRecado: ${recado}`;
    }

    return mensagem;
}

// o if evita erro nas páginas que não têm o formulário de pedido
// o required dos campos faz o navegador avisar o que falta antes de chegar no submit
if (formularioPedido) {
    formularioPedido.addEventListener("submit", function (evento) {
        evento.preventDefault();

        // o encodeURIComponent troca espaço, acento e quebra de linha pelos códigos que o link aceita (espaço vira %20)
        const link = `https://api.whatsapp.com/send?phone=${whatsappRadio}&text=${encodeURIComponent(mensagemPedido())}`;
        window.open(link, "_blank", "noopener");

        // depois de abrir o whatsapp o formulário fica limpo
        formularioPedido.reset();
    });
}
