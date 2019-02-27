/*GLOBAL VARIABLES*/
var b = 0;
var mdclass = [];
var theMd = 0;
var theQt = 0;
var thePc = 0;
var avg;
var context = 0;

var table = [];
var total = [];
var tclass = [];
var freq = [];
var cl1 = [];
var cl2 = [];
var cl3 = [];
var cl4 = [];
var cl5 = [];
var cl6 = [];
var cl7 = [];
var cl8 = [];
var cl9 = [];
var cl10 = [];
var vai = true;
var globalArrays = [cl1, cl2, cl3, cl4, cl5, cl6, cl7, cl8, cl9, cl10];
var fri = [];
var fci = [];
var FFi = [];
var FFri = [];
var sum = 0;
var xi = [];
var thetotal = 0;
var fritotal = 0.0;
var xifi = [];
var auxMd = [];

var ax = xi;
var bx = freq;
var cx = tclass;
var dx = FFi;
var ex = fci;

var currentContext;

/*INITIALIZATION*/
window.onload = function () {
    //document.getElementById('fileinput').addEventListener('change', readSingleFile);
    document.querySelector("#btn-begin").addEventListener("click", function () {
        updateContext("telaPesquisa", "Pesquisa", "Informe o conjunto de dados de sua pesquisa");
        initTelaPesquisa();
    });
    document.querySelector("#btn-about").addEventListener("click", function () {
        updateContext("telaSobre", "Sobre", "Sobre o app");
    });
    document.querySelector("#back").addEventListener("click", function () {
        back();
    });
    document.querySelector("#back").addEventListener("backbutton", function () {
        back();
    });
    document.querySelector('#fileInput1').addEventListener('change', readSingleFile);
    updateContext("menuInicial", "Statify", "Menu principal");
}

function updateDropDownMenu() {
    
    var ddContent = document.querySelector("#dropdownContent").children;
    var add = [];
    var i = 0;
    while (ddContent.length > 0) {
        ddContent[0].parentNode.removeChild(ddContent[0]);
    }

    //Funcionalidades comentadas não funcionam no mobile
    if (currentContext == "telaPesquisa") {
        add.push(getLinkElement("limpaCampos", "Limpar campos", confirmClearFields));
        add.push(getLinkElement("carregaCSV", "Carrega CSV", openUpload));
        //add.push(getLinkElement("salvaCSV", "Salvar como CSV", createCSVFromFields));
    } else if (currentContext == "menuTabelas") {
        //add.push(getLinkElement("salvaCSV", "Salvar como CSV", createCSV));
    } else if (currentContext == "telaTab") {
        //add.push(getLinkElement("salvaCSV", "Salvar como CSV"));
        //add.push(getLinkElement("salvaJPG", "Salvar como JPG", saveJPG));
        //add.push(getLinkElement("salvaPNG", "Salvar como PNG", savePNG));
    }

    var al = add.length;
    for (i = 0; i < al; i++) {
        document.querySelector("#dropdownContent").appendChild(add[i]);
    }

}

function openUpload() {
    updateContext("telaUpload", "Carregar CSV", "Clique no botão 'Carregar' para fazer upload de um arquivo.");
}

function getLinkElement(id, text, f) {
    var al = document.createElement("A");
    al.id = id;
    al.href = "#"
    al.innerText = text;
    if (f) {
        al.addEventListener('click', f);
    }
    return al;
}

function initTelaPesquisa() {
    var fds = document.querySelectorAll('#telaPesquisa .valuecell');
    var fdsl = fds.length;
    for (var i = 0; i < fdsl; i++) {
        fds[i].parentNode.removeChild(fds[i]);
    }
    document.querySelector("#telaPesquisa .cellcontainer").appendChild(createField());
    document.querySelector("#telaPesquisa #btn-aceita-pesquisa").addEventListener('click', function () {
        var valores = document.querySelectorAll("#telaPesquisa .valuecell");
        if (valores && valores.length > 0) {
            createRaw();
            debugger;
            if (table && table.length > 0) {
                updateContext("menuTabelas", "Tabelas", "Escolha o tipo de tabela a ser gerado");
                initMenuTabela();
            }
        } else {
            alert("Nenhum valor informado!");
        }
    });
}

