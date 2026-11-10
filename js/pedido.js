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
