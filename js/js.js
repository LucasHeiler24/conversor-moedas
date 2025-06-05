window.onload = function () {
    //Faço uma consulta de uma API pública
    fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL')
        .then(resposta => {
            if (!resposta.ok)
                throw new Error(`Erro ao pegar a API ${resposta.status}`);
            return resposta.json();
        })
        .then(dados => {
            //Inicializo a variável do select
            let valorMoeda = -1;

            //Convertendo um objeto para um array
            let dadosArray = Object.keys(dados).map(chave => dados[chave]);

            //Criei um objeto aonde formata os números com os valores do Brasil
            const formataNum = new Intl.NumberFormat('pt-BR', {
                style: "currency",
                currency: "BRL"
            });

            //Adicionei o evento ochange que pega o value do option no select
            document.querySelector('select').onchange = function () {
                valorMoeda = dadosArray[this.value].bid;
            }

            //Adiciono um ouvinte no meu botão converter
            document.getElementById('inConverter').addEventListener('click', () => {
                //Pego o valor informado pelo usuário
                let valorInformado = document.getElementById('inValor').value;

                //Verefico se o valor for válido
                if (valorMoeda == -1 || valorInformado == "" || valorInformado <= 0) return;

                //Faço o cálculo de conversão
                document.getElementById('inMostrar').value = formataNum.format(valorInformado * valorMoeda);

                //Limpo o input do valor ao calcular
                document.getElementById('inValor').value = "";
            });
        })
        .catch(erro => console.log(erro));
}