function initMenuTabela() {
    document.querySelector("#menuTabelas #btn-rol").addEventListener('click', function () {
        if (table.length > 1000) {
            alert("Esta tabela pode ser gerada somente para conjuntos de dados menores do que 1000 registros.");
        } else {
            updateContext("telaTab", "Tabela Rol", "Sequência de dados brutos ordenada");
            montaCabecalho(1);
            createRawTable();
        }
    });
    document.querySelector("#menuTabelas #btn-fsi").addEventListener('click', function () {
        if (table.length > 1000) {
            alert("Esta tabela pode ser gerada somente para conjuntos de dados menores do que 1000 registros.");
        } else {
            updateContext("telaTab", "Distribuição de Frequência", "Sem Intervalos de Classe");
            montaCabecalho(2);
            createNoClassFrTable();
        }
    });
    document.querySelector("#menuTabelas #btn-fci").addEventListener('click', function () {
        if (table.length > 300) {
            alert("Esta tabela pode ser gerada somente para conjuntos de dados menores do que 300 registros." +
                "Esta funcionalidade estará disponível futuramente, desculpe-nos pelo inconveniente.");
        } else {
            updateContext("telaTab", "Distribuição de Frequência", "Com Intervalos de Classe");
            montaCabecalho(3);
            createClassFrTable();
        }
    });
}

function montaCabecalho(type) {
    var table = '<tr id="tbhead" style="text-align:center;font-weight:bold;">' +
        '<th width="300px">Valores</th>';
    if (type == 2) {
        table += '<th width="120px">fi</th>';
    } else if (type == 3) {
        table += '<th width="120px">fi</th>' +
            '<th id ="xi" width="120px">xi</th>' +
            '<th id ="fri" width="120px">fri</th>' +
            '<th id ="FFi" width="120px">Fi</th>' +
            ' <th id ="FFri" width="120px">Fri</th>' +
            '<th id ="FFri" width="120px">fci</th>';
    }
    table += '</tr>';
    document.querySelector("#table").innerHTML = table;
}

function back() {
    switch (currentContext) {
        case "menuInicial":
            break;
        case "telaPesquisa":
            if (confirm('Deseja voltar ao menu principal? Alterações não salvas serão perdidas.')) {
                resetGlobals(true);
                updateContext("menuInicial", "Statify", "Menu principal");
            }
            break;
        case "menuTabelas":
            if (confirm('Deseja voltar ao menu principal? Alterações não salvas serão perdidas.')) {
                resetGlobals(true);
                updateContext("menuInicial", "Statify", "Menu principal");
            }
            break;
        case "telaTab":
            updateContext("menuTabelas", "Tabelas", "Escolha o tipo de tabela a ser gerado");
            break;
        case "telaSobre":
            updateContext("menuInicial", "Statify", "Menu principal");
            break;
        case "telaUpload":
            if (confirm('Deseja voltar ao menu principal? Alterações não salvas serão perdidas.')) {
                resetGlobals(true);
                updateContext("menuInicial", "Statify", "Menu principal");
            }
            break;
        default:
            console.log("Tela não existe");
            break;
    }
}

/*COMPONENT FUNCTIONS*/
function confirmClearFields() {
    if (confirm("Tem certeza que deseja limpar os campos?\n" +
            "As alterações não salvas serão perdidas.")) {
        clearFields();
    }
}

function clearFields() {
    var fields = document.querySelectorAll(".cellcontainer .sfield");
    var fcl = fields.length;
    for (var i = 0; i < fcl; i++) {
        if (i != fcl - 1) {
            fields[i].parentNode.removeChild(fields[i]);
            fields[i].select();
        } else {
            fields[i].value = "";
        }
    }
}

