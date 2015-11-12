// JavaScript Document

var fotosCache = [];
var imgClicado = [];
var clicadoFilho;
var tempImage1;
var novoSrc;
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
var teste, lastSrc = "";

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
	window.location = './?ano=' + o.value;
}

function foto(caminho) {
	
}

/*
	EXIBIR PAINEL
		função chamada no evento onclick da imagem no álbum (o evento na verdade está em um elemento <a>, filho de uma tag <figure> onde a imagem se encontra. É a função que inicia o carregamento da imagem, e após este ter sido concluído, exibe o painel (#fundo-foto).
*/
function exibirPainel(elemento){ 
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
		"<i class='fa fa-circle fa-stack-2x fa-inverse' style='color:RGBA(255,255,255,.5)'></i>"+
		"<i class='fa fa-location-arrow fa-stack-1x ' style='transform:rotate(-135deg);color:RGBA(255,255,255,.9);'>" +"</i></div>" +
		 
		"<div id='btn-next' class='ico fa-stack fa-lg inv' onclick='proximaFoto();' >" +
		"<i class='fa fa-circle fa-stack-2x fa-inverse' style='color:RGBA(255,255,255,.5)'></i>"+
		"<i class='fa fa-location-arrow fa-stack-1x ' style='transform:rotate(45deg);color:RGBA(255,255,255,.9);'>" +"</i></div>" +
		
		"<div id='fechar' class='close fa-stack fa-lg inv' onclick='esconderPainel()'> <p id='fechar-texto'>Fechar</p>" + 
		"<i class='fa fa-circle fa-stack-1x fa-inverse' style='color:RGBA(255,255,255,.5)'></i>" +
		"<i class='fa fa-times-circle fa-stack-1x ' style='color:RGBA(255,255,255,.9)'></i> </div>" +

		"<div id='carregando' style='display:block;'></div>" +
		  
		 "</div>" 
				  
	var alturaBody = $(body).height();
	$('#fundo').css("height", alturaBody);
	carregarImagem(elemento);	
	$('#fundo').show();
}

