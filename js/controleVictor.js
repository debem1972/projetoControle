// Tornando a variável mesAno global
let mesAno;
//Tornando a variável estatus global
let estatus;

// Adicione um evento de input ao campo #data
document.querySelector("#data").addEventListener('input', function () {
    let entradaData = this.value;

    // Remover qualquer caractere que não seja número da entrada do usuário
    let entradaDataNumeros = entradaData.replace(/\D/g, '');

    // Adicionar separadores à entrada de data
    let dataFormatada = entradaDataNumeros.replace(
        /(\d{2})(\d{2})(\d{4})/,
        function (match, dia, mes, ano) {
            return dia + '/' + mes + '/' + ano;
        }
    );

    // Defina o valor do campo data como a data formatada
    this.value = dataFormatada;

    //Extraindo o mes da data   
    let mes = dataFormatada.split('/')[1];
    //Extraindo o ano da data
    let ano = dataFormatada.split('/')[2];
    //Nomeando os meses
    const mesesDoAno = ['', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    //Substituir os numeros dos meses pelos nomes correspondentes
    mes = mesesDoAno[parseInt(mes)];
    //Juntar o mes e o ano para formar a data formatada
    mesAno = `${mes}/${ano}`;

});
//-----------------------------------------------------------------------


//Formatando o campo id #descricao para 1ª letra maiúscula
//Capturando o campo id #descricao
let inputDescript = document.querySelector('#descricao');

// Adicionar ouvinte de evento para capitalizar a primeira letra do campo descrição
inputDescript.addEventListener("input", function () {
    let texto = inputDescript.value;  // Remove os espaços em branco...
    if (texto.length > 0) {
        // Dividir o texto em palavras
        let palavras = texto.split(' ');
        // Capitalizar a primeira letra de cada palavra
        for (let i = 0; i < palavras.length; i++) {
            // Se a palavra não estiver vazia
            if (palavras[i].length > 0) {
                palavras[i] = palavras[i].charAt(0).toUpperCase() + palavras[i].slice(1);
            }
        }
        // Juntar as palavras novamente com espaços entre elas
        inputDescript.value = palavras.join(' ');
    }
});
//-----------------------------------------------------------------------

//Validando e formatando o campo #valor
// Adiciona um event listener para o evento 'input' assim que a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    let entradaValor = document.querySelector("#valor");

    // Adiciona um event listener para o evento 'input'
    entradaValor.addEventListener('input', function () {
        // Obtém o valor digitado pelo usuário
        let valorDigitado = entradaValor.value;

        // Remove caracteres não numéricos do valor digitado
        let valorNumerico = valorDigitado.replace(/\D/g, '');

        // Verifica se o valor é vazio ou zero
        if (valorNumerico === "" || valorNumerico == "0") {
            window.alert("O campo valor é obrigatório e não pode ser igual a zero ou vazio.");
            entradaValor.value = ""; // Limpa o campo de entrada
            //entradaValor.focus(); // Foca no campo de entrada
            return; // Interrompe a execução da função
        };


        // Formata o valor para o formato de moeda (R$xx,xx)
        let valorFormatado = (Number(valorNumerico) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Atualiza o valor no campo input
        entradaValor.value = valorFormatado;
    });
});
//----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Declarar a variável divideParcela fora da função verificarParcelamento()
let divideParcela;

