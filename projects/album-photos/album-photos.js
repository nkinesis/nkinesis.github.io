if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

var fotosCache = [];
var imgClicado = [];
var clicadoFilho;
var tempImage1;
var novoSrc;
var lastSrc = "";
var timer;
var fotoI;

var ant1;
var prox1;
var prox2;

var paiIndex;
var figuresTodos;
var clicadoPai;
var figureAtual;

/*Variáveis de teste, remover  depois*/
var teste;

function troca_visao(visivel, invisivel) {
	document.getElementById(visivel).style.display = 'block';
	document.getElementById(invisivel).style.display = 'none';
}

function busca(o, e) {
	var kc = e.keyCode ? e.keyCode : e.which;
	if (kc==13 && o.value.length>2) {
		window.location = './?busca=' + o.value;
	}
}

function busca_ano(o) {
	if (o.value!='') {
		window.location = './?ano=' + o.value;
	}
}

function foto(caminho) {
	
}

/*
	EXIBIR PAINEL
		função chamada no evento onclick da imagem no álbum (o evento na verdade está em um elemento <a>, filho de uma tag <figure> onde a imagem se encontra. É a função que inicia o carregamento da imagem, e após este ter sido concluído, exibe o painel (#fundo-foto).
*/
function exibirPainel(elemento) {
    document.getElementById("fundo").innerHTML =
            "<div id='fundo-foto'>" +
            "<div class='buttons'>" +
            "<a id='btn-fb' class='btn' href='#'>" +
            "<i class='fa fa-facebook fa-lg' style='margin-right:.5em'></i>" +
            "<span style='padding-left: 5px;border-left:1px solid white'>Compartilhar</span></a>" +
            "<a id='btn-like' class='btn' href='#'>" +
            "<img src='img/gostei.png' style='padding:0;display: inline-block;margin: -7px 1px;width: 92px;'> </a>" +
            "</div>" +
            "<div id='btn-prev' class='ico fa-stack fa-lg inv' onclick='anteriorFoto();' >" +
            "<i class='fa fa-circle fa-stack-2x fa-inverse' style='color:RGBA(255,255,255,.5)'></i>" +
            "<i class='fa fa-location-arrow fa-stack-1x ' style='transform:rotate(-135deg);color:RGBA(255,255,255,.9);'>" + "</i></div>" +
            "<div id='btn-next' class='ico fa-stack fa-lg inv' onclick='proximaFoto();' >" +
            "<i class='fa fa-circle fa-stack-2x fa-inverse' style='color:RGBA(255,255,255,.5)'></i>" +
            "<i class='fa fa-location-arrow fa-stack-1x ' style='transform:rotate(45deg);color:RGBA(255,255,255,.9);'>" + "</i></div>" +
            "<div id='fechar' class='close fa-stack fa-lg inv' onclick='esconderPainel()'> <p id='fechar-texto'>Fechar</p>" +
            "<i class='fa fa-circle fa-stack-1x fa-inverse' style='color:RGBA(255,255,255,.5)'></i>" +
            "<i class='fa fa-times-circle fa-stack-1x ' style='color:RGBA(255,255,255,.9)'></i> </div>" +
            "<div id='carregando' style='display:block;'></div>" +
            "</div>";
    var alturaBody = $(body).height();
    $('#fundo').css("height", alturaBody);
    carregarImagem(elemento);
    $('#fundo').show();
}
function esconderPainel(e) {
    $("#fundo").click(function (e) {
        if (e.target === e.currentTarget) {
            $('#fundo').hide();
            removeListener('#fechar', 'click', function a() {
                $('#fundo').hide();
            });
            removeListener('body', 'keyup', verificaTecla);
        }
    });

}
function proximaFoto() {
    clicadoPai = $(clicadoPai).next();
    if (!$(clicadoPai).is('figure')) {
        clicadoPai = $(figuresTodos).first();
    }
    for (i = 0; i <= figuresTodos.length; i++) {
        if (figuresTodos[i] === clicadoPai[0]) {
            figureAtual = $('figure').get(i);
            fotosCache[0] = $('figure').get(i - 1); //anterior
            fotosCache[1] = $('figure').get(i); //atual
            fotosCache[2] = $('figure').get(i + 1); //proxima +1
            fotosCache[3] = $('figure').get(i + 2); //proxima +2
            break;
        }
    }
    var proximaf = $(figureAtual);
    if (proximaf.length != 0) {
        figureAtual = proximaf[0];
        var c = figureAtual.querySelector("img").src;
        var p = c.replace('/p/', '/g/');
        fotoI = new Image();
        fotoI.src = p;
        lastSrc = p;
        if (fotoI.complete) {
            $('#foto1').attr("src", p);
            mostraFoto(lastSrc);
        } else {
            mostraCarregando();
        }
    }
    imagemCache();
}
function anteriorFoto() {
    clicadoPai = $(clicadoPai).prev();
    if (!$(clicadoPai).is('figure')) {
        clicadoPai = $(figuresTodos).last();
    }
    for (i = 0; i <= figuresTodos.length; i++) {
        if (figuresTodos[i] === clicadoPai[0]) {
            figureAtual = $('figure').get(i);
            fotosCache[0] = $('figure').get(i - 1); //anterior
            fotosCache[1] = $('figure').get(i); //atual
            fotosCache[2] = $('figure').get(i + 1); //proxima +1
            fotosCache[3] = $('figure').get(i + 2); //proxima +2
        }
    }
    if ($(figureAtual).prev() != "undefined") {
        var anteriorf = $(figureAtual);
        if ($(anteriorf).is('figure')) {
            figureAtual = anteriorf[0];
            var c = figureAtual.querySelector("img").src;
            var p = c.replace('/p/', '/g/');
            fotoI = new Image();
            fotoI.src = p;
            lastSrc = p;
            if (fotoI.complete) {
                $('#foto1').attr("src", p);
                mostraFoto(lastSrc);
            } else {
                mostraCarregando();
            }
        }
    }
    imagemCache();
}
function carregarImagem(elementClicked) {
    clicadoFilho = $(elementClicked).children('img');
    clicadoPai = $(elementClicked).parent();
    figuresTodos = $('figure').get();
    for (i = 0; i <= figuresTodos.length; i++) {
        if (figuresTodos[i] === clicadoPai[0]) {
            figureAtual = $('figure').get(i);
            fotosCache[0] = $('figure').get(i - 1);
            fotosCache[1] = figureAtual;
            fotosCache[2] = $('figure').get(i + 1);
            fotosCache[3] = $('figure').get(i + 2);
        }
    }
    $('#carregando').css("display", "block");
    var imgClicado = clicadoFilho;
    if (imgClicado) {
        var c = $(imgClicado).attr("src");
        novoSrc = c.replace('/p/', '/g/');
        fotoI = new Image();
        fotoI.src = novoSrc;
        lastSrc = novoSrc;
        if (fotoI.complete) {
            $('#fundo-foto').append("<img id='foto1' src='" + novoSrc + "' >");
            if (!document.querySelector(".btn-bottom")) {
                criaBtnInferior();
            }
            mostraFoto(novoSrc);
        } else {
            mostraCarregando();
        }
    }
}
function alinhar(pai, filho, elemento, orientacao) {
    var mrg = ((pai - filho) / 2);
    if (orientacao === "v") {
        $(elemento).css('marginTop', mrg);
        $(elemento).css('marginBottom', mrg);
    } else if (orientacao === "h") {
        $(elemento).css('marginRight', mrg);
        $(elemento).css('marginLeft', mrg);
    }
}
function alinhaElementos() {
    var elmFundo = document.getElementById('fundo-foto');
    var elmFoto = document.getElementById('foto1');
    var elmFlechaE = document.getElementById('btn-prev');
    var elmFlechaD = document.getElementById('btn-next');
    var elmBtnInferior = document.querySelector('.btn-bottom');
    var t3 = document.getElementById('loading');
    //bloqueio
    var paiH = $('#fundo-foto').parent().width();
    var filhoH = $('#fundo-foto').width();
    alinhar(paiH, filhoH, elmFundo, 'h');
    var paiV = $(window).height();
    var filhoV = $('#fundo-foto').height();
    alinhar(paiV, filhoV, elmFundo, 'v');
    //botoes inferior (download e enviar)
    var a = $(elmFoto).width();
    var b = $(elmBtnInferior).width();
    alinhar(a, b, elmBtnInferior, 'h');
    //flechas navegacao
    var iconeH = $(elmFlechaE).parent().height();
    var iconeV = $(elmFlechaE).height();
    alinhar(iconeH, iconeV, elmFlechaE, 'v');
    alinhar(iconeH, iconeV, elmFlechaD, 'v');
    //icone carregamento
    var t1 = $('#fundo-foto').width();
    var t2 = $('#loading').width();
    var b1 = $('#fundo-foto').height();
    var b2 = $('#loading').height();
    alinhar(t1, t2, t3, "h");
    alinhar(b1, b2, t3, "v");
}
function carregaImg() {
    console.log("Carregando...");
    if (fotoI.complete) {
        $('#fundo-foto').append("<img id='foto1' src='" + lastSrc + "' >");
        if (!document.querySelector(".btn-bottom")) {
            criaBtnInferior();
        }
        $('#loading').remove();
        mostraFoto(lastSrc);
        clearInterval(timer);
    }
}
function dimensionaFoto(src) {
    $('#fundo').show();
    var wh = $(window).height();
    var tImg = document.createElement("IMG");
    tImg = fotoI;
    //pega dimensões da imagem (tamanho "real")
    var photoH = tImg.naturalHeight;
    var photoW = tImg.naturalWidth;
    $('#fundo-foto').css('width', photoW);
    $('#fundo-foto').css('height', photoH);
    if (photoW > 0 && photoH > 0) {
        //ajusta largura/altura da caixa e da imagem de forma proporcional
        var adjustWidth = ((photoW * ($('#fundo-foto').height())) / photoH);
        var adjustHeight = ((photoH * ($('#fundo-foto').width())) / photoW);
        $('#fundo-foto').css('width', adjustWidth);
        $('#fundo-foto').css('height', adjustHeight);
    }
}
function imagemCache() {
    if ($(fotosCache[0]).is('figure')) {
        var cache0 = new Image();
        var cacheSrc0 = $(fotosCache[0]).children().children().get(0).src;
        cache0.src = cacheSrc0.replace('/p/', '/g/');
    }
    if ($(fotosCache[1]).is('figure')) {
        var cache3 = new Image();
        var cacheSrc3 = $(fotosCache[1]).children().children().get(0).src;
        cache3.src = cacheSrc3.replace('/p/', '/g/');
    }
    if ($(fotosCache[2]).is('figure')) {
        var cache1 = new Image();
        var cacheSrc1 = $(fotosCache[2]).children().children().get(0).src;
        cache1.src = cacheSrc1.replace('/p/', '/g/');
    }
    if ($(fotosCache[3]).is('figure')) {
        var cache2 = new Image();
        var cacheSrc2 = $(fotosCache[3]).children().children().get(0).src;
        cache2.src = cacheSrc2.replace('/p/', '/g/');
    }
}
function verificaTecla(e) {
    if (e) {
        switch (e.which) {
            case 27: // escape
                $('#fundo').hide();
                removeListener('body', 'keyup', verificaTecla);
                break;
            case 37: // left
                anteriorFoto();
                break;
            case 39: // right
                proximaFoto();
                break;
            default:
                return;
        }
    }
}
function adicionaListener(element, event, func) {
    var a = document.querySelector(element);
    a.addEventListener(event, func);
}
function removeListener(element, event, func) {
    var a = document.querySelector(element);
    a.removeEventListener(event, func);
}
function navegacaoTeclado() {
    $('.inv').css('display', 'block');
    adicionaListener('body', 'keyup', verificaTecla);
    adicionaListener('#fechar', 'click', function a() {
        $('#fundo').hide();
    });
    $('#fundo-foto').css('background', 'rgba(255,255,255, 0)');
}
function bloqueiaNavegacao() {
    removeListener('body', 'keyup', verificaTecla);
    removeListener('#fechar', 'click', function a() {
        $('#fundo').hide();
    });
    $('#fundo-foto').css('background', 'rgba(255,255,255,.5)');
}
function resize() {
    if ($('#fundo-foto') && $('#fundo-foto').is(':visible')) {
        dimensionaFoto(lastSrc);
        alinhaElementos();
    }
}
function download() {
    var s = document.querySelector('#foto1').src;
    var d = s.replace('/g/', '/d/');
    var link = document.createElement("A");
    link.href = d;
    link.click();
}
function mostraCarregando() {
    var w = 0, h = 0;
    if (document.querySelector('#foto1')) {
        w = $('#foto1').width();
        h = $('#foto1').height();
        $('#foto1').remove();
    }
    document.querySelector('#foto1') ? $('#foto1').remove() : null;
    document.querySelector('.btn-bottom') ? $('.btn-bottom').remove() : null;
    $('#fundo-foto').append("<div id='loading'><i class='fa fa-refresh fa-spin fa-2x'></i><p>Carregando...</p></div>");
    bloqueiaNavegacao();
    $('#fundo-foto').css('width', w);
    $('#fundo-foto').css('height', h);
    alinhaElementos();
    timer = setInterval(carregaImg, 20);
}
function mostraFoto(src) {
    $('.buttons').css('display', 'block');
    dimensionaFoto(src);
    navegacaoTeclado();
    alinhaElementos();
}
function criaBtnInferior() {
    $("<div class='btn-bottom'>" +
            "<a id='download' class='btn  btn-oth' style='border-top-left-radius: 5px;border-bottom-left-radius: 5px;'>" +
            "<span>Download</span></a>" +
            "<a class='btn  btn-oth' style='border-top-right-radius: 5px;border-bottom-right-radius: 5px;'>" +
            "<span>Enviar</span></a>" +
            "</div>").insertAfter('#foto1');
    adicionaListener('#download', 'click', download);
}
