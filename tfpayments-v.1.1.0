var tipo = "";
var quarto = "";
var combo = "";
var onlinePayment = false;
var link = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=";
var btnDiv = document.querySelector(".div-success");
var radioDiv = document.querySelector(".radio-payment-container");
var input = btnDiv.querySelector("#itemCode");
var btn = '<a id="itemCode" target="_blank" href="#"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" alt="Buy Now Button" /></a>'
var valueArray = ["8KCQJXWUW53W6","VGKYZEDZD8MLA", "3FEVRMJW7ZNPW","SCG25TLD3X44W","L8DKJ77KPVU2Q","LJNV7UAKYW4GG","GZQS24KWK4QBE","G7W5QRJYHNNXQ","XVM5X5Y2SN9TY", "WZVLRHKWMHTJU", "CGYHN9E7JNDT4"];
init();
function init() {
    if (btnDiv) {
        document.querySelector("#radio-payment-1").setAttribute("onclick", "onSelectRadio(this)");
        document.querySelector("#radio-payment-2").setAttribute("onclick", "onSelectRadio(this)");
    }
}
function onSelectCombo(){	
    var quartoDiv = document.querySelector(".div-tipo-quarto");
	var str = document.querySelector("#data-imersao").value;
	tipo = str.charAt(str.length-2);
	quarto = document.querySelector("#tipo-alojamento") ? document.querySelector("#tipo-alojamento").value : "";
	if (tipo === "7") {
	    if (quartoDiv)  {
            quartoDiv.style.display = "none";
            quartoDiv.querySelector("#tipo-alojamento").value = "1";
	    }
		quarto = "1";
    } else if (tipo === "8") {
        if (quartoDiv)  {
            quartoDiv.style.display = "none";
            quartoDiv.querySelector("#tipo-alojamento").value = "1";
        }
		quarto = "1";
    } else {
        if (quartoDiv && quartoDiv.style.display === "none") {
            quartoDiv.style.display = "block";
            quartoDiv.querySelector("#tipo-alojamento").value = "";
			quarto = "";
        }
    }
	combo = "" + tipo + quarto;
	 if (tipo != "" && quarto != "") {
		var divexists = document.querySelector("#pp-container");
		var divexists2 = document.querySelector("#pp-div-text");
		var div = document.createElement('DIV');
		var divText = document.createElement('DIV');
		divText.id = "pp-div-text"
		div.id = "pp-container";
		if (divexists && divexists2) {
			divexists.parentNode.removeChild(divexists);
			divexists2.parentNode.removeChild(divexists2);
		}
		div.innerHTML = btn;
		var p = document.createElement("P");
		var label = document.createElement("P");
		p.className = "paragrafo";
		p.innerHTML = "<br/>Efetue o pagamento online clicando no botão abaixo:<br/>";
		label.innerHTML = "Pagar com <img src='https://daks2k3a4ib2z.cloudfront.net/5529c1f4264213136f7d6c18/56378332c41f43c75b7c5037_paypal-logo.png' style='width:100px'>";
		label.style.marginTop = "20px";
		label.style.fontWeight = "bold";
		label.style.fontSize = "1.5em";
		divText.appendChild(p);
		divText.appendChild(label);
		btnDiv.appendChild(divText);
		btnDiv.appendChild(div);
		radioDiv.style.display = "block";
	 } else {
	    radioDiv.style.display = "none";
		radioDiv.querySelector("#radio-btn-yes").checked = false;
		radioDiv.querySelector("#radio-btn-no").checked = false;
	 }
	 input = btnDiv.querySelector("#itemCode");
	switch(combo) {
		case "1":
			input.setAttribute("href", link + valueArray[0]);
			break;
		case "31":
			input.setAttribute("href", link + valueArray[2]);
			break;
		case "32":
			input.setAttribute("href", link + valueArray[1]);
			break;
		case "41":
			input.setAttribute("href", link + valueArray[4]);
			break;
		case "42":
			input.setAttribute("href", link + valueArray[3]);
			break;
		case "51":
			input.setAttribute("href", link + valueArray[6]);
			break;
		case "52":
			input.setAttribute("href", link + valueArray[5]);
			break;
		case "61":
			input.setAttribute("href", link + valueArray[7]);
			break;
		case "62":
			input.setAttribute("href", link + valueArray[8]);
			break;
		//below: London immersions
		case "71":
			input.setAttribute("href", link + valueArray[9]);
			break;
		case "81":
			input.setAttribute("href", link + valueArray[10]);
			break;
	}
}
function onSelectRadio(radio){
	if (radio.id === "radio-payment-1") {
		document.querySelector("#pp-div-text").style.display = "block";
		document.querySelector("#pp-container").style.display = "block";
	} else {
		document.querySelector("#pp-div-text").style.display = "none";
		document.querySelector("#pp-container").style.display = "none";
	}
}
