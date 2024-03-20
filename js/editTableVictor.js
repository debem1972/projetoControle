// Function para salvar os dados da tabela no localStorage
function salvarDadosTabela() {
    let tabela = document.getElementById('tabela');
    localStorage.setItem('dadosTabela', tabela.innerHTML);
}

// Carregar dados da tabela do localStorage, se disponíveis
function carregarDadosTabela() {
    let tabela = document.getElementById("tabela");
    let dadosSalvos = localStorage.getItem('dadosTabela');
    if (dadosSalvos) {
        tabela.innerHTML = dadosSalvos;
    };
};

//-----------------------------------------------------------------------
function editar() {
    let tabela = document.getElementById("tabela");
    for (let i = 1; i < tabela.rows.length; i++) {     //Começa em 1 para evitar editar a linha thead
        for (let j = 0; j < tabela.rows[i].cells.length; j++) {
            tabela.rows[i].cells[j].contentEditable = "true";
        };
    };
    window.alert('IMPORTANTE!!! Edite os dados respeitando os formatos!Após a edição clique no botao Finalizar edição!');
};

//-----------------------------------------------------------------------
// Function para finalizar a edição e desabilitar a edição dos dados na tabela
function finalizarEdicao() {
    let tabela = document.getElementById("tabela");
    for (var i = 0; i < tabela.rows.length; i++) {
        for (var j = 0; j < tabela.rows[i].cells.length; j++) {
            tabela.rows[i].cells[j].contentEditable = "false";
        };
    };

    atualizarTotal();

    salvarDadosTabela();

};



//-----------------------------------------------------------------------




//-----------------------------------------------------------------------
//Function atualizarTotal() para atualizar o valor total de horas no id #calcTotalHoras após o usuário editar algum dado do id #tabela. Esta function será invocada dentro da function editar para atualizar o id #calcTotalHoras
function atualizarTotal() {
    let tabela = document.getElementById("tabela");
    let totalCompras = 0;
    let linhas = tabela.getElementsByTagName('tr');

    // Percorre as linhas, ignorando o cabeçalho (começando do índice 1)
    for (let i = 1; i < linhas.length; i++) {
        // Verifica se a linha está visível
        if (linhas[i].style.display !== 'none') {
            // Obtém o valor contido na célula5 da linha visível
            let valorCelula5 = linhas[i].cells[4].innerText.replace(/&nbsp;/g, '');  //Remover todos os &nbsp; da string;
            // Remove o formato monetário e converte para número
            let valorNumerico = parseFloat(valorCelula5.replace('R$', '').replace('.', '').replace(',', '.'));

            if (!isNaN(valorNumerico)) {
                totalCompras += valorNumerico;
            };


        };
    };

    // Formata o total de compras e atualiza o elemento no HTML
    let totalFormatado = totalCompras.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let total = document.getElementById("calcTotalCompras");
    total.innerText = totalFormatado;



};

// Carregar dados da tabela do localStorage ao carregar a página
carregarDadosTabela();