/*
	ESCONDER PAINEL
		função chamada no botão fechar do painel e no onclick do fundo preto semitransparente que cerca a caixa (#fundo). Irá ocultar o painel e o fundo, permitindo que o usuário volte a ver apenas as miniaturas do álbum.
*/
 function esconderPainel(e){
	$("#fundo").click(function(e) {
		if(e.target == e.currentTarget) {
			$('#fundo').hide();
			removeListener('#fechar', 'click', function a(){ $('#fundo').hide()});
			removeListener('body', 'keyup', verificaTecla);
		} 
	});
	
 }
 
 /*
	PROXIMA FOTO
		irá exibir a próxima foto no painel, fazendo cache e ajustando as dimensões e tamanhos de margem do painel conforme necessário.
*/
function proximaFoto() {
	//este será o elemento após figure clicado (a próxima foto)
	 clicadoPai = $(clicadoPai).next();
	 
	 //se o próximo elemento é um figure
	 if ($(clicadoPai).is('figure')) {
		 //para todos os figures na página
		 for (i=0 ; i<=figuresTodos.length; i++){
			 //encontre o figure clicado
			 if (figuresTodos[i] === clicadoPai[0]){
				 figureAtual = $('figure').get(i);
				 //defini qual figure é correspondente ao:
				 fotosCache[0] = $('figure').get(i-1) //anterior
				 fotosCache[1] = $('figure').get(i) //atual
				 fotosCache[2] = $('figure').get(i+1) //proxima +1
				 fotosCache[3] = $('figure').get(i+2) //proxima +2
				 break;
			 } 
		 }
	//caso o próximo elemento não seja um figure
	} else {
		//o "clicado" será o primeiro da lista
		clicadoPai = $(figuresTodos).first();
		//repete o processo de cima, porém fazendo em relação ao primeiro
		for (i=0 ; i<=figuresTodos.length; i++){
			 if (figuresTodos[i] === clicadoPai[0]){
				 figureAtual = $('figure').get(i);

				 fotosCache[0] = $('figure').get(i-1) //anterior
				 fotosCache[1] = $('figure').get(i) //atual
				 fotosCache[2] = $('figure').get(i+1) //proxima 1
				 fotosCache[3] = $('figure').get(i+2) //proxima 2
			 } 
		 }
	}	
	
	//a que antes era "próxima" agora é atual
	var proximaf = $(figureAtual);
	//se existe uma foto "atual"	
	if (proximaf.length != 0) {
		//a que antes era "próxima" torna-se atual
		figureAtual = proximaf[0];
		//modificar o src de miniatura para imagem grande
		var c = $(figureAtual).children().children().get(0).src;
		var p = c.replace('/p/','/g/');
		fotoI = new Image();
		fotoI.src = p;
		lastSrc = p;
		// $('#foto1').attr("src", p);
		
		if (fotoI.complete) {	
			$('#foto1').attr("src", p);
			console.log("proximaFoto: mostrar")
			$('.buttons').css('display', 'block');
			dimensionaFoto(lastSrc);
			navegacaoTeclado();
			alinhaElementos(); 
		 } else {
			document.querySelector('#foto1') ? $('#foto1').remove() : null;
			document.querySelector('.btn-bottom') ? $('.btn-bottom').remove() : null;
			$('#fundo-foto').append("<div id='loading'><i class='fa fa-refresh fa-spin fa-2x'></i><p>Carregando...</p></div>");	
			console.log("proximaFoto: loading")
			$('#fundo-foto').css('width', 448);
			$('#fundo-foto').css('height', 336);
			alinhaElementos();
			timer = setInterval(carregaImg,20);
		 }
	}
	
	//fazer cache, redimensionar e alinhar
	imagemCache();	
	// dimensionaFoto(lastSrc);
	// alinhaElementos();
	//mostrar painel, caso esteja oculto
	// $('#fundo').show();
	
}

 /*
	ANTERIOR FOTO
		semelhante à função proximaFoto(), porém exibe a foto anterior.
*/
function anteriorFoto() {	 

	clicadoPai = $(clicadoPai).prev();
	 
	if ($(clicadoPai).is('figure')) { 
		 for (i=0 ; i<=figuresTodos.length; i++){
			 if (figuresTodos[i] === clicadoPai[0]){
				 figureAtual = $('figure').get(i);

				 fotosCache[0] = $('figure').get(i-1) //prev
				 fotosCache[1] = $('figure').get(i) //current
				 fotosCache[2] = $('figure').get(i+1) //next 1
				 fotosCache[3] = $('figure').get(i+2) //next 2
			 } 
		 }
	} else {
		clicadoPai = $(figuresTodos).last();
		for (i=0 ; i<=figuresTodos.length; i++){
			 if (figuresTodos[i] === clicadoPai[0]){
				 figureAtual = $('figure').get(i);

				 fotosCache[0] = $('figure').get(i-1) //prev
				 fotosCache[1] = $('figure').get(i) //current
				 fotosCache[2] = $('figure').get(i+1) //next 1
				 fotosCache[3] = $('figure').get(i+2) //next 2
			 } 
		 }
	}
	// imagemCache();
	 
	if ($(figureAtual).prev() != "undefined") {
		var anteriorf = $(figureAtual);		
			if ($(anteriorf).is('figure')) {
				figureAtual = anteriorf[0];
				var c = $(figureAtual).children().children().get(0).src;
				var p = c.replace('/p/','/g/');
				fotoI = new Image();
				fotoI.src = p;
				lastSrc = p;
			if (fotoI.complete) {	
				$('#foto1').attr("src", p);
				console.log("proximaFoto: mostrar")
				$('.buttons').css('display', 'block');
				dimensionaFoto(lastSrc);
				navegacaoTeclado();
				alinhaElementos(); 
			 } else {
				document.querySelector('#foto1') ? $('#foto1').remove() : null;
				document.querySelector('.btn-bottom') ? $('.btn-bottom').remove() : null;
				$('#fundo-foto').append("<div id='loading'><i class='fa fa-refresh fa-spin fa-2x'></i><p>Carregando...</p></div>");	
				console.log("proximaFoto: loading")
				$('#fundo-foto').css('width', 448);
				$('#fundo-foto').css('height', 336);
				alinhaElementos();
				timer = setInterval(carregaImg,20);
			 }
		}		
	}
	imagemCache();
	// dimensionaFoto(lastSrc);
	// alinhaElementos(); 
}

 /*
	CARREGAR IMAGEM
		a função pega o src da miniatura clicada, encontra o src correspondente da imagem grande, cria um objeto <img> e seta este novo src a ele. Quando a imagem estiver carregada, ela será exibida no painel. Caso contrário, a função checará a condição novamente cada 20ms até que a imagem esteja carregada. A função poderá fazer cache ou não (ver comentário na última linha)
*/
 function carregarImagem(elementClicked){
	clicadoFilho = $(elementClicked).children('img');
	clicadoPai = $(elementClicked).parent();
	figuresTodos = $('figure').get();
	for (i=0 ; i<=figuresTodos.length; i++){
		if (figuresTodos[i] === clicadoPai[0]){
			figureAtual = $('figure').get(i);
			fotosCache[0] = $('figure').get(i-1) 
			fotosCache[1] = figureAtual 
			fotosCache[2] = $('figure').get(i+1) 
			fotosCache[3] = $('figure').get(i+2) 
		} 
	}	
	$('#carregando').css("display", "block");
	var imgClicado = clicadoFilho;
	if (imgClicado) {	
		var c = $(imgClicado).attr("src");
		novoSrc = c.replace('/p/','/g/');	
		fotoI = new Image();
		fotoI.src = novoSrc;	
		tempImage1 = new Image();
		tempImage1.src = novoSrc;	
		lastSrc = novoSrc;
		/* Quando a imagem estiver carregada (complete=true), exibir botões na parte superior/inferior do painel */
		 if (fotoI.complete) {
			$('#fundo-foto').append("<img id='foto1' src='" + novoSrc + "' >");
			 console.log("carregaImagem: Carregado - " + novoSrc);
				if(!document.querySelector(".btn-bottom")){
					$("<div class='btn-bottom'>" +
					  "<a id='download' class='btn  btn-oth' style='border-top-left-radius: 5px;border-bottom-left-radius: 5px;'>" +
					  "<span>Download</span></a>" +
					  "<a class='btn  btn-oth' style='border-top-right-radius: 5px;border-bottom-right-radius: 5px;'>" +
					  "<span>Enviar</span></a>" +
					"</div>" ).insertAfter('#foto1');
					console.log("carregaImagem: Barra de botões");
					adicionaListener('#download', 'click', download);
				}
			$('.buttons').css('display', 'block');
			dimensionaFoto(novoSrc);
			navegacaoTeclado();
			alinhaElementos(); 
			document.querySelector('#carregando') ? document.querySelector('#carregando').style.borderColor = "transparent" : null; 
		 } else {
			document.querySelector('#foto1') ? $('#foto1').remove() : null;
			$('#fundo-foto').append("<div id='loading'><i class='fa fa-refresh fa-spin fa-2x'></i><p>Carregando...</p></div>");			
			$('#fundo-foto').css('width', 448);
			$('#fundo-foto').css('height', 336);
			console.log("carregaImagem: Icone Loading");
			alinhaElementos();
			console.log("carregaImagem: Elementos alinhados");
			timer = setInterval(carregaImg,20);
		 }		
	}
 }
 
