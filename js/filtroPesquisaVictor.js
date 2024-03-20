//Configurando o input de filtro e busca

const input_busca = document.querySelector('#input-busca');
const tabela_horas = document.querySelector('#tabela');

input_busca.addEventListener('keyup', function () {
    let expressao = input_busca.value.toLowerCase().split(' ');   //Separa os termos de busca;

    /*  if (expressao.length === 1) {
          return;
      }*/

    let linhas = tabela_horas.getElementsByTagName('tr');

    // Comece a partir da segunda linha (índice 1), ignorando o cabeçalho
    for (let posicao = 1; posicao < linhas.length; posicao++) {
        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();
        let correspondencia = expressoes.every(expressao => conteudoDaLinha.includes(expressao));   // Verifica se todas as expressões estão na linha

        /*if (conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        };*/
        linhas[posicao].style.display = correspondencia ? '' : 'none';
    };

    atualizarTotal();

});



//------------------------------------------------------------------
//Function atualizarTotal() para atualizar o valor total de horas no id #calcTotalHoras após o usuário editar algum dado do id #tabela. Esta function será invocada dentro da function editar para atualizar o id #calcTotalHoras
//3ª abordagem
function atualizarTotal() {
    let tabela = document.getElementById("tabela");
    let totalCompras = 0;
    let linhas = tabela.getElementsByTagName('tr');

    // Percorre as linhas, ignorando o cabeçalho (começando do índice 1)
    for (let i = 1; i < linhas.length; i++) {
        // Verifica se a linha está visível
        if (linhas[i].style.display !== 'none') {
            // Obtém o valor contido na célula5 da linha visível
            let valorCelula5 = linhas[i].cells[4].innerHTML.replace(/&nbsp;/g, '');  //Remover todos os &nbsp; da string;
            // Remove o formato monetário e converte para número
            let valorNumerico = parseFloat(valorCelula5.replace('R$', '').replace('.', '').replace(',', '.'));
            // Verifica se o valor é um número válido antes de somá-lo
            if (!isNaN(valorNumerico)) {
                totalCompras += valorNumerico;
            };


        };
    };

    // Formata o total de compras e atualiza o elemento no HTML
    let totalFormatado = totalCompras.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let total = document.getElementById("calcTotalCompras");
    total.innerHTML = totalFormatado;

    // Carregar dados da tabela do localStorage, se disponíveis
    /*let dadosSalvos = localStorage.getItem('dadosTabela');
    if (dadosSalvos) {
        tabela.innerHTML = JSON.parse(dadosSalvos);
    };*/

    //console.log('O valor total das compras é: ', totalFormatado);

};
