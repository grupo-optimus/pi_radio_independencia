# Rádio Independência 92,7 FM

Site institucional da Rádio Independência, de Medianeira (PR), feito pelo Grupo Optimus para o PIE.

O layout foi prototipado no Figma antes do código (desktop, celular, modo escuro e a página de história). O site foi construído por partes: primeiro a estrutura HTML, depois o CSS de cada seção e por último o JavaScript.

## Como abrir

Não precisa instalar nada, é só abrir o `index.html` no navegador. O site é feito só com HTML, CSS e JavaScript puros, sem servidor e sem biblioteca.

O site tem duas páginas:

- `index.html`: a página inicial
- `historia.html`: a história completa da rádio (os links "Nossa história", "Conheça a história completa" e "História da rádio" levam para ela)

## O que já funciona

### Página inicial

- Cabeçalho com logo, menu, botão de modo escuro e botão "Ouça ao vivo"
- Hero com a chamada principal e o card do player ao vivo
- Faixa preta com os números da rádio
- Programação em linha do tempo, com abas para segunda a quinta, sexta, sábado e domingo
- Quem Somos, com resumo da história e linha do tempo
- Carrossel com a equipe completa
- Peça uma música, com formulário que manda o pedido pelo WhatsApp
- Contato com endereço, telefones, WhatsApp, e-mail, redes sociais e o mapa do Google
- Rodapé
- Player fixo na base da tela

Todas as seções seguem o Figma no desktop. Ao entrar no site, o hero ocupa a tela e a faixa preta dos números fica encaixada na base.

No celular, o cabeçalho (com o menu que abre e fecha), o hero, a faixa dos números, as abas da programação e o player fixo seguem o Figma. As outras seções por enquanto só ficam uma embaixo da outra.

### Página de história

- Abertura com o título, uma foto e o player ao vivo
- O começo da rádio, em 1978, na AM 1580
- Linha do tempo com os momentos que marcaram a rádio (1978, 2000, 2021 e hoje)
- Homenagem a Moacir José Hanzen
- Galeria de fotos
- Direção da rádio
- Chamada final para ouvir e pedir música

O cabeçalho, o rodapé, o player fixo e o modo escuro são os mesmos da página inicial. O menu leva para as seções da própria página. Os estilos que só ela usa ficam em `css/historia.css`.

Os fatos da história foram tirados da matéria da revista Mosaicos sobre os 43 anos da rádio (dezembro de 2021).

### Modo escuro

- As cores seguem os frames "· Escuro" do Figma, com um verde mais vivo nos fundos
- A escolha fica salva no navegador (`localStorage`, chave `ri-tema`)
- Quem nunca apertou o botão acompanha o tema do sistema, até se ele mudar com o site aberto
- Um script no `<head>` aplica o tema antes de pintar a página, assim ela não pisca branca
- No escuro a logo do cabeçalho troca pela versão branca e o mapa do Google fica escuro

### JavaScript (`js/script.js`)

- **Player ao vivo:** toca o streaming da rádio. Todos os botões de ouvir (cabeçalho, hero, card, player fixo e rodapé) tocam e pausam o mesmo áudio.
- **Player fixo:** aparece na base da tela quando o card grande do player sai da tela, com os estados "Ao vivo" e "Pausado".
- **Volume:** as barras do card e do player fixo andam juntas, o último volume fica salvo no navegador e o alto-falante é o botão de mudo.
- **Programação por horário:** pelo horário de Brasília, o card do player mostra o programa, o locutor e a foto de quem está no ar (ou a imagem do programa). Na linha do tempo, o programa no ar fica verde, com o marcador "Agora" e a barrinha que enche conforme o programa anda. Tudo se atualiza a cada minuto.
- **Abas da programação:** o site abre na aba do dia (sexta, sábado e domingo abrem nas suas abas).
- **Carrossel da equipe:** as setas andam um card por vez e as bolinhas mostram a posição. No celular dá para arrastar.
- **Menu do celular:** o botão de três risquinhos abre o menu embaixo do cabeçalho, e escolher um link fecha ele.
- **Modo escuro:** o botão troca o tema e salva a escolha.
- **Pedido de música:** o site não tem servidor, então o "Enviar pedido" abre uma conversa no WhatsApp da rádio com a mensagem pronta (nome, música e recado). Os botões "Peça uma música" descem até o formulário.