/*
	ALINHAR
	função genérica para centralizar um elemento filho horizontal ou verticalmente em relação a seu pai (usando margin). Valores permitidos no campo orientação: 'v' ou 'h'
*/
function alinhar(pai, filho, elemento, orientacao) {
	var mrg = ((pai-filho)/2);
	
	if (orientacao == "v") {
		$(elemento).css('marginTop', mrg);
		$(elemento).css('marginBottom', mrg);
	} else if (orientacao == "h") {
		$(elemento).css('marginRight', mrg);
		$(elemento).css('marginLeft', mrg);
	}
} 
 
/*
	ALINHA ELEMENTOS
	função que pega vários elementos da tela que precisam ser centralizados e, usando a função "alinha", efetua os ajustes
*/
function alinhaElementos() {
	
	var elmFundo = document.getElementById('fundo-foto');
	var elmFoto = document.getElementById('foto1');
	var elmFlechaE = document.getElementById('btn-prev');
	var elmFlechaD = document.getElementById('btn-next'); 
	var elmBtnInferior = document.querySelector('.btn-bottom');
	var t3 = document.getElementById('loading');
	
	//BEGIN bloqueio
		var paiH = $('#fundo-foto').parent().width();
		var filhoH = $('#fundo-foto').width();
		alinhar(paiH, filhoH, elmFundo,'h');
		var paiV = $(window).height();
		var filhoV = $('#fundo-foto').height();
		alinhar(paiV, filhoV, elmFundo,'v');
	//END bloqueio
	
	//BEGIN botoes inferior (download e enviar)
		var a = $(elmFoto).width();
		var b = $(elmBtnInferior).width();
		alinhar(a, b, elmBtnInferior,'h');
	//END botoes inferior (download e enviar)
	
	//BEGIN icones (flechas navegação)
		var iconeH = $(elmFlechaE).parent().height();
		var iconeV = $(elmFlechaE).height();
		alinhar(iconeH, iconeV, elmFlechaE,'v');
		alinhar(iconeH, iconeV, elmFlechaD,'v');
	//END icones (flechas navegação)
	
	//BEGIN carregando (ícone carregamento)
		var t1 = $('#fundo-foto').width();
		var t2 = $('#loading').width();	
		var b1 = $('#fundo-foto').height();
		var b2 = $('#loading').height();
		alinhar(t1, t2, t3, "h");
		alinhar(b1, b2, t3, "v");
	//END carregando (ícone carregamento)
	
 }

