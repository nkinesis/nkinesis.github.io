var switcher = (function () {
    var currentContext = "none";
    var screens = document.querySelectorAll('.st-screen');
    var btnBack = document.querySelector('.st-header-btn-back');
    var title = document.querySelector('.st-header-title');
    var subtitle = document.querySelector('.st-header-subtitle');
    var dropdownContent = document.querySelector('#dropdownContent');


    btnBack.addEventListener('click', back);

    function init() {
        currentContext = "mainMenu";
        for (let screen of screens) {
            if (screen.id !== "mainMenu") {
                screen.style.display = "none";
            }
        }
    }

    function navigate(screenName) {
        for (let screen of screens) {
            if (screen.id === screenName) {
                screen.style.display = "block";
                currentContext = screenName;
                setDropdownMenu(screenName);
                setCaption(screenName);
                setInit(screenName);
            } else {
                screen.style.display = "none";
            }
        }
    }

    function back() {
        switch (currentContext) {
            case "mainMenu":
                break;
            case "aboutScreen":
                navigate("mainMenu");
                break;
            case "tableScreen":
                navigate("tableMenu");
                break;
            case "tableMenu":
            case "inputScreen":
            case "uploadScreen":
                if (confirm('Deseja voltar ao menu principal? Alterações não salvas serão perdidas.')) {
                    //resetGlobals(true);
                    navigate("mainMenu");
                }
                break;
            default:
                console.log("Tela não existe");
                break;
        }
    }

    function setCaption(screenName) {
        switch (screenName) {
            case "mainMenu":
                title.innerText = "Menu Principal";
                subtitle.innerText = "Statify v1.1";
                break;
            case "aboutScreen":
                title.innerText = "Sobre";
                subtitle.innerText = "Statify v1.1";
                break;
            case "tableScreen":
                title.innerText = "Tabela";
                subtitle.innerText = "";
                break;
            case "tableMenu":
                title.innerText = "Tabela";
                subtitle.innerText = "Selecione o tipo de tabela desejado";
                break;
            case "inputScreen":
                title.innerText = "Entrada";
                subtitle.innerText = "Insira os dados da sua pesquisa";
                break;
            case "uploadScreen":
                title.innerText = "Upload";
                subtitle.innerText = "Selecione um arquivo";
                break;
            default:
                title.innerText = "";
                subtitle.innerText = "";
                break;
        }
    }

    function setInit(screenName) {
        setDropdownMenu(screenName);
        switch (screenName) {
            case "inputScreen":
                inputScreen.init();
                break;
            default:
                break;
        }
    }

    function setDropdownMenu(screenName) {
        switch (screenName) {
            case "inputScreen":
                dropdownContent.className = "st-header-dropdown-opt";
                break;
            default:
                dropdownContent.className = "st-header-dropdown-opt-disabled";
                break;
        }
    }

    return {
        init: init,
        navigate: navigate
    }
})();

var dataset = (function () {
    var debug = true;
    var data = [];
    var classRange = [];
    var testValues = [18, 18, 19, 19, 20, 21, 21, 21, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 29, 29, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 33, 33, 33, 34, 34, 34, 34, 34, 35, 36, 36, 36, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 39, 39, 39, 40, 40, 40, 40, 40, 40, 41, 41, 41, 42, 42, 42, 42, 43, 43, 43, 44, 44, 44, 45, 45, 45, 46, 46, 47, 47, 47, 47, 48, 48, 48, 48, 48, 48, 49, 49, 50, 50, 50, 51, 51, 52, 52, 53, 53, 53, 53, 56, 61, 62, 63, 63];

    function create(overwrite) {
        if (debug) {
            data = testValues;
        } else {
            var fields = document.querySelectorAll('#fieldGroup .st-screen-field');
            if (overwrite) {
                data = [];
            } else if (data.length > 0) {
                return;
            }
            for (var field of fields) {
                if (field.value) {
                    data.push(parseInt(field.value));
                }
            }
            data = data.sort(utils.sortNumber);
            console.log(data);
        }
    }

    function randomize(n) {
        data = [];
        n > 1000 ? n = 1000 : null;
        for (var i = 0; i < n; i++) {
            data.push(Math.floor((Math.random() * 100) + 1));
        }
    }

    function get() {
        return data;
    }

    return {
        get: get,
        create: create,
        randomize: randomize,
        classRange: classRange
    }

})();