function createField() {
    var field = document.createElement("INPUT")
    field.type = "number";
    field.className = "sfield cell valuecell";
    field.setAttribute("onKeyPress", "newField(event)");
    return field;
}

function validateField(value) {
    var num = value.replace(",", ".");
    try {
        var r = parseFloat(num);
        if (isNaN(r)) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        return false;
    }
}

function newField(e) {
    debugger;
    if (e.keyCode == 13 && e.target && e.target.value) {
        e.target.value = parseFloat(e.target.value.replace(",", "."));
        var field = createField();
        document.querySelector("#" + currentContext + " .cellcontainer").appendChild(field);
        field.focus();
    }
}

function updateContext(name, title, desc) {
    currentContext = name;
    var screens = document.querySelectorAll(".screen");
    var sl = screens.length;
    for (var i = 0; i < sl; i++) {
        screens[i].style.display = "none";
    }
    switch (name) {
        case "menuInicial":
            document.querySelector("#menuInicial").style.display = "block";
            break;
        case "telaPesquisa":
            document.querySelector("#telaPesquisa").style.display = "block";
            break;
        case "menuTabelas":
            document.querySelector("#menuTabelas").style.display = "block";
            break;
        case "telaTab":
            document.querySelector("#telaTab").style.display = "block";
            break;
        case "telaSobre":
            document.querySelector("#telaSobre").style.display = "block";
            break;
        case "telaUpload":
            document.querySelector("#telaUpload").style.display = "block";
            break;
        default:
            break;
    }
    updateCaptions(title, desc);
    updateDropDownMenu();
}

function updateCaptions(title, desc) {
    if (title) {
        document.querySelector(".menutitle").innerText = title;
    }
    document.querySelector(".menudescription").innerText = desc;
}

/*GENERAL FUNCTIONS*/
function sortNumber(a, b) {
    return a - b;
}

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

/*TABLE FUNCTIONS*/
function totalFrequency() {

    for (i = 0; i < (tclass.length - 1); i++) {
        freq.push(globalArrays[i].length);
    }

    for (i = 0; i < (tclass.length - 1); i++) {
        sum += globalArrays[i].length;
    }
}

function relativeFrequency() {
    for (i = 0; i < freq.length; i++) {
        var a = (freq[i]) / sum;
        fri.push(a.toFixed(2));
    }
}

function accFrequency() {
    var a = freq[0];

    for (i = 1; i <= freq.length; i++) {
        FFi.push(a);
        a += freq[i];
    }
    console.log('FFi ' + FFi);

}

function relAccFrequency() {
    for (i = 0; i < freq.length; i++) {
        var a = (FFi[i]) / sum;
        FFri.push(a.toFixed(2));
    }

    console.log('FFri' + FFri);

}

function calculatedFrequency() {
    var a = 0;
    for (i = 0; i < freq.length; i++) {
        if (i - 1 < 0) {
            a = (0 + (2 * freq[i]) + freq[i + 1]) / 4;
        } else if (i + 1 > freq.length - 1) {
            a = (freq[i - 1] + (2 * freq[i]) + 0) / 4;
        } else {
            a = (freq[i - 1] + (2 * freq[i]) + freq[i + 1]) / 4;
        }
        fci.push(a.toFixed(2));
    }
    console.log('fci ' + fci);

}

function sumFFi() {
    var sum = 0;
    for (i = 0; i < FFi.length; i++) {
        sum += FFi[i];
    }
    return sum;
}

/*MATH FUNCTIONS*/
function sturges() {
    var result = Math.floor(1 + 3.3 * (Math.log(table.length) / Math.log(10)));

    //nunca haverão mais de 10 classes
    console.log(result);
    if (result > 10) {
        result = 10;
    }

    return result;
}