/*
	CARREGA IMG
	função que é repetida a cada 20ms durante o primeiro carregamento (antes de começar a fazer cache) para verificar se a imagem clicada está carregada ou não (complete == true).
*/
function carregaImg() {
	  console.log("Carregando...");
	  /* Quando a imagem estiver carregada (complete=true), exibir botões na parte superior/inferior do painel */
	 if (fotoI.complete) {	
		console.log("CarregaImg: Pronto - " + fotoI.src);	
		$('#fundo-foto').append("<img id='foto1' src='" + lastSrc + "' >"); 
		console.log("CarregaImg: Mostrar");
		if(!document.querySelector(".btn-bottom")){
			$("<div class='btn-bottom'>" +
			  "<a id='download' class='btn  btn-oth' style='border-top-left-radius: 5px;border-bottom-left-radius: 5px;'>" +
			  "<span>Download</span></a>" +
			  "<a class='btn  btn-oth' style='border-top-right-radius: 5px;border-bottom-right-radius: 5px;'>" +
			  "<span>Enviar</span></a>" +
		    "</div>" ).insertAfter('#foto1');
			console.log("CarregaImg: Botões");
			adicionaListener('#download', 'click', download);
		}
		$('.buttons').css('display', 'block');
		$('#loading').remove();
		dimensionaFoto(lastSrc);
		clearInterval(timer);
		console.log("CarregaImg: Clear Interval");
		navegacaoTeclado();
		alinhaElementos(); 
	 } 
}
 
