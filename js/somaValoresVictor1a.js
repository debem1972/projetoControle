function somaComprasTotal() {
    // Obtém todas as linhas da tabela
    let linhasTabela = document.querySelectorAll('#tabela tr');

    // Inicializa a variável para armazenar a soma dos valores
    let somaValores = 0;

    // Itera sobre todas as linhas da tabela, começando da segunda linha (ignorando o cabeçalho)
    for (let i = 1; i < linhasTabela.length; i++) {
        // Obtém a célula que contém o valor da parcela (quinta célula, índice 4)
        let celulaValorParcela = linhasTabela[i].querySelectorAll('td')[4];
        //console.log('Célula Valor Parcela:', celulaValorParcela);


        // Obtém o valor formatado da parcela (no formato de moeda)
        let valorFormatado = celulaValorParcela.innerHTML.replace(/&nbsp;/g, '');  //Remover todos os &nbsp; da string
        console.log('Valor Formatado:', valorFormatado);

        // Remove o símbolo da moeda e quaisquer caracteres não numéricos
        let valorNumerico = parseFloat(valorFormatado.replace('R$', '').replace('.', '').replace(',', '.'));

        // Verifica se o valor é um número válido antes de somá-lo
        if (!isNaN(valorNumerico)) {
            // Adiciona o valor numérico à soma total
            somaValores += valorNumerico;
        };

        // Adiciona o valor numérico à soma total
        //somaValores += valorNumerico;
    };



    // Formata a soma total como moeda brasileira (BRL)
    let somaFormatada = somaValores.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    //console.log(typeof somaFormatada);
    // Exibe a soma total onde você deseja
    document.querySelector('#calcTotalCompras').innerHTML = somaFormatada;

    salvarDadosTabela();

    //carregarDadosTabela()

    //console.log('A soma total dos valores das parcelas é: ', somaFormatada);
};

// Chama a função somaComprasTotal() para calcular a soma total das parcelas ao carregar a página
document.addEventListener('DOMContentLoaded', function () {

    somaComprasTotal();
});

//---------------------------------------------------------------------