## Como mudar a programação

A grade fica em `js/programacao.js`. É só editar esse arquivo que o card do player, o player fixo e a linha do tempo mudam juntos.

A grade é a real da rádio, tirada do documento "Programação 2026 - 92 FM" e conferida com a rádio.

Cada programa é uma linha:

```js
{ "inicio": "15:00", "fim": "17:00", "programa": "Show da Tarde", "locutor": "Jeferson Luis “Black”", "foto": "img/equipe/jeferson-black.jpg" },
```

- `"segunda-a-quinta"` vale de segunda a quinta, `"sexta"` só na sexta, e também tem `"sabado"` e `"domingo"` (uma aba para cada).
- Os programas de cada dia ficam em ordem de horário, sem um passar por cima do outro. Um programa curto no meio de outro divide ele em dois (a Revista Costa Oeste antes e depois do Programa da Lar).
- Programa sem locutor: `"locutor": ""` (a linha "com ..." some).
- A foto pode ser a do locutor (`img/equipe/`) ou uma imagem do programa (`img/programas/`). Sem foto: `"foto": ""` (aparece a logo da rádio no lugar).
- Programa com dois locutores usa a foto do primeiro.
- Programa que vai até a meia-noite termina em `"00:00"` (o site entende que é a meia-noite do fim do dia).
- Hoje a grade cobre o dia inteiro. Se algum horário ficar sem programa, o player mostra o que estiver em `programaForaDaGrade`.
- Para colocar aspas num nome use “ ”, porque as aspas retas `"` quebram o arquivo.

A grade fica num arquivo `.js` e não num `.json` porque o navegador bloqueia a leitura de `.json` quando o site é aberto direto pelo arquivo, sem servidor.

## Como mudar a equipe

Os cards do carrossel ficam no `index.html`, dentro de `<ul class="carrossel">`. Cada pessoa é um `<li class="membro">` com foto, nome, cargo e programa. As setas e as bolinhas se ajustam sozinhas à quantidade de cards.

- As fotos ficam em `img/equipe/`, em JPG quadrado de 330x330.
- Quem ainda não tem foto usa a logo branca com a classe `sem-foto` (como o card do Joel).
- Se a pessoa apresenta um programa, a mesma foto também vai na grade de `js/programacao.js`.

## Como mudar o WhatsApp

O número que recebe os pedidos de música fica na variável `whatsappRadio`, no fim do `js/script.js`, só com números (`55` + DDD + número). Os links "(45) 9 9935-8890" do `index.html` e do `historia.html` usam o mesmo número e precisam mudar junto.

## Estrutura de pastas

```
index.html          página inicial
historia.html       página da história da rádio
css/
  style.css         estilos do site todo, com o modo escuro no começo e o responsivo no fim
  historia.css      estilos que só a página de história usa
js/
  programacao.js    grade da programação
  script.js         modo escuro, menu do celular, player, programação, carrossel e pedido de música
img/
  equipe/           fotos da equipe (330x330)
  historia/         fotos da história da rádio
  logos/            logos e ícones do site
  programas/        imagens dos programas que não têm foto de locutor
```

## Próximos passos

- Versão de celular do Figma para a programação (a linha do tempo fica na vertical) e para as seções de baixo: Quem Somos, equipe, Peça uma música, contato e rodapé. Junto, resolver os celulares de 320px, onde os títulos da Programação e da Equipe e as abas dos dias passam da tela
- Media Session: mostrar o programa no ar na tela de bloqueio do celular, como pedem as notas do Figma

## Pendências

- Fotos que faltam: a do Joel Araújo e as fotos históricas da página de história (abertura, player, primeiros anos, 1978, 2000, hoje e quatro fotos da galeria)
- Links das redes sociais (Instagram, Facebook e YouTube ainda estão com `#`)
- Conferir com a rádio: a fonte do "1º em audiência na região", os cargos de Carlinhos, Sergio e Joel, o nome completo do Kaike e o título da página de história ("Da 1020 AM", mas a rádio começou na AM 1580)