function avg() {

    //multiplica
    for (i = 0; i < freq.length; i++) {
        var a = freq[i] * xi[i];
        xifi.push(a);
    }

    //soma
    for (i = 0; i < freq.length; i++) {
        b += xifi[i];
    }
    var c = b / thetotal;

    return c;
}

function mode() {
    var a = Math.max.apply(null, freq);
    var b = freq.indexOf(a);
    var md = xi[b];

    return md;
}

function median() {
    var basePosition = '';
    var currentFreq = 0;
    var lastAccFreq = 0;
    var li = 0;
    var hi = 0;
    var locateClass = 0;
    var mn1 = thetotal / 2;

    for (i = 0; i < FFi.length; i++) {
        var a = FFi[i] - mn1;

        if (a >= 0) {
            locateClass = FFi[i];

            for (i = 0; i < auxMd.length; i++) {
                var p = auxMd[i].indexOf(locateClass);

                if (p != -1) {
                    basePosition = p;

                    if (i != 0) {
                        lastAccFreq = auxMd[i - 1][p];
                    }
                    currentFreq = auxMd[i][p + 1];
                    li = auxMd[i][p + 2];
                    hi = auxMd[i][p + 3];
                    break;
                } else {
                    continue;
                }
            }
            break;
        } else {
            continue;
        }
    }

    theMd = (li + (((thetotal / 2) - lastAccFreq) * 4) / currentFreq);
    console.log('MEDIANA: ' + li + " / " +
        'sumfi/2 ' + (sumFFi() / 2) + " / " +
        'lastAccFreq ' + lastAccFreq + " / " +
        'hi ' + hi + " / " +
        'currentFreq ' + currentFreq + " / ");
}

function quartile(n) {
    var basePosition = '';
    var currentFreq = 0;
    var lastAccFreq = 0;
    var li = 0;
    var hi = 0;
    var locateClass = 0;
    var qt1 = (n * thetotal) / 4;

    for (i = 0; i < FFi.length; i++) {
        var a = FFi[i] - qt1;

        if (a >= 0) {
            locateClass = FFi[i];

            for (i = 0; i < auxMd.length; i++) {
                var p = auxMd[i].indexOf(locateClass);

                if (p != -1) {
                    basePosition = p;


                    if (i != 0) {

                        if (i != 0) {
                            lastAccFreq = auxMd[i - 1][p];
                        } else {
                            lastAccFreq = 0;
                        }

                    }

                    currentFreq = auxMd[i][1];
                    li = auxMd[i][2];
                    hi = (auxMd[i][3]) - (auxMd[i][2]);
                    break;
                } else {
                    continue;
                }
            }
            break;
        } else {
            continue;
        }
    }
    theQt = li + (((qt1 - lastAccFreq) * hi) / currentFreq);
    console.log('QUARTIL: ' + 'li ' + li + " / " +
        'sumfreq/4 ' + qt1 + " / " +
        'lastAccFreq ' + lastAccFreq + " / " +
        'hi ' + hi + " / " +
        'currentFreq ' + currentFreq + " / ");
    alert("O quartil " + n + " é igual a " + theQt.toFixed(2));
}

function percentile(n) {
    var basePosition = '';
    var currentFreq = 0;
    var lastAccFreq = 0;
    var li = 0;
    var hi = 0;
    var locateClass = 0;
    var pc1 = (n * thetotal) / 100;

    for (i = 0; i < FFi.length; i++) {
        var a = FFi[i] - pc1;

        if (a >= 0) {
            console.log('a ' + a);
            locateClass = FFi[i];

            for (i = 0; i <= auxMd.length; i++) {
                var p = auxMd[i].indexOf(locateClass);
                console.log('locateClass ' + locateClass);
                console.log('auxMd ' + auxMd[i]);

                if (p != -1) {
                    basePosition = p;
                    console.log('basePosition ' + basePosition);

                    if (i != 0) {

                        if (i != 0) {
                            lastAccFreq = auxMd[i - 1][p];
                        } else {
                            lastAccFreq = 0;
                        }

                    }

                    currentFreq = auxMd[i][1];
                    li = auxMd[i][2];
                    hi = (auxMd[i][3]) - (auxMd[i][2]);
                    break;
                } else {
                    continue;
                }
            }
            break;
        } else {
            continue;
        }
    }
    thePc = li + (((pc1 - lastAccFreq) * hi) / currentFreq);
    console.log('PERCENTIL: ' + 'li ' + li + " / " +
        'sumfreq/100 ' + pc1 + " / " +
        'lastAccFreq ' + lastAccFreq + " / " +
        'hi ' + hi + " / " +
        'currentFreq ' + currentFreq + " / ");
    alert("O percentil " + n + " é igual a " + thePc.toFixed(2));
}

