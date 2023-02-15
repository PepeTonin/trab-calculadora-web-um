// obtendo os elementos do document

// display -- tela onde serão printandas as entradas e o resultado da operação
const display = document.getElementById('display');
// numeros -- todos os botões contendo numeros 0 a 9
const numeros = document.querySelectorAll('.numero');
// operadores -- todos os botões contendo operadores + - x ÷ potencia porcentagem raiz
const operadores = document.querySelectorAll('.operador');
// backspacce -- botao para apagar ultimo elemento da string
const apagarUltimo = document.getElementById('apagarUltimo')
// igual -- botao de igual, usado para calcular o resultado
const igual = document.getElementById('igual');
// clear -- botao usado para limpar o display
const clear = document.getElementById('clear');


// flag para avaliar o que está sendo mostrado no display - se é resultado ou apenas números
var resultadoDisplay = false;

// adiciona o event listener em todos os elementos da node list de numeros
for (let i = 0; i < numeros.length; i++) {
    numeros[i].addEventListener("click", (e) => {

        // armazenando o que está sendo mostrado no display em uma variável e
        // capturando o último caractere para verificar se é operador
        let stringAtual = display.innerHTML;
        let ultimoChar = stringAtual[stringAtual.length - 1];

        // se o resultado ainda não está sendo mostrado, só vai concatenando
        if (resultadoDisplay === false) {

            // apenas continua concatenando se o último char não for ponto, ou for ponto e o pressionado não
            if ((ultimoChar != ".") || (ultimoChar === "." && e.target.innerHTML != ".")) {
                display.innerHTML += e.target.innerHTML;
            }

            // se o resultado está sendo mostrado e um operador é pressionado
            // continue concatenando na string para a próxima operação
        } else if (resultadoDisplay === true && (ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "×" || ultimoChar === "÷" || ultimoChar === "%" || ultimoChar === "^")) {
            resultadoDisplay = false;
            display.innerHTML += e.target.innerHTML;

            // se o resultado está sendo mostrado e um número é pressionado
            // o display é limpo e uma nova operação começa do zero
        } else {
            resultadoDisplay = false;
            display.innerHTML = "";
            display.innerHTML += e.target.innerHTML;
        }
    });
}

// adiciona o event listener em todos os elementos da node list de operadores
for (var i = 0; i < operadores.length; i++) {
    operadores[i].addEventListener("click", (e) => {

        // armazenando o que está sendo mostrado no display em uma variável e
        // capturando o último caractere para verificar se é operador
        let stringAtual = display.innerHTML;
        let ultimoChar = stringAtual[stringAtual.length - 1];

        // se o último char da string for um operador, substitui pelo pressionado
        if (ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "×" || ultimoChar === "÷" || ultimoChar === "%" || ultimoChar === "^") {

            // tratamento para pegar o operador e transformar a entrada de potencia no sinal "^"
            let result = e.target.innerHTML;
            if (result === "num<sup>x</sup>") {
                result = "^";
            }

            let novaString = stringAtual.substring(0, stringAtual.length - 1) + result;
            display.innerHTML = novaString;

            // se a primeira coisa digitada for um operador, não faz nada
        } else if (stringAtual.length == 0) {

            alert("Digite um número primeiro");

            // senão, apenas concatena o operador pressionado no display
        } else {

            // tratamento para pegar o operador e transformar a entrada de potencia no sinal "^"
            let result = e.target.innerHTML;
            if (result === "num<sup>x</sup>") {
                result = "^";
            }

            display.innerHTML += result;
        }
    });
}

// adiciona event listener no botao "igual"
igual.addEventListener("click", () => {

    // variavel que armazena a string mostrada no display
    let stringDisplay = display.innerHTML;

    // variavel tipo array que armazena os numeros da string do display
    let stringNumeros = stringDisplay.split(/\+|\-|\×|\÷|\%|\^/g);

    // variavel tipo array que armazena os operadores da string do display
    // primeiro é trocado todos os numeros e pontos por espaço vazio e depois usa o método split
    let stringOperadores = stringDisplay.replace(/[0-9]|\./g, "").split("");

    // agora os arrays serão rodados, realizando as operações desejadas, uma de cada vez
    // primeiro potencia, depois porcentagem, depois divisão, depois multiplicação, depois subtração e por fim adição
    // enquanto os arrays são rodados, eles serão alterados carregando o resultado da operação
    // o elemento final será o resultado da operação

    let potencia = stringOperadores.indexOf("^");
    while (potencia != -1) {
        stringNumeros.splice(potencia, 2, stringNumeros[potencia] ** stringNumeros[potencia + 1]);
        stringOperadores.splice(potencia, 1);
        potencia = stringOperadores.indexOf("^");
    }

    let porcentagem = stringOperadores.indexOf("%");
    while (porcentagem != -1) {
        stringNumeros.splice(porcentagem, 1, (stringNumeros[porcentagem] / 100));
        stringOperadores.splice(porcentagem, 1);
        porcentagem = stringOperadores.indexOf("%");
    }

    let divisao = stringOperadores.indexOf("÷");
    while (divisao != -1) {
        stringNumeros.splice(divisao, 2, stringNumeros[divisao] / stringNumeros[divisao + 1]);
        stringOperadores.splice(divisao, 1);
        divisao = stringOperadores.indexOf("÷");
    }

    let multiplicacao = stringOperadores.indexOf("×");
    while (multiplicacao != -1) {
        stringNumeros.splice(multiplicacao, 2, stringNumeros[multiplicacao] * stringNumeros[multiplicacao + 1]);
        stringOperadores.splice(multiplicacao, 1);
        multiplicacao = stringOperadores.indexOf("×");
    }

    let subtracao = stringOperadores.indexOf("-");
    while (subtracao != -1) {
        stringNumeros.splice(subtracao, 2, stringNumeros[subtracao] - stringNumeros[subtracao + 1]);
        stringOperadores.splice(subtracao, 1);
        subtracao = stringOperadores.indexOf("-");
    }

    let soma = stringOperadores.indexOf("+");
    while (soma != -1) {
        // usa-se a função parseFloat para que os elementos não sejam concatenados
        stringNumeros.splice(soma, 2, parseFloat(stringNumeros[soma]) + parseFloat(stringNumeros[soma + 1]));
        stringOperadores.splice(soma, 1);
        soma = stringOperadores.indexOf("+");
    }

    // mostra o resultado
    display.innerHTML = stringNumeros[0];

    // altera o estado da flag
    resultadoDisplay = true;
});

// dar clear no display
clear.addEventListener("click", () => {
    display.innerHTML = "";
});

// apagar último elemento, char, do display
apagarUltimo.addEventListener("click", () => {
    let stringAtual = display.innerHTML;
    stringAtual = stringAtual.slice(0, stringAtual.length - 1);
    display.innerHTML = stringAtual;
});