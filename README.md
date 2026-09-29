# Rádio Independência 92,7 FM

Site institucional da Rádio Independência, de Medianeira (PR), feito para o PIE.

O layout foi prototipado no Figma antes do código. O site está sendo construído por partes: primeiro a estrutura HTML, depois o CSS de cada seção e agora o JavaScript.

## Como abrir

Não precisa instalar nada, é só abrir o `index.html` no navegador. O site é feito só com HTML, CSS e JavaScript puros.

## O que já funciona

### Página inicial (HTML e CSS)

- Cabeçalho com logo, menu, botão de modo escuro e botão "Ouça ao vivo"
- Hero com a chamada principal e o card do player ao vivo
- Faixa com os números da rádio
- Programação do dia em linha do tempo, com abas para segunda a sexta, sábado e domingo
- Quem Somos, com resumo da história e linha do tempo
- Carrossel com a equipe
- Seção de pedido de música, com formulário e link para o WhatsApp
- Contato com endereço, telefones, WhatsApp, e-mail, redes sociais e o mapa do Google
- Rodapé
- Player fixo na base da tela

Todas as seções seguem o Figma no desktop. Ao entrar no site, o hero ocupa a tela e a faixa preta dos números fica encaixada na base.

No celular, o cabeçalho, o hero, a faixa dos números e o player fixo seguem o Figma. As outras seções por enquanto só ficam uma embaixo da outra.

### JavaScript (`js/script.js`)

- **Player ao vivo:** toca o streaming da rádio. Todos os botões de ouvir (cabeçalho, hero, card, player fixo e rodapé) tocam e pausam o mesmo áudio.
- **Player fixo:** aparece na base da tela quando o card grande do player sai da tela, com os estados "Ao vivo" e "Pausado".
- **Volume:** as barras do card e do player fixo andam juntas, o último volume fica salvo no navegador e o alto-falante é o botão de mudo.
- **Programação por horário:** pelo horário de Brasília, o card do player mostra o programa, o locutor e a foto de quem está no ar. Na linha do tempo, o programa no ar fica verde, com o marcador "Agora" e a barrinha que enche conforme o programa anda. Tudo se atualiza a cada minuto.
- **Abas da programação:** o site abre na aba do dia (sábado e domingo abrem nas suas abas).
- **Carrossel da equipe:** as setas andam um card por vez e as bolinhas mostram a posição. No celular dá para arrastar.
- **Botão de tema:** por enquanto só troca o atributo `data-tema` do `<html>`, as cores do modo escuro ainda não existem.

## Como mudar a programação

A grade fica em `js/programacao.js`. É só editar esse arquivo que o card do player, o player fixo e a linha do tempo mudam juntos.

A grade é a real da rádio, tirada do documento "Programação 2026 - 92 FM".

Cada programa é uma linha:

```js
{ "inicio": "15:00", "fim": "17:00", "programa": "Show da Tarde", "locutor": "Jeferson Luis “Black”", "foto": "img/equipe/jeferson-black.jpg" },
```

- `"segunda-a-quinta"` vale de segunda a quinta, `"sexta"` só na sexta, e também tem `"sabado"` e `"domingo"` (uma aba para cada).
- Os programas de cada dia ficam em ordem de horário, sem um passar por cima do outro. Um programa curto no meio de outro divide ele em dois (a Revista Costa Oeste antes e depois do Programa da Lar).
- Programa sem locutor: `"locutor": ""` (a linha "com ..." some).
- Sem foto: `"foto": ""` (aparece a logo da rádio no lugar).
- Programa que vai até a meia-noite termina em `"00:00"` (o site entende que é a meia-noite do fim do dia).
- Nos horários sem nenhum programa, o player mostra o que estiver em `programaForaDaGrade`.
- Para colocar aspas num nome use “ ”, porque as aspas retas `"` quebram o arquivo.

A grade fica num arquivo `.js` e não num `.json` porque o navegador bloqueia a leitura de `.json` quando o site é aberto direto pelo arquivo, sem servidor.

## Estrutura de pastas

```
index.html
css/
  style.css         estilos de todas as seções, com o responsivo no fim
js/
  programacao.js    grade da programação
  script.js         player, programação, carrossel e botão de tema
img/
  equipe/           fotos da equipe
  historia/         fotos da história da rádio
  logos/            logos e ícones do site
```

## Próximos passos

- Cores do modo escuro, salvando a escolha no localStorage
- Menu do celular (o botão já existe, falta abrir e fechar)
- Janela de pedido de música e envio do pedido pelo WhatsApp
- Página `historia.html` (os links "Nossa história" já apontam para ela)
- Versão de celular do Figma para a programação e as seções de baixo

## Pendências

- Fotos da equipe que faltam e as fotos da história
- Links das redes sociais (Instagram, Facebook e YouTube ainda estão com `#`)