/*DRAWING FUNCTIONS*/
function createRaw() {
    var fds = document.querySelectorAll('#telaPesquisa .valuecell');
    var fdsl = fds.length;
    for (var i = 0; i < fdsl; i++) {
        if (fds[i].value) {
            table.push(parseInt(fds[i].value));
        }
    }
    table = table.sort(utils.sortNumber);
}

function createRawTable() {
    var linhaHTML = [];
    for (var i = 0; i < table.length; i++) {
        linhaHTML.push('<tr>' + '<td>' + table[i] + '</td>' + '</tr>');
    }
    document.querySelector('#' + currentContext).querySelector('#table').innerHTML += linhaHTML.join('');
}

function createClassFrTable() {
    resetGlobals(false);
    var totalmin = (Math.min.apply(Math, table)); //limite inferior da primeira classe
    var totalmax = (Math.max.apply(Math, table)); //limite superior da última classe

    var numclass = Math.floor(1 + 3.3 * (Math.log(table.length) / Math.log(10))); //número de classes
    var totalamp = totalmax - totalmin; //amplitude total
    var ampclass = Math.ceil(totalamp / numclass); //amplitude das classes

    console.log('numclass ' + numclass);
    console.log('ampclass' + ampclass);
    console.log('totalamp ' + totalamp);
    console.log('tablelength' + table.length);
    console.log('totalmin ' + totalmin);
    console.log('totalmax ' + totalmax);

    var tptotalmin = totalmin;

    for (i = 0; i <= numclass; i++) {
        tclass.push(Math.ceil(tptotalmin));
        tptotalmin += ampclass;
    }

    console.log('tclass ' + tclass);

    for (i = 0; i < 10; i++) {
        var r = (tclass[i] + tclass[i + 1]) / 2;

        if (!isNaN(r) && r != 'undefined') {
            xi.push(r);
        }
    }


    for (i = 0; i <= table.length; i++) {
        if ((table[i] >= tclass[0]) && (table[i] < tclass[1])) {
            cl1.push(table[i]);

        } else if ((table[i] >= tclass[1]) && (table[i] < tclass[2])) {
            cl2.push(table[i]);

        } else if ((table[i] >= tclass[2]) && (table[i] < tclass[3])) {
            cl3.push(table[i]);

        } else if ((table[i] >= tclass[3]) && (table[i] < tclass[4])) {
            cl4.push(table[i]);

        } else if ((table[i] >= tclass[4]) && (table[i] < tclass[5])) {
            cl5.push(table[i]);

        } else if ((table[i] >= tclass[5]) && (table[i] < tclass[6])) {
            cl6.push(table[i]);

        } else if ((table[i] >= tclass[6]) && (table[i] < tclass[7])) {
            cl7.push(table[i]);

        } else if ((table[i] >= tclass[7]) && (table[i] < tclass[8])) {
            cl8.push(table[i]);

        } else if ((table[i] >= tclass[8]) && (table[i] < tclass[9])) {
            cl9.push(table[i]);

        } else if ((table[i] >= tclass[9]) && (table[i] < tclass[10])) {
            cl10.push(table[i]);

        }
    }

    totalFrequency();
    relativeFrequency();
    accFrequency();
    relAccFrequency();
    calculatedFrequency();
    drawClassTable();
    //calcs();
    //prepareChartArrays();

}

