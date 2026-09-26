# Rádio Independência 92,7 FM

Site institucional da Rádio Independência, de Medianeira (PR), feito para o PIE.

O layout foi prototipado no Figma antes do código. O site está sendo construído por partes e esta é a primeira etapa.

## O que tem até agora

Por enquanto só existe a estrutura HTML da página inicial (`index.html`), sem estilo e sem JavaScript.

A página tem as seguintes seções:

- Cabeçalho com logo, menu, botão de modo escuro e botão "Ouça ao vivo"
- Hero com chamada principal e card do player ao vivo (play e volume)
- Faixa com os números da rádio
- Programação do dia em linha do tempo, com abas para semana, sábado e domingo
- Quem Somos, com resumo da história e link para a página de história
- Carrossel com a equipe
- Seção de pedido de música, com formulário e link para o WhatsApp
- Contato com endereço, telefones, WhatsApp, e-mail, redes sociais e mapa
- Rodapé

Além das seções, a página tem um player fixo na parte de baixo da tela, uma janela (`dialog`) para o pedido de música e outra para a confirmação do pedido.

## Estrutura de pastas

```
index.html
css/
  style.css        (ainda não criado)
js/
  script.js        (ainda não criado)
img/
  ao-vivo/
  equipe/
  historia/
```

## Próximos passos

- CSS da página inicial
- Página `historia.html`
- JavaScript para o player, o volume, o carrossel, a programação por horário e o modo escuro (salvo no localStorage)
- Versão responsiva para celular

## Pendências

- Link do streaming da rádio
- Links das redes sociais
- Fotos da equipe e da história
- Grade real da programação (os horários atuais são ilustrativos)
- Incorporação do mapa