/*
	DIMENSIONA FOTO
	acerta as dimensões da foto, evitando que ela estoure a área da painel ou fique desalinhada, o que geralmente ocorre com imagens maiores.
*/
function dimensionaFoto(src) {
	$('#fundo').show();
	
	var tImg = document.createElement("IMG");
	// tImg.src = src;
	tImg = fotoI;
	
	var wh = $(window).height();
	//pega dimensões da imagem (tamanho "real")
	// var photoH = document.querySelector('#foto1').naturalHeight;
	// var photoW = document.querySelector('#foto1').naturalWidth;
	var photoH = tImg.naturalHeight;
	var photoW = tImg.naturalWidth;
	$('#fundo-foto').css('width', photoW);
	$('#fundo-foto').css('height', photoH);
	if (photoW > 0 && photoH > 0){
		//ajusta largura/altura da caixa e da imagem de forma proporcional
		var adjustWidth = ((photoW * ($('#fundo-foto').height()))/photoH);
		var adjustHeight = ((photoH * ($('#fundo-foto').width()))/photoW);
		$('#fundo-foto').css('width', adjustWidth);
		$('#fundo-foto').css('height', adjustHeight);
		
		console.log("CarregaImg{ Dimensionado - " + src);
		console.log("			 Natural size " + photoW + "x" + photoH);
		console.log("			 Adjusted size " + adjustWidth + "x" + adjustHeight + "}");
	} else {
		console.log("Aguardando loading para redimensionar...");
	}	
}
 
/*
	IMAGEM CACHE
	efetua o cache das imagens no álbum, sempre carregando 2 imagens posteriores e 1 anterior a imagem que está sendo visualizada.
*/
 function imagemCache() { 
		if ($(fotosCache[0]).is('figure')) {
			var cache0 = new Image();
			var cacheSrc0 = $(fotosCache[0]).children().children().get(0).src;
			cache0.src = cacheSrc0.replace('/p/','/g/');
		}
		if ($(fotosCache[1]).is('figure')) {
			var cache3 = new Image();
			var cacheSrc3 = $(fotosCache[1]).children().children().get(0).src;
			cache3.src = cacheSrc3.replace('/p/','/g/');
		}
		if ($(fotosCache[2]).is('figure')) {
			var cache1 = new Image();
			var cacheSrc1 = $(fotosCache[2]).children().children().get(0).src;
			cache1.src = cacheSrc1.replace('/p/','/g/');
		}	
		if ($(fotosCache[3]).is('figure')) {
			var cache2 = new Image();
			var cacheSrc2 = $(fotosCache[3]).children().children().get(0).src;
			cache2.src = cacheSrc2.replace('/p/','/g/');	
		}
 }
 
 /*
	VERIFICA TECLA
	verifica o pressionamento das setas direcionais e ESC, permitindo que o usuário navegue pelo álbum e feche o painel sem usar o mouse
*/
 function verificaTecla(e) {
	if (e) {
		switch(e.which) {
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

 /*
	ADICIONA/REMOVE LISTENER
	adiciona ou remove event listeners, usados para os eventos de click e keypress
*/
function adicionaListener(element, event, func) {
	var a = document.querySelector(element);
	a.addEventListener(event, func);
}

function removeListener(element, event, func) {
	var a = document.querySelector(element);
	a.removeEventListener(event, func);
}

 /*
	NAVEGACAO TECLADO
	adiciona os listeners que permitirão a checagem das teclas pressionadas (função "verificaTecla"
*/
function navegacaoTeclado(){
	$('.inv').css('display', 'block');
	adicionaListener('body', 'keyup', verificaTecla);
	adicionaListener('#fechar', 'click', function a(){ $('#fundo').hide()});
	$('#fundo-foto').css('background', 'rgba(255,255,255, 0)');
}

 /*
	RESIZE
	centraliza e redimensiona o painel no evento onresize da página
*/
function resize(){
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
