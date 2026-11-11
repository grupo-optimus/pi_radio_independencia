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

// minutos em que o programa termina: quem termina às "00:00" acaba na meia-noite do fim do dia, então vale 1440 e não 0
function fimEmMinutos(programa) {
    if (programa.fim === "00:00") {
        return 24 * 60;
    }

    return paraMinutos(programa.fim);
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
        return agora >= paraMinutos(programa.inicio) && agora < fimEmMinutos(programa);
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

    // o texto da imagem diz o que ela mostra: o locutor, a imagem do programa (programa sem locutor) ou a logo da rádio
    if (!programa.foto) {
        foto.alt = "Logo da Rádio Independência";
    } else {
        foto.alt = programa.locutor || programa.programa;
    }
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
        const fim = fimEmMinutos(programa);
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
