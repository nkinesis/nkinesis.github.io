     var b = 0;
	 var mdclass = [];
	 var theMd = 0;
	 var theQt = 0;
	 var thePc = 0;
	 var avg;
	  
		function newField(e){
                if (e.keyCode==13) {
                    $('<input type="text" class="cell valuecell" onKeyPress="newField(event)"/>').appendTo('form');
                    $('.cell').next().focus();
                }
            }        

			function sortNumber(a,b) {
				return a - b;
			}
			
            function createRaw(){
                $('.valuecell').each(function(){
					var a =	$(this).val();
                    table.push(parseInt(a));
                });   
                table = table.sort(sortNumber);
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
            
            function sturges(){
                var result = Math.floor(1+3.3*(Math.log(table.length)/Math.log(10))); 
                
                //nunca haverão mais de 10 classes
                if (result > 10) {
                    result = 10;
                }
                
                return result;
            }
            


		   function drawClassTable(){	            
                var linhaHTML = [];
                
                for (i=0; i < (tclass.length-1); i++){     
                    linhaHTML.push('<tr>' + '<td class="textct">' + tclass[i] + ' |-- ' + tclass[i+1] + '</td>' 
                    + '<td class="fi1">' +  globalArrays[i].length + '</td>' 
                    + '<td class="xi1">' +  xi[i] + '</td>' 
                    + '<td class="fri1">' +  fri[i] + '</td>' 
                    + '<td class="FFi1">' +  FFi[i] + '</td>' 
                    + '<td class="FFri1">' +  FFri[i] + '</td>' 
					+ '<td class="fci">' +  fci[i] + '</td>' 
                    + '</tr>');
					
					var s = [FFi[i], globalArrays[i].length, tclass[i], tclass[i+1]];
					auxMd.push(s);
                }
                
                for (i=0; i < (tclass.length-1); i++){  
                     var a = fri[i];
                     fritotal += parseFloat(a);
                }
                
                for (i=0; i < (tclass.length); i++){  
                     thetotal += globalArrays[i].length; 
                }
                
                document.getElementById('table').innerHTML += linhaHTML.join('') + '<tr>' + '<td class="tt1">' + 'Total' + '</td>' + '<td class="ttt1">' + thetotal + '</td>' + '<td>' + " " + '</td>' + '<td class="ttt1">' + fritotal.toFixed(2) + '</td>' + '<td>' + " " + '</td>' + '<td>' + " " + '</td>' + '<td>' + " " + '</td>' + '</tr>';
            }
            
             function totalFrequency(){
		 
                for (i=0; i < (tclass.length-1); i++){     
                    freq.push(globalArrays[i].length);
                }
         
                for (i=0; i < (tclass.length-1); i++){     
                     sum += globalArrays[i].length;
                }
             }
             
             function relativeFrequency(){	
                for (i=0; i < freq.length; i++) {
                    var a = (freq[i])/sum;
                    fri.push(a.toFixed(2));
                }
             }

            function accFrequency(){	
                var a = freq[0];
                
                for (i=1; i <= freq.length; i++) {
                    FFi.push(a);
                    a += freq[i];
                }
                console.log('FFi ' + FFi);
                
             }        

            function relAccFrequency(){	
            for (i=0; i < freq.length; i++) {
                    var a = (FFi[i])/sum;
                    FFri.push(a.toFixed(2));
                }
                
                console.log('FFri' + FFri);
                
             }         

            function calculatedFrequency() {
				var a = 0;		
				for (i=0; i < freq.length; i++) {
					if (i-1 < 0) {
						a = (0 + (2* freq[i]) + freq[i+1])/4;
					} else if (i+1 > freq.length-1) {
						a = (freq[i-1] + (2* freq[i]) + 0)/4;
					} else {
						a = (freq[i-1] + (2* freq[i]) + freq[i+1])/4;	
					}
						fci.push(a.toFixed(2)); 
				}
					console.log('fci ' + fci);
					
                }
			
			function prepareChartArrays() {
				var lt1 = (ax.length)-1;
				var lt2 = (ax.length)-2;
				
				var v1 = ax[lt1];
				var v2 = ax[lt2];  
				
				 ax.unshift(0);
				 ax.push((v1) + ((v1)-(v2)));
				
				 bx.unshift(0);
				 bx.push(0);
						
				cx.shift();
				cx.unshift(cx[1]-cx[0]);
				// cx.push(0);
		
				dx.unshift(0);
			}
			
			function sumFFi() {
				var sum=0;
					for (i=0;i < FFi.length; i++) {
						sum+=FFi[i];
					}	
					return sum;
			}
			
			function avg() {
				
				//multiplica
				for (i=0;i<freq.length;i++) {
					var a = freq[i]*xi[i];
					xifi.push(a);
				}
				
				//soma
				for (i=0;i<freq.length;i++) {
					b += xifi[i];
				}
				var c = b/thetotal;

				return c;
			}
			
			function mode() {
				var a = Math.max.apply(null, freq);
				var b = $.inArray(a, freq);
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
				var mn1 = thetotal/2;	
				
				for (i=0;i<FFi.length;i++){
					var a = FFi[i] - mn1;
					
					if (a >= 0) {
						locateClass = FFi[i];					
						
						for (i=0;i<auxMd.length;i++){
							var p = $.inArray(locateClass, auxMd[i]);
							
							if (p != -1) {
								basePosition = p;
								
								if (i != 0) {
									lastAccFreq = auxMd[i-1][p];
								}
								currentFreq = auxMd[i][p+1];
								li = auxMd[i][p+2];
								hi = auxMd[i][p+3];		
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

				theMd = (li + (((thetotal/2)-lastAccFreq)*4)/currentFreq);
				console.log ('MEDIANA: ' + li + " / "
							+ 'sumfi/2 ' + (sumFFi()/2) + " / "
							+ 'lastAccFreq ' + lastAccFreq + " / "
							+ 'hi ' + hi + " / "
							+ 'currentFreq ' + currentFreq + " / ");
			}			
			
			function quartile(n) {
				var basePosition = '';
				var currentFreq = 0;
				var lastAccFreq = 0;
				var li = 0;
				var hi = 0;
				var locateClass = 0;
				var qt1 = (n*thetotal)/4;	

				for (i=0;i<FFi.length;i++){
					var a = FFi[i] - qt1;				
					
					if (a >= 0) {
						locateClass = FFi[i];				
						
						for (i=0;i<auxMd.length;i++){
							var p = $.inArray(locateClass, auxMd[i]);
							
							if (p != -1) {
								basePosition = p;
								
								
								if (i != 0) {
									
										if (i!=0){
											lastAccFreq = auxMd[i-1][p];
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
					theQt = li + (((qt1-lastAccFreq)*hi)/currentFreq);
					console.log ('QUARTIL: ' + 'li ' + li + " / "
								+ 'sumfreq/4 ' + qt1 + " / "
								+ 'lastAccFreq ' + lastAccFreq + " / "
								+ 'hi ' + hi + " / "
								+ 'currentFreq ' + currentFreq + " / ");
								alert("O quartil " + n + " é igual a " + theQt.toFixed(2));
			}
			
			function percentile(n) {
				var basePosition = '';
				var currentFreq = 0;
				var lastAccFreq = 0;
				var li = 0;
				var hi = 0;
				var locateClass = 0;
				var pc1 = (n*thetotal)/100;	
				
				for (i=0;i<FFi.length;i++){
					var a = FFi[i] - pc1;				
					
					if (a >= 0) {
						console.log('a ' + a);
						locateClass = FFi[i];

						for (i=0;i<=auxMd.length;i++){
							var p = $.inArray(locateClass, auxMd[i]);
							console.log('locateClass ' + locateClass);
							console.log('auxMd ' + auxMd[i]);
							
							if (p != -1) {
								basePosition = p;
								console.log('basePosition ' + basePosition);
								
								if (i != 0) {
									
										if (i!=0){
											lastAccFreq = auxMd[i-1][p];
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
					thePc = li + (((pc1-lastAccFreq)*hi)/currentFreq);
					console.log ('PERCENTIL: ' + 'li ' + li + " / "
								+ 'sumfreq/100 ' + pc1 + " / "
								+ 'lastAccFreq ' + lastAccFreq + " / "
								+ 'hi ' + hi + " / "
								+ 'currentFreq ' + currentFreq + " / ");
								alert("O percentil " + n + " é igual a " + thePc.toFixed(2));
			}	

				