function calcs() {
    var colorClass = "x";
    if (freq.length == 0) {
        alert('É necessário inserir dados e criar uma tabela antes de gerar os cálculos!');
    } else {
        median();
        var av = avg();

        document.getElementById('mpos').innerHTML += '<button class="btn ' + colorClass + ' pos" type="button" style="margin: 0 5px 0 10px;" onclick="alert(\'A moda é ' + mode() + '\');">' + 'Moda ' + '<span class="badge">' + mode() + '</span></button>' +
            '<button class="btn ' + colorClass + ' pos" type="button" style="margin: 0 5px 0 10px;" onclick="alert(\'A média aritmética é ' + av.toFixed(2) + '\');">' + 'Média ' + '<span class="badge">' + av.toFixed(2) + '</span></button>' +
            '<button class="btn ' + colorClass + ' pos" type="button" style="margin: 0 5px 0 10px;" onclick="alert(\'A mediana é ' + theMd.toFixed(2) + '\');">' + 'Mediana ' + '<span class="badge">' + theMd.toFixed(2) + '</span></button>'


        document.querySelector('#' + currentContext.id + ' #mpos').style.display = 'block';
    }
}

function createNoClassFrTable() {
    createRaw();
    var linhaHTML = [];

    for (var i = 0; i < table.length; i++) {

        var tal = countInArray(table, table[i]);
        var crt = '<tr>' + '<td>' + table[i] + '</td>' +
            '<td>' + tal + '</td>' + '</tr>'
        var nxt = '<tr>' + '<td>' + table[i + 1] + '</td>' +
            '<td>' + tal + '</td>' + '</tr>'

        if (vai == true) {
            linhaHTML.push('<tr>' + '<td class="fi1">' + table[i] + '</td>' +
                '<td>' + tal + '</td>' + '</tr>');
        } else {
            console.log('Keep going!');
        }

        if (crt == nxt) {
            vai = false;
        } else {
            vai = true;
        }
    }
    document.querySelector("#" + currentContext + ' #table').innerHTML += linhaHTML.join('');
}

function drawClassTable() {
    var linhaHTML = [];

    for (i = 0; i < (tclass.length - 1); i++) {
        linhaHTML.push('<tr>' + '<td class="textct" style="text-align:center">' + tclass[i] + ' |-- ' + tclass[i + 1] + '</td>' +
            '<td class="numeric-td fi1">' + globalArrays[i].length + '</td>' +
            '<td class="numeric-td xi1">' + xi[i] + '</td>' +
            '<td class="numeric-td fri1">' + fri[i] + '</td>' +
            '<td class="numeric-td FFi1">' + FFi[i] + '</td>' +
            '<td class="numeric-td FFri1">' + FFri[i] + '</td>' +
            '<td class="numeric-td fci">' + fci[i] + '</td>' +
            '</tr>');

        var s = [FFi[i], globalArrays[i].length, tclass[i], tclass[i + 1]];
        auxMd.push(s);
    }

    for (i = 0; i < (tclass.length - 1); i++) {
        var a = fri[i];
        fritotal += parseFloat(a);
    }

    for (i = 0; i < (tclass.length); i++) {
        thetotal += globalArrays[i].length;
    }

    document.querySelector("#" + currentContext + ' #table').innerHTML += linhaHTML.join('') + '<tr>' + '<td class="tt1" style="text-align:center">' + 'Total' + '</td>' + '<td class="numeric-td ttt1">' + thetotal + '</td>' + '<td>' + " " + '</td>' + '<td class="numeric-td ttt1">' + fritotal.toFixed(2) + '</td>' + '<td>' + " " + '</td>' + '<td>' + " " + '</td>' + '<td>' + " " + '</td>' + '</tr>';
}

