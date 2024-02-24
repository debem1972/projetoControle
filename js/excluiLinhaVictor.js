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
        tabela.innerHTML = dadosSalvos;    // Atribuir diretamente os dados salvos ao innerHTML
    };
};



//------------------------------------------------------------------
//capturando o botão "Deletar linha"
const btnDeletarLinha = document.getElementById('btnDeletarLinha');

//Capturando a tabela
let tabela = document.getElementById('tabela');

//-----------------------------------------------------------------------
// Adicionar um evento de clique no botão
btnDeletarLinha.addEventListener('click', () => {
    // Exibir alerta solicitando que o usuário selecione uma linha da tabela
    alert('Por favor, clique sobre uma linha da tabela para selecioná-la.');

    // Adicionar um evento de clique na tabela
    tabela.addEventListener('click', clickHandler);
});

//--------------------------------------------------------------------
// Função de tratamento de clique
function clickHandler(event) {
    const clickedRow = event.target.closest('tr');

    // Verificar se a linha clicada não está dentro do cabeçalho da tabela
    if (!clickedRow.closest('thead')) {
        if (clickedRow.dataset.selecionada === 'true') {
            // Desfazer a seleção
            clickedRow.classList.remove('linha-selecionada');
            clickedRow.removeAttribute('data-selecionada');
        } else {
            // Selecionar a linha
            pintarLinha(clickedRow);
        };
    };
};

//-------------------------------------------------------------
// Function pintarLinha
function pintarLinha(linha) {
    linha.classList.add('linha-selecionada');
    linha.setAttribute('data-selecionada', 'true');

    // Adicionar um delay para garantir que a classe seja aplicada antes do modal
    setTimeout(() => {
        // Exibir confirmação de deleção
        let confirmacao = confirm('Você tem certeza de que deseja excluir esta linha?');

        if (confirmacao) {
            deletarLinha(linha);
        } else {
            linha.classList.remove('linha-selecionada');
            linha.removeAttribute('data-selecionada');
            // Remover o evento de clique da tabela
            tabela.removeEventListener('click', clickHandler);
        }
    }, 100); // Tempo em milissegundos (100ms = 0.1s)
};


//-----------------------------------------------------------------------
// Function deletarLinha
function deletarLinha(linha) {
    // Remover a linha da tabela    
    linha.remove();
    // Chamar a função para atualizar o total
    atualizarTotal();
    // Salvar os dados da tabela no localStorage após exclusão ou não...
    salvarDadosTabela();
    // Remover o evento de clique da tabela
    tabela.removeEventListener('click', clickHandler);
};

//-----------------------------------------------------------------


//-----------------------------------------------------------------
// Function atualizarTotal
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


    //salvarDadosTabela();

    //carregarDadosTabela()


};


// Carregar os dados da tabela do localStorage quando a página for carregada
window.addEventListener('load', carregarDadosTabela);
