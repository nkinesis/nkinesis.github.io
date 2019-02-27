var values = [18, 18, 19, 19, 20, 21, 21, 21, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 29, 29, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 33, 33, 33, 34, 34, 34, 34, 34, 35, 36, 36, 36, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 39, 39, 39, 40, 40, 40, 40, 40, 40, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 44, 44, 44, 45, 45, 45, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 48, 48, 49, 49, 50, 50, 50, 51, 51, 52, 52, 53, 53, 53, 53, 56, 61, 62, 63, 63];

//http://www2.fm.usp.br/dim/probabilidade/sturges.php

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

function createClassFrTable(listValues) {
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

    console.log('rangeMin: ' + categMin);
    console.log('rangeMax: ' + categMax);
    console.log('qtyClasses: ' + qtyCateg);
    console.log('totalAmp: ' + totalAmp);
    console.log('classAmp: ' + classAmp);

    //criar categorias
    listCateg = createCategories(qtyCateg, categMin, classAmp);
    populateCategories(listValues, listCateg);
    var cl = listCateg.length;
    console.log(listCateg);

    //xi
    listXi = calculateXi(qtyCateg, listCateg);

    //fi
    calc_fi = calculate_fi(listCateg);
    list_fi = calc_fi.result;
    total_fi = calc_fi.sum;
    console.log(total_fi);
    //fri
    calc_fri = calculate_fri(list_fi, total_fi);
    list_fri = calc_fri.result;
    total_fri = calc_fri.sum;

    //Fi
    listFi = calculateFi(list_fi);

    //Fri
    listFri = calculateFri(listFi, total_fi);

    //fci
    list_fci = calculate_fci(list_fi);

    console.log('listXi: ' + listXi);
    console.log('list_fi: ' + list_fi);
    console.log('list_fri: ' + list_fri);
    console.log('listFi: ' + listFi);
    console.log('listFri: ' + listFri);
    console.log('list_fci: ' + list_fci);

    //TODO: use
    var table = [];
    var auxMd = [];

    table.push(drawHeader(3));
    //debugger;
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

/*
var x = createClassFrTable(values);
document.querySelector('#tb').innerHTML = x;
*/