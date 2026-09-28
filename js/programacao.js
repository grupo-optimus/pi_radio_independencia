// grade da programação da Rádio Independência
// é só editar aqui que o site todo muda: o card do player no topo, o player fixo e a linha do tempo da programação
//
// cada programa tem:
//   "inicio" e "fim": horário no formato "hh:mm" (um programa que vai até a meia-noite termina em "24:00")
//   "programa": nome do programa
//   "locutor": quem apresenta, deixe "" quando o programa não tem locutor
//   "foto": caminho da foto do locutor, deixe "" para aparecer a logo da rádio no lugar
//
// "semana" vale de segunda a sexta, os programas de cada dia ficam em ordem de horário
// para colocar aspas num nome use “ ” (as aspas retas " fecham o texto e quebram o arquivo)
//
// os horários abaixo são ilustrativos, trocar pela grade real da rádio

const programacao = {
    "semana": [
        { "inicio": "06:00", "fim": "09:00", "programa": "Amanhecer na Costa Oeste", "locutor": "Valdecir “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "09:00", "fim": "12:00", "programa": "Programa Livre", "locutor": "Valdecir “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "12:00", "fim": "13:00", "programa": "Costa Oeste News", "locutor": "João Hermes", "foto": "img/equipe/joao-hermes.jpg" },
        { "inicio": "13:00", "fim": "14:00", "programa": "Programação musical", "locutor": "", "foto": "" },
        { "inicio": "14:00", "fim": "17:00", "programa": "Show da Tarde", "locutor": "Jeferson “Black”", "foto": "img/equipe/jeferson-black.jpg" },
        { "inicio": "17:00", "fim": "18:00", "programa": "Serranópolis em Destaque", "locutor": "Neilor de C.", "foto": "" },
        { "inicio": "18:00", "fim": "19:00", "programa": "Encontro de Bandas", "locutor": "Valdir H. Brod", "foto": "img/equipe/valdir-brod.jpg" }
    ],

    "sabado": [
        { "inicio": "07:00", "fim": "10:00", "programa": "Amanhecer na Costa Oeste", "locutor": "Valdecir “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "10:00", "fim": "12:00", "programa": "Encontro de Bandas", "locutor": "Valdir H. Brod", "foto": "img/equipe/valdir-brod.jpg" },
        { "inicio": "12:00", "fim": "18:00", "programa": "Programação musical", "locutor": "", "foto": "" }
    ],

    "domingo": [
        { "inicio": "07:00", "fim": "12:00", "programa": "Programação musical", "locutor": "", "foto": "" },
        { "inicio": "12:00", "fim": "14:00", "programa": "Encontro de Bandas", "locutor": "Valdir H. Brod", "foto": "img/equipe/valdir-brod.jpg" }
    ]
};

// o que aparece no player nos horários em que nenhum programa da grade está no ar
const programaForaDaGrade = {
    "programa": "Programação musical",
    "locutor": "",
    "foto": ""
};
