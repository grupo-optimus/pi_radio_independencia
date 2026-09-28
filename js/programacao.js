// grade da programação da Rádio Independência (Programação 2026 - 92 FM)
// é só editar aqui que o site todo muda: o card do player no topo, o player fixo e a linha do tempo da programação
//
// cada programa tem:
//   "inicio" e "fim": horário no formato "hh:mm" (um programa que vai até a meia-noite termina em "24:00")
//   "programa": nome do programa
//   "locutor": quem apresenta, deixe "" quando o programa não tem locutor
//   "foto": caminho da foto do locutor, deixe "" para aparecer a logo da rádio no lugar
//
// "segunda-a-quinta" vale de segunda a quinta, "sexta" só na sexta (muda só o fim da noite)
// os programas de cada dia ficam em ordem de horário, sem um passar por cima do outro:
// um programa curto no meio de outro divide ele em dois (como a Revista Costa Oeste antes e depois do Programa da Lar)
// para colocar aspas num nome use “ ” (as aspas retas " fecham o texto e quebram o arquivo)

const programacao = {
    "segunda-a-quinta": [
        { "inicio": "00:10", "fim": "05:00", "programa": "Madrugadão da 92", "locutor": "", "foto": "" },
        { "inicio": "05:00", "fim": "07:00", "programa": "Amanhecer na Costa Oeste", "locutor": "Valdecir Gonçalves “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "07:00", "fim": "08:00", "programa": "Tudo Sob Controle", "locutor": "João Hermes e Sergio Giembra", "foto": "img/equipe/joao-hermes.jpg" },
        { "inicio": "08:00", "fim": "10:00", "programa": "Bom dia Costa Oeste", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "10:00", "fim": "11:00", "programa": "Experiência de Deus", "locutor": "Pe. Reginaldo Manzotti", "foto": "" },
        { "inicio": "11:00", "fim": "12:00", "programa": "Revista Costa Oeste", "locutor": "Sergio Giembra", "foto": "img/equipe/sergio-giembra.jpg" },
        { "inicio": "12:00", "fim": "12:10", "programa": "Programa da Lar", "locutor": "", "foto": "" },
        { "inicio": "12:10", "fim": "13:00", "programa": "Revista Costa Oeste", "locutor": "Sergio Giembra", "foto": "img/equipe/sergio-giembra.jpg" },
        { "inicio": "13:00", "fim": "14:55", "programa": "Programa Livre", "locutor": "Valdecir Gonçalves “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "14:55", "fim": "15:00", "programa": "Momento Espírita", "locutor": "", "foto": "" },
        { "inicio": "15:00", "fim": "17:00", "programa": "Show da Tarde", "locutor": "Jeferson Luis “Black”", "foto": "img/equipe/jeferson-black.jpg" },
        { "inicio": "17:00", "fim": "18:00", "programa": "Canta Brasil", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "18:00", "fim": "18:05", "programa": "A Hora do Ângelus", "locutor": "", "foto": "" },
        { "inicio": "18:05", "fim": "19:00", "programa": "Canta Brasil", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "19:10", "fim": "20:00", "programa": "Voz do Brasil", "locutor": "", "foto": "" },
        { "inicio": "20:00", "fim": "22:00", "programa": "Play List da 92", "locutor": "", "foto": "" },
        { "inicio": "22:10", "fim": "22:30", "programa": "Programa Tabernáculo da Fé", "locutor": "", "foto": "" },
        { "inicio": "22:30", "fim": "24:00", "programa": "Boa Noite da 92", "locutor": "", "foto": "" }
    ],

    "sexta": [
        { "inicio": "00:10", "fim": "05:00", "programa": "Madrugadão da 92", "locutor": "", "foto": "" },
        { "inicio": "05:00", "fim": "07:00", "programa": "Amanhecer na Costa Oeste", "locutor": "Valdecir Gonçalves “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "07:00", "fim": "08:00", "programa": "Tudo Sob Controle", "locutor": "João Hermes e Sergio Giembra", "foto": "img/equipe/joao-hermes.jpg" },
        { "inicio": "08:00", "fim": "10:00", "programa": "Bom dia Costa Oeste", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "10:00", "fim": "11:00", "programa": "Experiência de Deus", "locutor": "Pe. Reginaldo Manzotti", "foto": "" },
        { "inicio": "11:00", "fim": "12:00", "programa": "Revista Costa Oeste", "locutor": "Sergio Giembra", "foto": "img/equipe/sergio-giembra.jpg" },
        { "inicio": "12:00", "fim": "12:10", "programa": "Programa da Lar", "locutor": "", "foto": "" },
        { "inicio": "12:10", "fim": "13:00", "programa": "Revista Costa Oeste", "locutor": "Sergio Giembra", "foto": "img/equipe/sergio-giembra.jpg" },
        { "inicio": "13:00", "fim": "14:55", "programa": "Programa Livre", "locutor": "Valdecir Gonçalves “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "14:55", "fim": "15:00", "programa": "Momento Espírita", "locutor": "", "foto": "" },
        { "inicio": "15:00", "fim": "17:00", "programa": "Show da Tarde", "locutor": "Jeferson Luis “Black”", "foto": "img/equipe/jeferson-black.jpg" },
        { "inicio": "17:00", "fim": "18:00", "programa": "Canta Brasil", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "18:00", "fim": "18:05", "programa": "A Hora do Ângelus", "locutor": "", "foto": "" },
        { "inicio": "18:05", "fim": "19:00", "programa": "Canta Brasil", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "19:10", "fim": "20:00", "programa": "Voz do Brasil", "locutor": "", "foto": "" },
        { "inicio": "20:00", "fim": "22:00", "programa": "Play List da 92", "locutor": "", "foto": "" },
        { "inicio": "22:00", "fim": "24:00", "programa": "Boa Noite da 92", "locutor": "", "foto": "" }
    ],

    "sabado": [
        { "inicio": "00:10", "fim": "05:00", "programa": "Madrugadão da 92", "locutor": "", "foto": "" },
        { "inicio": "05:00", "fim": "06:00", "programa": "Chimarrão e Viola", "locutor": "Valdecir Gonçalves “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "06:00", "fim": "06:03", "programa": "Expedição Costa Oeste", "locutor": "", "foto": "" },
        { "inicio": "06:03", "fim": "06:50", "programa": "Chimarrão e Viola", "locutor": "Valdecir Gonçalves “Xi”", "foto": "img/equipe/valdecir-xi.jpg" },
        { "inicio": "06:50", "fim": "07:00", "programa": "Programa do Sindicato Rural Patronal", "locutor": "", "foto": "" },
        { "inicio": "07:00", "fim": "08:00", "programa": "Costa Oeste em Pauta", "locutor": "João Hermes e Sergio Giembra", "foto": "img/equipe/joao-hermes.jpg" },
        { "inicio": "08:00", "fim": "10:00", "programa": "Sabashow", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "10:00", "fim": "11:00", "programa": "Experiência de Deus", "locutor": "Pe. Reginaldo Manzotti", "foto": "" },
        { "inicio": "11:00", "fim": "12:00", "programa": "Sabashow", "locutor": "Carlinhos Pessoa", "foto": "img/equipe/carlinhos-pessoa.jpg" },
        { "inicio": "12:00", "fim": "12:10", "programa": "Programa da Lar", "locutor": "", "foto": "" },
        { "inicio": "12:10", "fim": "12:20", "programa": "Programa da Paróquia de Medianeira", "locutor": "", "foto": "" },
        { "inicio": "12:20", "fim": "12:30", "programa": "Programa do Sindicato dos Trabalhadores Rurais de Medianeira", "locutor": "", "foto": "" },
        { "inicio": "12:30", "fim": "12:40", "programa": "Programa do Yanten", "locutor": "", "foto": "" },
        { "inicio": "12:40", "fim": "12:55", "programa": "Programa da Igreja Luterana do Brasil", "locutor": "", "foto": "" },
        { "inicio": "12:55", "fim": "13:00", "programa": "Programa O Melhor de Você", "locutor": "", "foto": "" },
        { "inicio": "13:00", "fim": "16:00", "programa": "Chimarreando na Costa Oeste", "locutor": "Joel Araújo", "foto": "" },
        { "inicio": "16:00", "fim": "18:00", "programa": "Banda do Sul", "locutor": "", "foto": "" },
        { "inicio": "18:00", "fim": "19:30", "programa": "As 30 Mais da 92", "locutor": "", "foto": "" },
        { "inicio": "19:30", "fim": "21:30", "programa": "Baú da 92", "locutor": "", "foto": "" },
        { "inicio": "21:30", "fim": "24:00", "programa": "Boa Noite da 92", "locutor": "", "foto": "" }
    ],

    "domingo": [
        { "inicio": "00:10", "fim": "05:00", "programa": "Madrugadão da 92", "locutor": "", "foto": "" },
        { "inicio": "05:00", "fim": "06:30", "programa": "Acorda Brasil", "locutor": "", "foto": "" },
        { "inicio": "06:30", "fim": "06:45", "programa": "Pastoral da Criança", "locutor": "", "foto": "" },
        { "inicio": "06:45", "fim": "07:00", "programa": "Vem Diga Sim a Vida", "locutor": "", "foto": "" },
        { "inicio": "07:00", "fim": "09:00", "programa": "Encontro de Bandas", "locutor": "Valdir Henrique", "foto": "img/equipe/valdir-brod.jpg" },
        { "inicio": "09:00", "fim": "13:00", "programa": "Revista Costa Oeste", "locutor": "Sergio Giembra", "foto": "img/equipe/sergio-giembra.jpg" },
        { "inicio": "13:00", "fim": "14:00", "programa": "Um Novo Caminho", "locutor": "", "foto": "" },
        { "inicio": "14:10", "fim": "15:00", "programa": "Banda do Sul", "locutor": "", "foto": "" },
        { "inicio": "15:00", "fim": "17:00", "programa": "Domingão da 92", "locutor": "", "foto": "" },
        { "inicio": "17:00", "fim": "19:00", "programa": "Baú da 92", "locutor": "", "foto": "" },
        { "inicio": "19:00", "fim": "20:30", "programa": "As 30 Mais da 92", "locutor": "", "foto": "" },
        { "inicio": "20:30", "fim": "24:00", "programa": "Boa Noite da 92", "locutor": "", "foto": "" }
    ]
};

// o que aparece no player nos horários em que nenhum programa da grade está no ar
const programaForaDaGrade = {
    "programa": "Programação musical",
    "locutor": "",
    "foto": ""
};