/*FILE FUNCTIONS*/
function createCSVFromFields() {
    var temptable = [];
    var fields = document.querySelectorAll(".cellcontainer .sfield");
    var fcl = fields.length;
    for (var i = 0; i < fcl; i++) {
        if (fields[i] && fields[i].value !== "") {
            temptable.push(fields[i].value)
        }
    }

    if (temptable.length == 0) {
        alert("Nenhum dado informado.");
        return;
    }

    var tl = temptable.length;
    var arq = "";
    for (var i = 0; i < tl; i++) {
        if (arq.length == 0) {
            arq += temptable[i];
        } else {
            arq += "," + temptable[i];
        }
    }
    download("dados.csv", arq);
}

function createCSV() {
    var tl = table.length;
    var arq = "";
    for (var i = 0; i < tl; i++) {
        if (arq.length == 0) {
            arq += table[i];
        } else {
            arq += "," + table[i];
        }
    }
    download("dados.csv", arq);
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadImg(filename, base64) {
    var element = document.createElement('a');
    element.setAttribute('href', base64);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function savePNG() {
    domtoimage.toPng(document.querySelector("#telaTab"))
        .then(function (dataUrl) {
            downloadImg("imagem", dataUrl);
        })
        .catch(function (error) {
            console.error('Erro', error);
        });
}

function saveJPG() {
    domtoimage.toJpeg(document.querySelector("#telaTab"))
        .then(function (dataUrl) {
            downloadImg("imagem", dataUrl);
        })
        .catch(function (error) {
            console.error('Erro', error);
        });
}

function saveSVG() {
    domtoimage.toSvg(document.querySelector("#telaTab"))
        .then(function (dataUrl) {
            downloadImg("imagem", dataUrl);
        })
        .catch(function (error) {
            console.error('Erro', error);
        });
}

function readSingleFile(evt) {
    var f = evt.target.files[0];
    if (f) {
        updateContext("telaPesquisa", "Pesquisa", "Informe o conjunto de dados de sua pesquisa");
        initTelaPesquisa();

        var fields = document.querySelectorAll(".cellcontainer .sfield");
        var fcl = fields.length;
        for (var i = 0; i < fcl; i++) {
            fields[i].parentNode.removeChild(fields[i]);
        }

        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            var lines = contents.split("\n");
            var output = [];
            var parts = [];
            var fd = null;
            for (var i = 0; i < lines.length; i++) {
                parts = lines[i].split(",");
                for (var j = 0; j < parts.length; j++) {
                    if (parts[j].trim()) {
                        debugger;
                        fd = createField();
                        fd.value = parts[j];
                        document.querySelector("#cc1").appendChild(fd);
                    }
                }
            }
            evt.target.files[0] = null;
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}

function testRandom(n) {
    table = [];
    for (var i = 0; i < n; i++) {
        table.push(Math.floor((Math.random() * 100) + 1));
    }
}

function resetGlobals(resetTable) {
    if (resetTable) {
        table = [];
    }

    b = 0;
    mdclass = [];
    theMd = 0;
    theQt = 0;
    thePc = 0;
    avg;
    context = 0;
    total = [];
    tclass = [];
    freq = [];
    cl1 = [];
    cl2 = [];
    cl3 = [];
    cl4 = [];
    cl5 = [];
    cl6 = [];
    cl7 = [];
    cl8 = [];
    cl9 = [];
    cl10 = [];
    vai = true;
    globalArrays = [cl1, cl2, cl3, cl4, cl5, cl6, cl7, cl8, cl9, cl10];
    fri = [];
    fci = [];
    FFi = [];
    FFri = [];
    sum = 0;
    xi = [];
    thetotal = 0;
    fritotal = 0.0;
    xifi = [];
    auxMd = [];

    ax = xi;
    bx = freq;
    cx = tclass;
    dx = FFi;
    ex = fci;
}

/*testRandom(20);
var t = document.querySelector("#table");
getImageFromElement(t);*/