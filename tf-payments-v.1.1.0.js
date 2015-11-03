var tipo = "";
var quarto = "";
var combo = "";
var radioDiv = document.querySelector(".radio-payment-container");
var paymentDiv = document.querySelector(".div-success");
var btnLabel = document.querySelector("#pp-div-text");
var btnContainer = document.querySelector("#pp-container");
var input = paymentDiv.querySelector("#itemCode");
var link = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=";
var btn = '<a id="itemCode" target="_blank" href="#"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" alt="Buy Now Button" /></a>'
var valueArray = ["8KCQJXWUW53W6","VGKYZEDZD8MLA", "3FEVRMJW7ZNPW","SCG25TLD3X44W","L8DKJ77KPVU2Q","LJNV7UAKYW4GG","GZQS24KWK4QBE","G7W5QRJYHNNXQ","XVM5X5Y2SN9TY", "WZVLRHKWMHTJU", "CGYHN9E7JNDT4"];
init();
function init() {
    if (paymentDiv) {
        document.querySelector("#radio-payment-1").setAttribute("onclick", "onSelectRadio(this)");
        document.querySelector("#radio-payment-2").setAttribute("onclick", "onSelectRadio(this)");
    }
}
function onSelectCombo(){	
    var quartoDiv = document.querySelector(".div-tipo-quarto");
	var tipoValue = document.querySelector("#data-imersao").value;
	tipo = tipoValue.charAt(tipoValue.length-2);
	quarto = document.querySelector("#tipo-alojamento") ? document.querySelector("#tipo-alojamento").value : "";
	if (tipo === "7" || tipo === "8") {
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
		var newContainer = document.createElement('DIV');
		var newLabel = document.createElement('DIV');
		newLabel.id = "pp-div-text"
		newContainer.id = "pp-container";
		if (btnContainer && btnLabel) {
			btnContainer.parentNode.removeChild(btnContainer);
			btnLabel.parentNode.removeChild(btnLabel);
		}
		newContainer.innerHTML = btn;
		var paymentText = document.createElement("P");
		var paymentLabel = document.createElement("P");
		paymentText.className = "paragrafo";
		paymentText.innerHTML = "<br/>Efetue o pagamento online clicando no botão abaixo:<br/>";
		paymentLabel.innerHTML = "Pagar com <img src='https://daks2k3a4ib2z.cloudfront.net/5529c1f4264213136f7d6c18/56378332c41f43c75b7c5037_paypal-logo.png' style='width:100px'>";
		paymentLabel.style.marginTop = "20px";
		paymentLabel.style.fontWeight = "bold";
		paymentLabel.style.fontSize = "1.5em";
		newLabel.appendChild(paymentText);
		newLabel.appendChild(paymentLabel);
		paymentDiv.appendChild(newLabel);
		paymentDiv.appendChild(newContainer);
		radioDiv.style.display = "block";
	 } else {
	    	radioDiv.style.display = "none";
		radioDiv.querySelector("#radio-btn-yes").checked = false;
		radioDiv.querySelector("#radio-btn-no").checked = false;
	 }
	 input = paymentDiv.querySelector("#itemCode");
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
		btnContainer.style.display = "block";
		btnLabel.style.display = "block";
	} else {
		btnContainer.style.display = "none";
		btnLabel.style.display = "none";
	}
}
