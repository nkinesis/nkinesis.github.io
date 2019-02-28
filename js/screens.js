var switcher = (function () {
    var currentContext = "none";
    var screens = document.querySelectorAll('.st-screen');
    var btnBack = document.querySelector('.st-header-btn-back');
    var title = document.querySelector('.st-header-title');
    var subtitle = document.querySelector('.st-header-subtitle');
    var itemClear = document.querySelector('#itemClear');
    var itemLoadCSV = document.querySelector('#itemLoadCSV');
    var itemDownloadCSV = document.querySelector('#itemDownloadCSV');
    var itemDownloadJPG = document.querySelector('#itemDownloadJPG');
    var itemDownloadPNG = document.querySelector('#itemDownloadPNG');

    btnBack.addEventListener('click', back);

    function init() {
        currentContext = "mainMenu";
        for (let screen of screens) {
            if (screen.id == "mainMenu") {
                screen.className = "st-screen";
            }
        }
    }

    function navigate(screenName) {
        for (let screen of screens) {
            if (screen.id === screenName) {
                screen.className = "st-screen";
                currentContext = screenName;
                setDropdownMenu(screenName);
                updateCaptions(screenName);
                setInit(screenName);
            } else {
                screen.className = "st-screen hidden";
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
                    dataset.setDemo(false); //back to input mode
                    dataset.clear(); //clear dataset
                    uploadScreen.clear(); //unload files
                    navigate("mainMenu");
                }
                break;
            default:
                console.log("Tela não existe");
                break;
        }
    }

    function setSubtitle(text){
        subtitle.innerText = text;
    }

    function updateCaptions(screenName) {
        switch (screenName) {
            case "mainMenu":
                title.innerText = "Menu Principal";
                setSubtitle("Statify v1.1");
                break;
            case "aboutScreen":
                title.innerText = "Sobre";
                setSubtitle("Statify v1.1");
                break;
            case "tableScreen":
                title.innerText = "Tabela";
                break;
            case "tableMenu":
                title.innerText = "Tabela";
                setSubtitle("Selecione o tipo de tabela desejado");
                break;
            case "inputScreen":
                title.innerText = "Entrada";
                setSubtitle("Insira os dados da sua pesquisa");
                break;
            case "uploadScreen":
                title.innerText = "Upload";
                setSubtitle("Selecione um arquivo CSV");
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

    function setItemVisible(visible, menuItem){
        if (menuItem) {
            if (visible){
                menuItem.className = "st-header-dropdown-opt-item";
            } else {
                menuItem.className = "st-header-dropdown-opt-item hidden";
            }
        }
    }

    function setDropdownMenu(screenName) {
        switch (screenName) {
            case "mainMenu":
                btnBack.className = 'st-header-btn-back hidden';
                break;
            case "inputScreen":
                setItemVisible(true, itemClear);
                setItemVisible(true, itemLoadCSV);
                setItemVisible(false, itemDownloadPNG);
                setItemVisible(false, itemDownloadJPG);
                setItemVisible(false, itemDownloadCSV);
                btnBack.className = 'st-header-btn-back';
                break;
            case "tableScreen":
                setItemVisible(false, itemClear);
                setItemVisible(false, itemLoadCSV);
                setItemVisible(true, itemDownloadPNG);
                setItemVisible(true, itemDownloadJPG);
                setItemVisible(true, itemDownloadCSV);
                btnBack.className = 'st-header-btn-back';
                break;
            default:
                setItemVisible(false, itemClear);
                setItemVisible(false, itemLoadCSV);
                setItemVisible(false, itemDownloadPNG);
                setItemVisible(false, itemDownloadJPG);
                setItemVisible(false, itemDownloadCSV);
                btnBack.className = 'st-header-btn-back';
                break;
        }
    }

    return {
        init: init,
        navigate: navigate,
        setSubtitle:setSubtitle,
        itemClear:itemClear,
        itemLoadCSV:itemLoadCSV,
        itemDownloadCSV:itemDownloadCSV,
        itemDownloadPNG:itemDownloadPNG,
        itemDownloadJPG:itemDownloadJPG
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

var mainMenu = (function () {
    var btnBegin = document.querySelector('#btnBegin');
    var btnDemo = document.querySelector('#btnDemo');
    var btnAbout = document.querySelector('#btnAbout');

    btnBegin.addEventListener('click', begin);
    btnAbout.addEventListener('click', about);
    btnDemo.addEventListener('click', demo);

    function begin() {
        switcher.navigate("inputScreen");
    }

    function about() {
        switcher.navigate("aboutScreen");
    }

    function demo() {
        dataset.setDemo(true);
        switcher.navigate("tableMenu");
    }

})();

var uploadScreen = (function () {
    var fileInput = document.querySelector('#fileInput1');
    fileInput.addEventListener('change', files.readSingleFile);

    function clear(){
        fileInput.value = "";
    }

    function show(){
        switcher.navigate("uploadScreen");
    }
 
    return {
        show:show,
        clear:clear
    }
 })();

var inputScreen = (function () {
    var fieldGroup = document.querySelector('#fieldGroup');
    var btnOK = document.querySelector('#btnOK');
    switcher.itemClear.addEventListener('click', removeFields);
    switcher.itemLoadCSV.addEventListener('click', uploadScreen.show);
    btnOK.addEventListener('click', processInput)

    function init() {
        fieldGroup.innerHTML = '';
        fieldGroup.appendChild(createField());
    }

    function processInput() {
        var values = document.querySelectorAll('.st-screen-fieldgroup .st-screen-field');
        if (values && values.length >= 5) {
            dataset.create();
            let table = dataset.get();
            if (table && table.length > 0) {
                switcher.navigate('tableMenu');
            }
        } else {
            alert("Informe no mínimo 5 valores!");
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
        switcher.setSubtitle("Tabela Rol");
    }

    function createNcr() {
        clearScreen();
        switcher.navigate('tableScreen');
        var table = tableDraw.createNciTable();
        document.querySelector('#mainContent').appendChild(table);
        switcher.setSubtitle("Tabela de Distribuição de Frequência sem Intervalos de Classe");
    }

    function createWcr() {
        clearScreen();
        switcher.navigate('tableScreen');
        var table = tableDraw.createWciTable();
        document.querySelector('#mainContent').appendChild(table);
        switcher.setSubtitle("Tabela de Distribuição de Frequência com Intervalos de Classe");
    }

    function createMsr() {
        clearScreen();
        switcher.navigate('tableScreen');
        var table = tableDraw.createMeasuresTable();
        document.querySelector('#mainContent').appendChild(table);
        switcher.setSubtitle("Medidas de Posição, Quartis e Percentis");
    }

})();

var tableScreen = (function () {
    var mainContent = document.querySelector('#tableScreen #mainContent');
    switcher.itemDownloadCSV.addEventListener('click', downloadCSV);
    switcher.itemDownloadPNG.addEventListener('click', itemDownloadPNG);
    switcher.itemDownloadJPG.addEventListener('click', itemDownloadJPG);

    function downloadCSV(){
        files.saveCSV(dataset.get());
    }

    function itemDownloadPNG(){
        files.savePNG(mainContent);
    }

    function itemDownloadJPG(){
        files.saveJPG(mainContent);
    }

})();

var aboutScreen = (function () {
})();

switcher.init();