//Inteligência do campo .parcelamento
// Função para verificar e mostrar a div de parcelamento se o usuário optar por parcelar
function verificarParcelamento() {
    //Converte a string valorSelectParc em um numero
    let entradaNumberParc = document.querySelector("#numberParcels");
    let valorSelectParc = entradaNumberParc.value;
    let numeroParcelas = Number(valorSelectParc);
    let parcelaAtual = 1;

    // Obtendo os inputs radio
    let escolhaParcela = document.getElementById('parcelaSim');
    let escolhaNao = document.getElementById('parcelaNao');

    // Obtendo a div de parcelamento
    let divParcelamento = document.querySelector('.parcelamento');

    // Obtendo o valor do campo #valor
    let valorCompra = document.querySelector('#valor').value;

    // Obtendo a tag p id #valorCompraAlert
    let valorCompraAlert = document.getElementById('valorCompraAlert');

    // Exibindo o valor da compra ao clicar em "Não"
    if (escolhaNao.checked) {
        valorCompraAlert.innerHTML = `O valor da compra ficou em ${valorCompra}`;
        divParcelamento.classList.add('parcelamentoNao');
        divParcelamento.classList.remove('parcelamentoSim');
    } else if (escolhaParcela.checked) {
        let entradaValor = document.querySelector("#valor");
        //Convertendo a variavel entradaValor em numero
        let numeroValor = Number(entradaValor.value.replace('R$', '').replace('.', '').replace(',', '.'));
        //console.log(numeroValor);

        //---------------------------------------------------------------------------------------------
        // Formatação do valor do campo #valor
        entradaValor.value = numeroValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        //console.log(entradaValor.value);
        //Declarando um ouvinte ao select Id #numberParcels
        //Obtendo o elemento select
        let selectOption = document.querySelector('#numberParcels');

        //Adiciona um ouvinte de mudança
        selectOption.addEventListener('change', function () {
            //Obtém o valor da opção selecionada
            let opcaoSelecionada = selectOption.value;

            //Validar o campo #numberParcels que esteja vazio...
            if (!opcaoSelecionada) {
                window.alert('Preencha o número de parcelas!');
                document.querySelector("#numberParcels").focus();
                return;
            };

            // Calcula o valor da parcela e formata como moeda brasileira
            divideParcela = numeroValor / opcaoSelecionada;
            let valorFormatadoParc = divideParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


            valorCompraAlert.innerHTML = `O valor da parcela ficou em: ${valorFormatadoParc}`;

        });
    };

    // Simplificando a lógica de exibição da div de parcelamento
    divParcelamento.classList.toggle('parcelamentoSim', escolhaParcela.checked);
    divParcelamento.classList.toggle('parcelamentoNao', escolhaNao.checked);
};

// Adicionando event listeners
document.getElementById('parcelaNao').addEventListener('click', verificarParcelamento);
document.getElementById('parcelaSim').addEventListener('click', verificarParcelamento);



//-----------------------------------------------------------------------

