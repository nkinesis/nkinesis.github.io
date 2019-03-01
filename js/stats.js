
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

    function getDateTime() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();

        if (dd < 10) {
            dd = "0" + dd
        }

        if (mm < 10) {
            mm = "0" + mm
        }

        return yyyy + '-' + mm + '-' + dd + '-' + hh + '' + min + '' + sec;
    }

    function seekField(e) {
        var ipts = document.querySelectorAll("input");
        var next = false;
        for (var ipt of ipts) {
            if (next) {
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
        sortNumber: sortNumber,
        countInArray: countInArray,
        getDateTime:getDateTime
    }
})();

var files = (function () {

    function saveCSV(listValues) {
        if (!listValues || listValues.length == 0) {
            alert("Nenhum dado informado.");
            return;
        } else {
            var arq = "";
            for (var value of listValues) {
                if (arq.length == 0) {
                    arq += value;
                } else {
                    arq += "," + value;
                }
            }
            download("data" + utils.getDateTime() + ".csv", arq);
        }
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

    function savePNG(element) {
        domtoimage.toPng(element)
            .then(function (dataUrl) {
                downloadImg("img" + utils.getDateTime(), dataUrl);
            })
            .catch(function (error) {
                console.error('Erro', error);
            });
    }

    function saveJPG(element) {
        domtoimage.toJpeg(element)
            .then(function (dataUrl) {
                downloadImg("img" + utils.getDateTime(), dataUrl);
            })
            .catch(function (error) {
                console.error('Erro', error);
            });
    }

    function saveSVG(element) {
        domtoimage.toSvg(element)
            .then(function (dataUrl) {
                downloadImg("img" + utils.getDateTime(), dataUrl);
            })
            .catch(function (error) {
                console.error('Erro', error);
            });
    }

    function readSingleFile(event) {

        var listFiles = event.target.files[0];
        if (listFiles) {
            switcher.navigate("inputScreen");
            var fields = document.querySelectorAll(".st-screen-fieldgroup .st-screen-field");
            for (var field of fields) {
                field.parentNode.removeChild(field);
            }
            var fr = new FileReader();
            fr.onload = function (e) {
                var contents = e.target.result;
                var lines = contents.split("\n");
                var parts = [];
                var field = null;
                for (var value of lines) {
                    parts = value.split(",");
                    for (var part of parts) {
                        if (part.trim()) {
                            field = inputScreen.createField();
                            field.value = parseFloat(part);
                            document.querySelector(".st-screen-fieldgroup").appendChild(field);
                        }
                    }
                }
                event.target.files[0] = null;
            }
            fr.readAsText(listFiles);
        } else {
            alert("Erro ao carregar o arquivo.");
        }
    }

    return {
        saveCSV: saveCSV,
        savePNG: savePNG,
        saveJPG: saveJPG,
        saveSVG: saveSVG,
        readSingleFile: readSingleFile,
    }
})();   

var dataset = (function () {
    var demo = false;
    var data = [];
    var classRange = [];
    var testValues = [18, 18, 19, 19, 20, 21, 21, 21, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 29, 29, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 33, 33, 33, 34, 34, 34, 34, 34, 35, 36, 36, 36, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 39, 39, 39, 40, 40, 40, 40, 40, 40, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 44, 44, 44, 45, 45, 45, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 48, 48, 49, 49, 50, 50, 50, 51, 51, 52, 52, 53, 53, 53, 53, 56, 61, 62, 63, 63];

    function create(overwrite) {
        if (demo) {
            data = testValues;
        } else {
            var fields = document.querySelectorAll('#fieldGroup .st-screen-field');
            if (overwrite) {
                clear();
            } else if (data.length > 0) {
                return;
            }
            for (var field of fields) {
                if (field.value) {
                    data.push(parseFloat(field.value));
                }
            }
            data = data.sort(utils.sortNumber);
        }
    }

    function setRandom(n) {
        clear();
        n > 1000 ? n = 1000 : null;
        for (var i = 0; i < n; i++) {
            data.push(Math.floor((Math.random() * 100) + 1));
        }
    }

    function setDemo(value){
        if (value) {
            demo = true;
        } else {
            demo = false;
        }
    }

    function clear(){
        data = [];
        classRange = []; 
    }

    function get() {
        return data;
    }

    return {
        get: get,
        clear:clear,
        create: create,
        setDemo, setDemo,
        setRandom: setRandom,
        classRange: classRange
    }

})();

var measures = (function () {
    function sturges(numValues) {
        if (numValues) {
            var result = Math.floor(1 + 3.3 * (Math.log(numValues) / Math.log(10)));
            //maximum 10 classes
            if (result > 10) {
                result = 10;
            }
            return result;
        }
        return 0;
    }

    function average(listValues) {
        if (listValues) {
            var sum = 0;
            var fl = listValues.length;
            for (var value of listValues) {
                sum += parseFloat(value);
            }
            return fl > 0 ? (sum / fl).toFixed(2) : 0;
        }
        return 0;
    }

    function mode(listValues) {
        var mf = 1;
        var m = 0;
        var item = 0;
        if (listValues) {
            var vl = listValues.length;
            for (var i = 0; i < vl; i++) {
                for (var j = i; j < vl; j++) {
                    if (listValues[i] == listValues[j])
                        m++;
                    if (mf < m) {
                        mf = m;
                        item = listValues[i];
                    }
                }
                m = 0;
            }
            return parseFloat(item).toFixed(2);
        }
        return 0;
    }

    function median(listValues) {
        if (listValues) {
            listValues = listValues.sort(utils.sortNumber);
            var vl = listValues.length;
            var middle = 0;
            if (vl % 2 == 0) { //even
                middle = (vl / 2) - 1;
                var value1 = listValues[middle];
                var value2 = listValues[middle + 1];
                return ((value1 + value2) / 2).toFixed(2);
            } else { //odd
                middle = ((vl + 1) / 2) - 1;
                return listValues[middle].toFixed(2);
            }
        }
        return 0;
    }

    function quartile(q, listValues) {
        if (listValues && [1, 2, 3].indexOf(q) > -1) {
            var n = listValues.length;
            var k = (Math.floor((q * (n + 1)) / 4));
            var ki = k - 1; //used for indexing only
            var result = listValues[ki] + (((q * (n + 1)) / 4) - k) * (listValues[ki + 1] - listValues[ki]);
            return result.toFixed(2);
        }
        return 0;
    }

    function percentile(p, listValues) {
        if (listValues && p >= 1 && p <= 100) {
            var n = listValues.length;
            var result = p * ((n + 1) / 100);
            return result.toFixed(2);
        }
        return 0;
    }

    return {
        mode: mode,
        average: average,
        median: median,
        sturges: sturges,
        quartile: quartile,
        percentile: percentile
    }
})();

var tableStats = (function () {
    function Category(min, max) {
        this.min = min;
        this.max = max;
        this.values = [];
    }

    function createCategories(qtyCateg, categMin, classAmp) {
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

    function populateCategories(listValues, listCateg) {
        for (var value of listValues) {
            for (var categ of listCateg) {
                if (value >= categ.min && value < categ.max) {
                    categ.values.push(value);
                }
            }
        }
    }

    function calculateXi(qtyCateg, listCateg) {
        var list_xi = [];
        for (var categ of listCateg) {
            var result = (categ.min + categ.max) / 2;
            if (result) {
                list_xi.push(result);
            }
        }
        return list_xi;
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
                fi.push(fi[fl - 1] + value);
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
        createCategories: createCategories,
        populateCategories: populateCategories,
        calculateXi: calculateXi,
        calculate_fi: calculate_fi,
        calculate_fri: calculate_fri,
        calculateFi: calculateFi,
        calculateFri: calculateFri,
        calculate_fci: calculate_fci

    }
})();

var tableDraw = (function () {

    function createElement(tagname, params) {
        if (tagname) {
            var elem = document.createElement(tagname);
            params && params.id ? elem.id = params.id : null;
            params && params.classname ? elem.className = params.classname : null;
            params && params.text ? elem.innerText = params.text : null;
            return elem;
        } else {
            return document.createElement('div');
        }
    }

    function createRow(values, align) {
        var td;
        var tr = createElement("tr");
        var alignClass = "st-screen-table-cell";
        if (align == "right") {
            alignClass = "st-screen-table-numcell";
        } else if (align == "center") {
            alignClass = "st-screen-table-titlecell";
        } else if (align == "centerFirst") {
            alignClass = "st-screen-table-titlecell";
        }
        for (var value of values) {
            td = createElement("td", {classname: alignClass, text: value});
            tr.appendChild(td);
            if (align == "centerfirst") {
                alignClass = "st-screen-table-numcell";
            }
        }
        return tr;
    }

    function drawHeader(type, title) {
        var thead = createElement("thead");
        var tr = createElement("tr", {classname: "st-screen-table-header"});
        if (type == 1) {
            tr.appendChild(createElement("th", {classname: "wide", text: "Valores"}));
        } else if (type == 2) {
            tr.appendChild(createElement("th", {classname: "wide", text: "Valores"}));
            tr.appendChild(createElement("th", {classname: "wide",text: "fi"}));
        } else if (type == 3) {
            tr.appendChild(createElement("th", {classname: "wide", text: "Valores"}));
            tr.appendChild(createElement("th", {classname: "narrow",text: "fi"}));
            tr.appendChild(createElement("th", {classname: "narrow",text: "xi"}));
            tr.appendChild(createElement("th", {classname: "narrow",text: "fri"}));
            tr.appendChild(createElement("th", {classname: "narrow",text: "Fi"}));
            tr.appendChild(createElement("th", {classname: "narrow",text: "Fri"}));
            tr.appendChild(createElement("th", {classname: "narrow",text: "fci"}));
        } else if (type == 4) {
            tr.appendChild(createElement("th", {classname: "wide", text: title}));
            tr.appendChild(createElement("th", {classname: "wide", text: "Valor"}));
        } else {
            tr.appendChild(createElement("th", {classname: "wide", text: "Valores"}));
        }
        thead.appendChild(tr);
        return thead;
    }

    function createRawTable() {
        var tbody, tr;
        dataset.create();
        var table = createElement("table", {id: "tbRaw", classname: "table table-striped"});
        table.appendChild(drawHeader(1));
        tbody = createElement("tbody");
        for (var value of dataset.get()) {
            tr = createElement("tr");
            tr.appendChild(createElement("td", {classname: "st-screen-table-numcell", text: value}));
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        return table;
    }

    function createNciTable() {
        dataset.create();
        var newRow = true;
        var table = createElement("table", {id: "tbNci",classname: "table table-striped"});
        var tbody = createElement("tbody");
        table.appendChild(drawHeader(2))
        var values = dataset.get();
        var vl = values.length;
        for (var i = 0; i < vl; i++) {
            var count = utils.countInArray(values, values[i]);
            var currentValue = values[i] + "|" + count;
            var nextValue = values[i + 1] + "|" + count;
            if (newRow == true) {
                tbody.appendChild(createRow([values[i], count], "right"));
            }
            if (currentValue === nextValue) {
                newRow = false;
            } else {
                newRow = true;
            }
        }
        table.appendChild(tbody);
        return table;
    }

    function createWciTable() {
        //main dataset
        dataset.create();
        listValues = dataset.get();

        //arrays
        var listCateg = [];
        var list_xi = [];
        var list_fi = [];
        var total_fi = 0;
        var list_fri = [];
        var total_fri = 0;
        var list_fci = [];
        var listFi = [];
        var listFri = [];

        var numValues = listValues.length;
        var categMin = (Math.min.apply(Math, listValues));
        var categMax = (Math.max.apply(Math, listValues));
        var qtyCateg = measures.sturges(numValues);
        var totalAmp = categMax - categMin;
        var classAmp = qtyCateg ? Math.ceil(totalAmp / qtyCateg) : 0;

        //create categories
        listCateg = tableStats.createCategories(qtyCateg, categMin, classAmp);
        tableStats.populateCategories(listValues, listCateg);
        var cl = listCateg.length;

        //generate columns
        list_xi = tableStats.calculateXi(qtyCateg, listCateg); //xi
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
        var categLabel;
        var tbody = createElement("tbody");
        var table = createElement("table", {id: "tbWci", classname: "table table-striped"});
        table.appendChild(drawHeader(3));
        for (i = 0; i < cl - 1; i++) {
            categLabel = listCateg[i].min + ' |-- ' + listCateg[i].max;
            tbody.appendChild(createRow([categLabel, listCateg[i].values.length, list_xi[i], list_fri[i], listFi[i], listFri[i], list_fci[i]], "centerFirst"));
        }
        tbody.appendChild(createRow(["Total", total_fi, "", total_fri, "", "", ""], "centerFirst"));
        table.appendChild(tbody);
        return table;
    }

    function createMeasuresTable() {
        dataset.create();
        var values = dataset.get();
        var mode = measures.mode(values);
        var measureList = {
            avg: { label: "Média", value: measures.average(values) },
            mod: { label: "Moda", value: mode > 0 ? mode : "Amodal" },
            med: { label: "Mediana", value: measures.median(values) }
        }
        var msrTable = createElement("table", {id: "tbMsr", classname: "table table-striped"});
        msrTable.appendChild(drawHeader(4, "Medida"));

        var measureLine;
        var wrapper = createElement('div');
        var tbody = createElement("tbody");
        for (var value of Object.keys(measureList)) {
            measureLine = measureList[value];
            tr = createElement("tr", { classname: "st-tr-measure" });
            tr.appendChild(createElement("td", { classname: "st-screen-table-titlecell", text: measureLine.label }));
            tr.appendChild(createElement("td", { classname: "st-screen-table-numcell", text: measureLine.value }));
            tbody.appendChild(tr);
        }
        msrTable.appendChild(tbody);
        var qpTable = createQuartPercTable();
        wrapper.appendChild(msrTable);
        wrapper.appendChild(qpTable);
        return wrapper;
    }

    function createQuartPercTable(){
        var listValues = dataset.get();
        var tableQrt = createElement("table", {id: "tbQuart", classname: "table table-striped"});
        tableQrt.appendChild(drawHeader(4, "Quartil"));
        var tbody = createElement("tbody");
        var tr;
        for (i = 1; i < 4; i++) {
            tr = createElement("tr", { classname: "st-tr-measure" });
            tr.appendChild(createElement("td", { classname: "st-screen-table-titlecell", text: i }));
            tr.appendChild(createElement("td", { classname: "st-screen-table-numcell", text: measures.quartile(i, listValues) }));
            tbody.appendChild(tr);
        }
        tableQrt.appendChild(tbody);

        var tablePerc = createElement("table", {id: "tbPerc", classname: "table table-striped"});
        tablePerc.appendChild(drawHeader(4, "Percentil"));
        tbody = createElement("tbody");
        var step = 9;
        for (i = 1; i < 101; i+=step) {
            if (i == 10) {
                step = 10;
            }
            tr = createElement("tr", { classname: "st-tr-measure" });
            tr.appendChild(createElement("td", { classname: "st-screen-table-titlecell", text: i }));
            tr.appendChild(createElement("td", { classname: "st-screen-table-numcell", text: measures.percentile(i, listValues) }));
            tbody.appendChild(tr);
        }
        tablePerc.appendChild(tbody);
        var wrapper = createElement('div');
        wrapper.appendChild(tableQrt);
        wrapper.appendChild(tablePerc);
        return wrapper;
    }

    return {
        createRawTable: createRawTable,
        createWciTable: createWciTable,
        createNciTable: createNciTable,
        createMeasuresTable: createMeasuresTable
    }

})();

 