var mainMenu = (function () {
    var btnBegin = document.querySelector('#btnBegin');
    var btnAbout = document.querySelector('#btnAbout');

    btnBegin.addEventListener('click', begin);
    btnAbout.addEventListener('click', about);

    function begin() {
        switcher.navigate("inputScreen");
    }

    function about() {
        switcher.navigate("aboutScreen");
    }

})();

var uploadScreen = (function () {
    var fileInput = document.querySelector('#fileInput1')
    fileInput.addEventListener('change', stFiles.readSingleFile);

    function show(){
        switcher.navigate("uploadScreen");
    }
 
    return {
        show:show
    }
 })();

var inputScreen = (function () {
    var fieldGroup = document.querySelector('#fieldGroup');
    var btnOK = document.querySelector('#btnOK');
    var itemClear = document.querySelector('#itemClear');
    var itemLoadCSV = document.querySelector('#itemLoadCSV');

    itemClear.addEventListener('click', removeFields);
    itemLoadCSV.addEventListener('click', uploadScreen.show);
    btnOK.addEventListener('click', processInput)

    function init() {
        fieldGroup.innerHTML = '';
        fieldGroup.appendChild(createField());
    }

    function processInput() {
        var values = document.querySelectorAll('.st-screen-fieldgroup .st-screen-field');
        if (values && values.length > 0) {
            dataset.create();
            let table = dataset.get();
            if (table && table.length > 0) {
                switcher.navigate('tableMenu');
            }
        } else {
            alert("Nenhum valor informado!");
        }
    }

    function createFieldOnKeyPress(e) {
        if (e.keyCode == 13 && e.target && e.target.value) {
            e.target.value = parseFloat(e.target.value.replace(",", "."));
            var field = createField();
            fieldGroup.appendChild(field);
            field.focus();
        }
    }

    function createField() {
        var field = document.createElement("INPUT")
        field.min = "0";
        field.type = "number";
        field.className = "st-screen-field";
        field.addEventListener("keypress", createFieldOnKeyPress);
        return field;
    }

    function removeFields() {
        if (confirm("Tem certeza que deseja limpar os campos?\n" +
            "As alterações não salvas serão perdidas.")) {
            var fields = document.querySelectorAll(".st-screen-fieldgroup .st-screen-field");
            var fl = fields.length;
            for (var i = 0; i < fl; i++) {
                if (i != fl - 1) {
                    fields[i].parentNode.removeChild(fields[i]);
                } else {
                    fields[i].value = "";
                }
                fields[i].select();
            }
            
        }
    }


    return {
        init: init,
        createField:createField
    }

})();

var tableMenu = (function () {
    var mainContent = document.querySelector('#mainContent');
    var btnRaw = document.querySelector('#btnRaw');
    var btnNci = document.querySelector('#btnNci');
    var btnWci = document.querySelector('#btnWci');
    var btnMsr = document.querySelector('#btnMsr');

    btnRaw.addEventListener('click', createRaw);
    btnNci.addEventListener('click', createNcr);
    btnWci.addEventListener('click', createWcr);
    btnMsr.addEventListener('click', createMsr);

    function clearScreen(){
        var elements = mainContent.children;
        for (element of elements) {
            element.parentNode.removeChild(element);
        }
    }

    function createRaw() {
        clearScreen();
        switcher.navigate('tableScreen');
        var table = tableDraw.createRawTable();
        document.querySelector('#mainContent').appendChild(table);
    }

    function createNcr() {
        clearScreen();
        switcher.navigate('tableScreen');
        var table = tableDraw.createNciTable();
        document.querySelector('#mainContent').appendChild(table);
    }

    function createWcr() {
        clearScreen();
        switcher.navigate('tableScreen');
        var table = tableDraw.createWciTable();
        document.querySelector('#mainContent').appendChild(table);
    }

    function createMsr() {
        clearScreen();
        switcher.navigate('tableScreen');
        var table = tableDraw.createMeasuresTable();
        document.querySelector('#mainContent').appendChild(table);
    }

})();

var tableScreen = (function () {
})();

var aboutScreen = (function () {
})();

switcher.init();