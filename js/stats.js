
var utils = (function () {
    function getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = "0" + dd
        }

        if (mm < 10) {
            mm = "0" + mm
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    function seekField(e) {
        var ipts = document.querySelectorAll("input");
        var next = false;
        for (var ipt of ipts) {
            if (next) {
                debugger;
                ipt.focus();
                next = false;
                break;
            } else if (ipt == e.target) {
                next = true;
            }
        }
        if (next) {
            document.querySelector("button").focus();
        }
    }

    function enterDefault(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            utils.seekField(e);
        }
    }

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
    
    return {
        getDate: getDate,
        seekField: seekField,
        enterDefault: enterDefault,
        sortNumber:sortNumber,
        countInArray:countInArray
    }
})();

var measures = (function() {
    function sturges() {
        var result = Math.floor(1 + 3.3 * (Math.log(dataset.values.length) / Math.log(10)));
        //maximum 10 classes
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

    return {
        avg:avg,
        mode:mode,
        median:median,
        sturges:sturges,
        quartile:quartile,
        percentile:percentile
    }
})();

var tableStats = (function () {
    function Category(min, max){
        this.min = min;
        this.max = max;
        this.values = [];
    }
    
    function createCategories(qtyCateg, categMin, classAmp){
        var newCateg;
        var listCateg = [];
        var auxCategMin = categMin;
        for (i = 0; i <= qtyCateg; i++) {
            newCateg = new Category(Math.ceil(auxCategMin), Math.ceil(auxCategMin + classAmp));
            listCateg.push(newCateg);
            auxCategMin += classAmp;
        }
        return listCateg;
    }
    
    function populateCategories(listValues, listCateg){
        for (var value of listValues) {
            for (var categ of listCateg) {
                if (value >= categ.min && value < categ.max) {
                    categ.values.push(value);
                }
            }    
        }
    }
    
    function calculateXi(qtyCateg, listCateg){
        var listXi = [];
        for (var categ of listCateg) {
            var result = (categ.min + categ.max) / 2;
            if (result) {
                listXi.push(result);
            }
        }
        return listXi;
    }
    
    function calculate_fi(listCateg) {
        var _fi = [];
        var _fiSum = 0;
        for (var categ of listCateg) {
            _fi.push(categ.values.length);
            _fiSum += categ.values.length;
        }
        return {
            result: _fi,
            sum: _fiSum
        }
    }
    
    function calculate_fri(list_fi, total_fi) {
       
        var _fri = [];
        var _friSum = 0;
        var aux = 0;
        for (var value of list_fi) {
            var result = total_fi > 0 ? (value / total_fi) : 0;
            aux = parseFloat(result.toFixed(2));
            _fri.push(aux);
            _friSum += aux;
        }
        return {
            result: _fri,
            sum: _friSum
        }
    }
    
    function calculateFi(list_fi) {
        var fi = [];
        var fl = 0;
        for (var value of list_fi) {
            fl = fi.length;
            if (fl == 0) {
                fi.push(value);
            } else {
                fi.push(fi[fl-1] + value);
            }
        }
        return fi;
    }
    
    function calculateFri(listFi, total_fi) {
        var fri = [];
        var aux = 0;
        for (var value of listFi) {
            aux = value / total_fi;
            fri.push(aux.toFixed(2));
        }
        return fri;
    }
    
    function calculate_fci(list_fi) {
        var aux = 0;
        var fci = [];
        var fl = list_fi.length;
        for (i = 0; i < fl; i++) {
            if (i - 1 < 0) {
                aux = (0 + (2 * list_fi[i]) + list_fi[i + 1]) / 4;
            } else if (i + 1 > fl - 1) {
                aux = (list_fi[i - 1] + (2 * list_fi[i]) + 0) / 4;
            } else {
                aux = (list_fi[i - 1] + (2 * list_fi[i]) + list_fi[i + 1]) / 4;
            }
            fci.push(aux.toFixed(2));
        }
        return fci;
    }

    return {
        createCategories:createCategories,
        populateCategories:populateCategories,
        calculateXi:calculateXi,
        calculate_fi:calculate_fi,
        calculate_fri:calculate_fri,
        calculateFi:calculateFi,
        calculateFri:calculateFri,
        calculate_fci:calculate_fci

    }
})();

var tableDraw = (function () {
   
    function drawHeader(type) {
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
        return table;
    }

    function createRawTable() {
        var table = [];
        dataset.create();
        table.push(drawHeader(1));
        for (var value of dataset.get()) {
            table.push('<tr>' + '<td>' + value + '</td>' + '</tr>');
        }
        return table.join('');
    }
    
    function createNciTable() {
        var go = true;
        //TODO: recreate only if necessary
        dataset.create();
        var table = [];
        table.push(drawHeader(2))
        var values = dataset.get();
        var dvl = values.length;
        for (var i = 0; i < dvl; i++) {
            var tal = utils.countInArray(values, values[i]);
            var crt = '<tr>' + '<td>' + values[i] + '</td>' +
                '<td>' + tal + '</td>' + '</tr>'
            var nxt = '<tr>' + '<td>' + values[i + 1] + '</td>' +
                '<td>' + tal + '</td>' + '</tr>'
    
            if (go == true) {
                table.push('<tr>' + '<td class="fi1">' + values[i] + '</td>' +
                    '<td>' + tal + '</td>' + '</tr>');
            } else {
                console.log('Keep going!');
            }
    
            if (crt == nxt) {
                go = false;
            } else {
                go = true;
            }
        }
        return table.join('');
    }

    function createWciTable() {
       //main dataset
       dataset.create();
       listValues = dataset.get();

       //arrays
       var listCateg = [];
       var listXi = [];
       var list_fi = [];
       var total_fi = 0;
       var list_fri = [];
       var total_fri = 0;
       var list_fci = [];
       var listFi = [];
       var listFri = [];
   
       var vl = listValues.length;
       var categMin = (Math.min.apply(Math, listValues)); 
       var categMax = (Math.max.apply(Math, listValues)); 
       var qtyCateg = Math.floor(1 + 3.3 * (Math.log(vl) / Math.log(10)));
       var totalAmp = categMax - categMin; 
       var classAmp = Math.ceil(totalAmp / qtyCateg);

       //create categories
       listCateg = tableStats.createCategories(qtyCateg, categMin, classAmp);
       tableStats.populateCategories(listValues, listCateg);
       var cl = listCateg.length;

       //generate columns
       listXi = tableStats.calculateXi(qtyCateg, listCateg); //xi
       result_fi = tableStats.calculate_fi(listCateg); //fi
       list_fi = result_fi.result;
       total_fi = result_fi.sum; 
       result_fri = tableStats.calculate_fri(list_fi, total_fi); //fri
       list_fri = result_fri.result;
       total_fri = result_fri.sum;
       listFi = tableStats.calculateFi(list_fi); //Fi
       listFri = tableStats.calculateFri(listFi, total_fi); //Fri
       list_fci = tableStats.calculate_fci(list_fi); //fci

       //draw table
       var table = [];
       var auxMd = []; //TODO: use in calculations
       table.push(drawHeader(3));
       for (i = 0; i < cl - 1; i++) {
           table.push('<tr>' + '<td class="textct" style="text-align:center">' + listCateg[i].min + ' |-- ' + listCateg[i].max + '</td>' +
               '<td class="numeric-td fi">' + listCateg[i].values.length + '</td>' +
               '<td class="numeric-td xi">' + listXi[i] + '</td>' +
               '<td class="numeric-td fri">' + list_fri[i] + '</td>' +
               '<td class="numeric-td Fi">' + listFi[i] + '</td>' +
               '<td class="numeric-td Fri">' + listFri[i] + '</td>' +
               '<td class="numeric-td fci">' + list_fci[i] + '</td>' +
               '</tr>');
           var s = [listFi[i], listCateg.length, listCateg[i], listCateg[i + 1]];
           auxMd.push(s);
       }
       return table.join('') + '<tr>' + '<td class="tt1" style="text-align:center">' + 'Total' + '</td>' + '<td class="numeric-td total_fi">' + total_fi + '</td>' + '<td>' + " " + '</td>' + '<td class="numeric-td total_fri">' + total_fri + '</td>' + '<td>' + " " + '</td>' + '<td>' + " " + '</td>' + '<td>' + " " + '</td>' + '</tr>';
    }

    function createMeasuresTable() {
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

    return {
        createRawTable:createRawTable,
        createWciTable:createWciTable,
        createNciTable:createNciTable,
        createMeasuresTable:createMeasuresTable
    }

})();

var stFiles = (function () {
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
        var values = dataset.get();
        var tl = values.length;
        var arq = "";
        for (var i = 0; i < tl; i++) {
            if (arq.length == 0) {
                arq += values[i];
            } else {
                arq += "," + values[i];
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
            switcher.navigate("inputScreen");
            var fields = document.querySelectorAll(".st-screen-fieldgroup .st-screen-field");
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
                            fd = inputScreen.createField();
                            fd.value = parts[j];
                            document.querySelector(".st-screen-fieldgroup").appendChild(fd);
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

    return {
        createCSVFromFields:createCSVFromFields,
        createCSV:createCSV,
        download:download,
        downloadImg:downloadImg,
        savePNG:savePNG,
        saveJPG:saveJPG,
        saveSVG:saveSVG,
        readSingleFile:readSingleFile,
    }
})();    