function cotacaoMoeda() {
    var divCotacaoUSD = document.querySelector('.divCotacaoUSD');
    var divCotacaoBTC = document.querySelector('.divCotacaoBTC');
    var divCotacaoEUR = document.querySelector('.divCotacaoEUR');
    var tipoMoeda = document.querySelector('#filtroMoeda').value;

    const options = {
        method: 'GET'
    }

    fetch(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`, options)
    .then(response => { response.json() 
        .then(data => {
            var dolar = data.USDBRL;
            var bitcoin = data.BTCBRL;
            var euro = data.EURBRL;

            var valorAtualDolar = formatarMoeda(parseFloat(dolar.ask).toFixed(2));
            var valorAtualBitcoin = bitcoin.ask;
            var valorAtualEuro = formatarMoeda(parseFloat(euro.ask).toFixed(2));

            if ((bitcoin.ask).length >= 7) {
                valorAtualBitcoin = `${valorAtualBitcoin}.00`;
                valorAltoBitcoin = `${bitcoin.high}.00`
            }

            // Filtrar por moeda
            if (tipoMoeda == 1) {
                divCotacaoBTC.innerHTML = '';
                divCotacaoEUR.innerHTML = '';
                divCotacaoUSD.innerHTML =    `<div class="divCotacaoUSD">
                                                    <div> <i class="mdi mdi-currency-usd"></i>
                                                        ${dolar.code} - ${(dolar.name).slice(0, 5)} 
                                                    </div>
                                                        <div> Atual: R$ ${valorAtualDolar} </div>
                                                        <div class="mt-3">
                                                            <i class="mdi mdi-arrow-up-thick"></i> Alta: ${dolar.high}
                                                            <i class="mdi mdi-arrow-down-thick"></i> Baixa: ${dolar.low} 
                                                        <div>
                                                    </div>
                                                </div>`;
            } else if (tipoMoeda == 2) {
                divCotacaoUSD.innerHTML = '';
                divCotacaoEUR.innerHTML = '';
                divCotacaoBTC.innerHTML = `     <div class="divCotacaoBTC">
                                                    <div> <i class="mdi mdi-bitcoin"></i>
                                                        ${bitcoin.code} - ${(bitcoin.name).slice(0, 7)} 
                                                    </div>
                                                        <div> Atual: R$ ${valorAtualBitcoin} </div>
                                                        <div class="mt-3">
                                                            <i class="mdi mdi-arrow-up-thick"></i> Alta: ${bitcoin.high}
                                                            <i class="mdi mdi-arrow-down-thick"></i> Baixa: ${bitcoin.low} 
                                                        <div>
                                                    </div>
                                                </div>`;
            } else if (tipoMoeda == 3) {
                divCotacaoUSD.innerHTML = '';
                divCotacaoBTC.innerHTML = '';
                divCotacaoEUR.innerHTML = `     <div class="divCotacaoEUR">
                                                    <div> <i class="mdi mdi-currency-eur"></i>
                                                            ${euro.code} - ${(euro.name).slice(0, 4)} 
                                                    </div>
                                                        <div> Atual: R$ ${valorAtualEuro} </div>
                                                        <div class="mt-3">
                                                            <i class="mdi mdi-arrow-up-thick"></i> Alta: ${euro.high}
                                                            <i class="mdi mdi-arrow-down-thick"></i> Baixa: ${euro.low} 
                                                        <div>
                                                    </div>
                                                </div>`;
                                                
            } else if (tipoMoeda == 0) {
                divCotacaoUSD.innerHTML =    `<div class="divCotacaoUSD">
                                                <div> <i class="mdi mdi-currency-usd"></i>
                                                    ${dolar.code} - ${(dolar.name).slice(0, 5)} 
                                                </div>
                                                    <div> Atual: R$ ${valorAtualDolar} </div>
                                                    <div class="mt-3">
                                                        <i class="mdi mdi-arrow-up-thick"></i> Alta: ${dolar.high}
                                                        <i class="mdi mdi-arrow-down-thick"></i> Baixa: ${dolar.low} 
                                                    <div>
                                                </div>
                                            </div>`;

                divCotacaoBTC.innerHTML = `  <hr>
                                            <div class="divCotacaoBTC">
                                                <div> <i class="mdi mdi-bitcoin"></i>
                                                    ${bitcoin.code} - ${(bitcoin.name).slice(0, 7)} 
                                                </div>
                                                    <div> Atual: R$ ${valorAtualBitcoin} </div>
                                                    <div class="mt-3">
                                                        <i class="mdi mdi-arrow-up-thick"></i> Alta: ${bitcoin.high}
                                                        <i class="mdi mdi-arrow-down-thick"></i> Baixa: ${bitcoin.low} 
                                                    <div>
                                                </div>
                                            </div>`;

                divCotacaoEUR.innerHTML = ` <hr>
                                            <div class="divCotacaoEUR">
                                                <div> <i class="mdi mdi-currency-eur"></i>
                                                        ${euro.code} - ${(euro.name).slice(0, 4)} 
                                                </div>
                                                    <div> Atual: R$ ${valorAtualEuro} </div>
                                                    <div class="mt-3">
                                                        <i class="mdi mdi-arrow-up-thick"></i> Alta: ${euro.high}
                                                        <i class="mdi mdi-arrow-down-thick"></i> Baixa: ${euro.low} 
                                                    <div>
                                                </div>
                                            </div>`;
            }

        })
    })
    .catch(error => console.log(error))
}

cotacaoMoeda()

function formatarReal( int ) {
    var valor = int+'';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");
    if( valor.length > 6 )
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return valor;
}

function formatarMoeda(valor) {

    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    var total = valor;
    if(valor == 'NaN') total = '';

    return total;
}