function lancar() {
    let entradaData = document.querySelector("#data").value;
    let tipoDeGasto = document.querySelector("#tipos").value;
    let escolhaParcela = document.getElementById('parcelaSim');
    let entradaNumberParc = document.querySelector("#numberParcels");
    let valorSelectParc = entradaNumberParc.value;
    let entradaValor = document.querySelector("#valor");
    let valorSemFormatacao = entradaValor.value.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
    let escolhaNao = document.getElementById('parcelaNao');
    let parcelaAtual = 1;
    let numeroParcelas = Number(valorSelectParc);
    let dataCompra = new Date(entradaData.split('/').reverse().join('-'));
    let dataSistema = new Date(); // Data atual do sistema
    let total = document.querySelector('#calcTotalCompras');
    //----------------------------------------------------------------

    //Campo input #data
    //Validar o campo data que esteja vazio...
    if (!entradaData) {
        window.alert('Preencha a data!');
        document.querySelector("#data").focus();
        return;
    };


    // Validar o formato da data
    let dataRegex = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if (!dataRegex.test(entradaData)) {
        window.alert('Formato de data inválido. Utilize dd/mm/aaaa ou dd/mm/aa.');
        //Limpa o campo data e mantem o focus()...
        document.querySelector("#data").value = "";
        document.querySelector("#data").focus();
        return;
    };

    //Verificação dos dias corretos dos meses e ano bissexto
    // Separar o dia, mês e ano
    let [dia, mes, ano] = entradaData.split('/').map(Number);

    // Verificar se o mês tem o número correto de dias
    if (mes < 1 || mes > 12) {
        window.alert('Mês inválido. Insira um mês entre 1 e 12.');
        return;
    };

    let ultimoDiaMes = new Date(ano, mes, 0).getDate();

    if (dia > ultimoDiaMes) {
        window.alert(`O mês ${mes} de ${ano} não tem ${dia} dias. Verifique a data.`);
        return;
    };

    // Verificar se fevereiro tem 29 dias em um ano bissexto
    if (mes === 2 && dia === 29) {
        if ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0) {
            // É um ano bissexto
            // Continue normalmente
        } else {
            window.alert(`O ano ${ano} não é bissexto. Fevereiro tem 28 dias.`);
            return;
        };
    };




    //----------------------------------------------------------------------------------------------

    // Verifica se o valor é vazio ou igual a zero
    if (valorSemFormatacao === "" || valorSemFormatacao == "0") {
        window.alert("O campo valor é obrigatório e não pode ser igual a zero ou vazio.");
        entradaValor.focus();
        return; // Adicione um retorno para interromper a execução da função caso o valor seja inválido
    }
    //--------------------------------------------------------------------







    //--------------------------------------------------------------------

    //Campo input #numberParcels
    //Validar o campo #numberParcels que esteja vazio caso a opção de parcelamento seja sim...
    if (escolhaParcela.checked && !valorSelectParc) {
        window.alert('Preencha o número de parcelas!');
        document.querySelector("#numberParcels").focus();
        return;
    };
    //--------------------------------------------------------------------


    // Verificar se o campo descrição está vazio
    let descricao = document.querySelector('#descricao').value.trim();
    if (!descricao) { // Se estiver vazio, retornar
        window.alert('Preencha a descrição!');
        document.querySelector('#descricao').focus();
    };



    //----------------------------------------------------------------
    //Validando o campo #tipos
    if (!tipoDeGasto) {
        window.alert('Preencha o tipo de gasto!');
        document.querySelector("#tipos").focus();
        return;
    }
    //-------------------------------------------------------------------

    //Capturando o valor da variável valorFormatadoParc
    let selectOption = document.querySelector('#numberParcels');
    let opcaoSelecionada = selectOption.value;
    let numeroValor = Number(entradaValor.value.replace('R$', '').replace('.', '').replace(',', '.'));
    divideParcela = numeroValor / opcaoSelecionada;
    let valorFormatadoParc = divideParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    //---------------------------------------------------------------

    //Retorno do campo Parcelas, Valor da Parcela e status da table id #tabela
    if (escolhaNao.checked) {
        valorSelectParc = "1";
        valorFormatadoParc = entradaValor.value;
        estatus = 1 + 'd' + 1;
    };

    //-----------------------------------------------------------------------

    // Verificação se a opção de parcelamento foi selecionada
    if (escolhaParcela.checked) {
        // Converte o valor de valorSelectParc em um número
        valorSelectParc = Number(numeroParcelas);
        // Verifica  em quantas parcelas o usuário escolheu parcelar
        if (valorSelectParc === numeroParcelas) {
            // Obtém a referência da tabela
            let tabela = document.getElementById("tabela");

            // Obtém a linha atual que deseja copiar
            let linhaOriginal = document.getElementById("linhaOriginal");

            // Clona a linha original
            let linhaClonada = linhaOriginal.cloneNode(true);

            // Cria um objeto Date com o mês e ano iniciais
            let dataParcela = new Date(mesAno);

            // Array com os nomes dos meses
            let meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

            // Cria um loop para copiar a linha para cada parcela
            for (let i = 1; i <= numeroParcelas; i++) { // Começa em 1 e vai até numeroParcelas
                // Atualiza a variável estatus
                estatus = `${i}d${numeroParcelas}`;

                // Incrementa o mês da data da parcela
                dataParcela.setMonth(dataParcela.getMonth() + 1);

                // Formata a data da parcela para o formato mês/ano
                mesAno = meses[dataParcela.getMonth()] + '/' + dataParcela.getFullYear();

                // Preenche as células clonadas com os valores dos inputs e resultados
                linhaClonada.querySelector('td:nth-child(1)').innerHTML = entradaData;
                linhaClonada.querySelector('td:nth-child(2)').innerHTML = descricao;
                linhaClonada.querySelector('td:nth-child(3)').innerHTML = entradaValor.value;
                linhaClonada.querySelector('td:nth-child(4)').innerHTML = valorSelectParc;
                linhaClonada.querySelector('td:nth-child(5)').innerHTML = valorFormatadoParc;
                linhaClonada.querySelector('td:nth-child(6)').innerHTML = tipoDeGasto;
                linhaClonada.querySelector('td:nth-child(7)').innerHTML = mesAno; // Atualiza o mês da parcela
                // Atualiza o campo de status para refletir a parcela atual
                linhaClonada.querySelector('td:nth-child(8)').innerHTML = estatus;

                // Remove o estilo "display: none" para tornar a linha visível
                linhaClonada.style.display = '';

                // Obtém a referência do tbody dentro da tabela
                let tbody = tabela.querySelector('tbody');

                // Insere a linha clonada de volta no tbody, no final da tabela
                tbody.appendChild(linhaClonada);

                // Clona a linha original novamente para a próxima iteração
                linhaClonada = linhaOriginal.cloneNode(true);
            };

            // Remove a última linha
            tabela.deleteRow(-1);




        } else {
            // Se não, mantenha a variável estatus como está (não altere)
            // Se houver algum valor anterior, você pode querer limpá-lo
            estatus = ""; // ou qualquer valor padrão que faça sentido para o seu programa
        };
    };


    //----------------------------------------------------------------------------


    // Obter a referência da tabela
    let tabela = document.getElementById("tabela");

    // Inserir uma nova linha na tabela
    let linha = tabela.insertRow();

    // Criar células na linha   
    let celula1 = linha.insertCell();
    let celula2 = linha.insertCell();
    let celula3 = linha.insertCell();
    let celula4 = linha.insertCell();
    let celula5 = linha.insertCell();
    let celula6 = linha.insertCell();
    let celula7 = linha.insertCell();
    let celula8 = linha.insertCell();


    // Preencher as células com os valores dos inputs e do resultado
    celula1.innerHTML = entradaData;
    celula2.innerHTML = descricao;
    celula3.innerHTML = entradaValor.value;
    celula4.innerHTML = valorSelectParc;
    celula5.innerHTML = valorFormatadoParc;
    celula6.innerHTML = tipoDeGasto;
    celula7.innerHTML = mesAno;
    celula8.innerHTML = estatus;
    //---------------------------------------------------------------------
    //console.log(valorFormatadoParc);
    //Chama a function somaComprasTotal() para somar os valores das parcelas e exibir no campo #calcTotalCompras
    somaComprasTotal();

    //-------------------------------------------------------------------------



    //Limpa todos os campos de entrada dos dados e mantem o foco no campo #entradaData
    document.querySelector("#data").value = "";
    document.querySelector("#data").focus();
    document.querySelector("#descricao").value = "";
    document.querySelector("#tipos").value = "";
    document.querySelector("#valor").value = "";
    document.querySelector("#parcelaSim").checked = false;
    document.querySelector("#parcelaNao").checked = false;
    document.querySelector("#numberParcels").value = "";
    //Limpa o campo #valorCompraAlert
    document.getElementById('valorCompraAlert').innerHTML = "";
    //Remove a classe .parcelamentoSim para a div de parcelamento
    document.querySelector('.parcelamento').classList.remove('parcelamentoSim');
    //Aplica a classe .parcelamentoNao para a div de parcelamento
    document.querySelector('.parcelamento').classList.add('parcelamentoNao');
    //--------------------------------------------------------------------------------

    atualizarTotal();

    salvarDadosTabela();

};
//--------------------------------------------------------------------
// Function para salvar os dados da tabela no localStorage
function salvarDadosTabela() {
    let tabela = document.getElementById("tabela");
    localStorage.setItem('dadosTabela', JSON.stringify(tabela.innerHTML));
};

// Carregar dados da tabela do localStorage, se disponíveis
/*let dadosSalvos = localStorage.getItem('dadosTabela');
if (dadosSalvos) {
    tabela.innerHTML = JSON.parse(dadosSalvos);
};*/




//-------------------------------------------------------------------

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


    salvarDadosTabela();

    carregarDadosTabela()

};


//------------------------------------------------------------------
// Função para carregar os dados da tabela do localStorage, se disponíveis
function carregarDadosTabela() {
    let tabela = document.getElementById("tabela");
    let dadosSalvos = localStorage.getItem('dadosTabela');
    if (dadosSalvos) {
        tabela.innerHTML = JSON.parse(dadosSalvos);
    };
};

// Chama a função para carregar os dados da tabela do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    carregarDadosTabela();
});



