	var generated = false;

function fciGraph() {
		if (freq.length == 0) {
			alert('É necessário inserir dados e criar uma tabela antes de gerar os gráficos estatísticos!');
		} else {
			$(function () {
				$('#fcigraph').highcharts({
				 chart: {
						type: 'spline'
					},
					title: {
						text: 'Curva Polida',
						x: -20 
					},
					xAxis: {
						categories: xi
					},
					yAxis: {
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},

					series: [{
						name: 'fci',
						data: JSON.parse("[" + fci + "]")
					}]
				});
			});
			$('#Figraph').hide();
			$('#freqgraph').hide();
			$('#fcigraph').show();
			$('#calcs').hide();
		}
    }    
	
	function freqGraph() {
		var s = seriesBuilder(ax, bx);
		
		if (freq.length == 0) {
			alert('É necessário inserir dados e criar uma tabela antes de gerar os gráficos estatísticos!');
		} else {
			$(function () {
				$('#freqgraph').highcharts({
				 chart: {
						type: 'spline'
					},
					title: {
						text: 'Polígono de Frequência',
						x: -20 
					},
					xAxis: {
						categories: JSON.parse("[" + ax + "]"),
						minvalue: 0
					},
					yAxis: {
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}],
						 min: 0
					},

					series: [{
						name: 'fi',
						data: JSON.parse("[" + s + "]")
					}]
				});
			});
			$('#Figraph').hide();
			$('#fcigraph').hide();
			$('#freqgraph').show();
			$('#calcs').hide();
		}
    } 
	
	function FiGraph() {

	var s = seriesBuilder(cx, dx);
	
		if (freq.length == 0) {
			alert('É necessário inserir dados e criar uma tabela antes de gerar os gráficos estatísticos!');
		} else {	
				$(function () {
					$('#Figraph').highcharts({
					chart: {
						type: 'spline'
					},
					title: {
						text: 'Freq. Acumulada'
					},

					xAxis: {
						tickPositions: JSON.parse("[" + cx + "]"),
						minvalue: 0
					},

					yAxis: {
						tickPositioner: function () {
							var positions = [],
								tick = Math.floor(this.dataMin),
								increment = Math.ceil((this.dataMax - this.dataMin) / 6);

							for (tick; tick - increment <= this.dataMax; tick += increment) {
								positions.push(tick);
							}
							return positions;
						}
					},

					series: [{
						name: 'Fi',
						data: JSON.parse("[" + s + "]")
					}]
				});
			});

			$('#fcigraph').hide();
			$('#freqgraph').hide();
			$('#Figraph').show();
			$('#calcs').hide();
		}
    } 
	
	function calcs() {
		
		if (freq.length == 0) {
			alert('É necessário inserir dados e criar uma tabela antes de gerar os cálculos!');
		} else {
			median();
			var av = avg();
			if (!generated) {
				document.getElementById('mpos').innerHTML += '<button class="btn btn-primary pos" type="button" onclick="alert(\'A moda é ' + mode() + '\');">' + 'Moda ' + '<span class="badge">' + mode() + '</span></button>'
				+ '<button class="btn btn-primary pos" type="button" onclick="alert(\'A média aritmética é ' + av.toFixed(2) + '\');">' + 'Média ' + '<span class="badge">' + av.toFixed(2) + '</span></button>'
				+ '<button class="btn btn-primary pos" type="button" onclick="alert(\'A mediana é ' + theMd.toFixed(2) + '\');">' + 'Mediana ' + '<span class="badge">' + theMd.toFixed(2) + '</span></button>'
				generated = true;
			}												
			
			$('#fcigraph').hide();
			$('#freqgraph').hide();
			$('#Figraph').hide();
			$('#calcs').show();
		}
	}
	
	function seriesBuilder(a,b){
		var s = '';
		for  (i = 0; i < a.length; i++) { 
			if (i != a.length-1){
				s += '['+a[i] + ',' + b[i]+'];';
			} else {
				
				s += '['+a[i] + ',' + b[i]+']';
			}
			var res = s.split(";");
		}
		return res;
	}
	
	
/*Fontes e links úteis sobre Highcharts usados neste projeto:

http://jsfiddle.net/gh/get/jquery/1.7.2/highslide-software/highcharts.com/tree/master/samples/highcharts/xaxis/tickpositions-tickpositioner/

http://stackoverflow.com/questions/27845667/how-to-place-origin-at-exactly-the-middle-of-highcharts

*/