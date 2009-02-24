function STMRCWindow(page) {
	OpenWin = this.open(page, "CtrlWindow", "toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=no,dependent=no,directories=no,width=485,height=540,x=50,y=50");
}

function showHoverSmartTip(smartTipElement, smartTipText, smartTipHeader)
{
	try{
		//THIS WAS DONE TO SUPPORT FIREFOX, IF INLINE ATTRIBUE
		smartTipElement.smartTip=smartTipText;
		smartTipElement.smartTipHeader=smartTipHeader;
		smartTipElement.onmousemove=showSmartTip;
		smartTipElement.onmouseout=hideSmartTip;
			
	}catch (exception){
		// do nothing
	}
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function queryString(parameter) { 
    var loc = location.search.substring(1, location.search.length);
    var param_value = false;

    var params = loc.split("&");
    for (i=0; i<params.length;i++) {
        param_name = params[i].substring(0,params[i].indexOf('='));
        if (param_name == parameter) {
            param_value = params[i].substring(params[i].indexOf('=')+1)
        }
    }
    if (param_value) {
        return param_value;
    }
    else {
        return false; //Here determine return if no parameter is found
    }
}

function Left(str, n){ 
    if (n <= 0) return ""; 
    else if (n > String(str).length) return str; 
    else return String(str).substring(0,n); 
} 

function Right(str, n){ 
    if (n <= 0) return ""; 
    else if (n > String(str).length) return str; 
    else { 
        var iLen = String(str).length; 
        return String(str).substring(iLen, iLen - n); 
    } 
}


function inputLimiter(e,allow) { 
    var AllowableCharacters = '';

    if (allow == 'Letters'){AllowableCharacters=' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';}
    if (allow == 'Numbers'){AllowableCharacters='1234567890';} 
    if (allow == 'LettersAndNumbers'){AllowableCharacters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';} 
    if (allow == 'NameCharacters'){AllowableCharacters=' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-.\'';}
    if (allow == 'NameCharactersAndNumbers'){AllowableCharacters='1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-\'';}
    if (allow == 'StreetAddress'){AllowableCharacters='1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.#-\'';}
    if (allow == 'EmailCharacters'){AllowableCharacters='1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-\'@.';}

    var k; 
    k=document.all?parseInt(e.keyCode): parseInt(e.which); 
      if (k!=13){ 
            if ((e.ctrlKey==false) && (e.altKey==false) && (k!=0) && (k!=8)) { 
                  return (AllowableCharacters.indexOf(String.fromCharCode(k))!=-1); 
            } else { 
                  return true; 
            } 
      } else { 
            return false; 
      } 
} 

function createXMLHTTPReq(){
   var request = false;
   
   try {
     request = new XMLHttpRequest();
   } 
   catch (trymicrosoft) {
     try {
       request = new ActiveXObject("Msxml2.XMLHTTP");
     } 
     catch (othermicrosoft) {
       try {
         request = new ActiveXObject("Microsoft.XMLHTTP");
       } 
       catch (failed) {
         request = false;
       }  
     }
   }
   finally{
   	return request;
   } 
}

function createXMLHttp() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            var aVersions = [ "MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp","Microsoft.XMLHttp"];
            for (var i = 0; i < aVersions.length; i++) {
                try {
                    var oXmlHttp = new ActiveXObject(aVersions[i]);
                    return oXmlHttp;
                } catch (oError) {
                    //Do nothing
                }
            }
        }
    }
    throw new Error("XMLHttp object could be created.");
}

function retrieveFormValsForPost(sFormName){
	
	var sReturnVal = ''
	var ndx = 0
	var nChildren = 0
	
	try{
		var oForm = document.getElementById(sFormName)
		if (oForm){
			var oCollection = oForm.elements
			nChildren = oCollection.length
			ndx = 0
			for (ndx; ndx < nChildren; ndx++){
				var oObj = oCollection.item(ndx)
				
				switch (oObj.tagName){
					case 'SELECT':
					case 'TEXTAREA':
						sReturnVal = sReturnVal + oObj.name + "=" + escape(oObj.value) + "&"
						break;
					case 'INPUT':
						switch (oObj.type){
							case 'checkbox':
							case 'radio':
								if (oObj.checked){
									sReturnVal = sReturnVal + oObj.name + "=" + escape(oObj.value) + "&"
								}
								break;
							case 'text':
							case 'password':
							case 'hidden':
								if ((oObj.name != 'actionContinue') && (oObj.name != 'actionBack')){
									sReturnVal = sReturnVal + oObj.name + "=" + escape(oObj.value) + "&"
								}
								break
							default:
								//No other types are supports
								break;	
						}
						break;
					default:
						//No other types are supports
						break;
				}
				
			}
		}
	}catch(exception){
		// do nothing - just don't error on page
	}
	finally{
		return sReturnVal;
	}
}

function postXMLHTTPReq(){
	
	try{
		var request = createXMLHTTPReq();
		var url = location.pathname + '?verb=postcontinue'	//EX:  "/automobile/qform.asp?verb=postcontinue";
	     
		if (request){
	     		request.open("POST", url, false);
	     		request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	     		request.send(retrieveFormValsForPost('form1'));
	     	
	     		if (request.readyState == 4){
				// request was returned with no errors
				setVerb('continue');
				if (request.status == 200){
					location.href = document.forms['form1'].action
				}
				else{
					//An error occured on the page - do the normal button processing
					document.forms['form1'].submit()
				}
	     		}
	    	}
	    	else{
	    		//No request object was created - do the normal button processing
	      		setVerb('continue');
			document.forms['form1'].submit()
	    	}
	}catch(exception){
		// do nothing - just don't error on page
	} 
}
		
function enableDisableBackContinue(){
	//show buttons as disabled
	try{
		if (document.all("btn_back")[0] && document.all("btn_back")[0]){
			if (document.all("btn_back")[0].enabled == 0) {
				return
			}
			enableButton(document.all("btn_back")[0],false)
		}
		if (document.all("btn_back")[1] && document.all("btn_back")[1]){
			if (document.all("btn_back")[1].enabled == 0) {
				return
			}
			enableButton(document.all("btn_back")[1],false)
		}
		if (document.all("btn_continue") && document.all("btn_continue")){
			if (document.all("btn_continue").enabled == 0) {
				return
			}
			enableButton(document.all("btn_continue"),false)
		}
	} catch (exception){
	// do nothing
	}
}	

function enableButton(oBtn, bEnabled){		
	try{
		if (bEnabled){
			oBtn.style.cursor='hand'
			oBtn.className = ""
		}else{
			oBtn.style.cursor='wait'
			oBtn.className = "disabled"
			oBtn.disabled = true;
		}
	}
	catch(exception){
		// do nothing - just don't error on page
	}
}	

function noenter(key) {
	// capture [Enter] and abort the form submit
	// only works if you add to each input type="text" tag:
	//		onkeypress="return noenter(event)" 
	if(window.event) { // IE
			if (window.event.keyCode == 13) {
				document.forms['form1'].elements['validNavigation'].value = '1';
				postXMLHTTPReq();
				enableDisableBackContinue();
			}
	}
	else if (key.which == 13) {
		document.forms['form1'].elements['validNavigation'].value = '1';
		postXMLHTTPReq();
		enableDisableBackContinue();
	}
	else return true;
}

function STMRCWindow(page) {
    OpenWin = this.open(page, "CtrlWindow", "toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=no,dependent=no,directories=no,width=455,height=540,x=50,y=50");
}

function addCommasNoSpecialCharacters(oObj){
    try{
		// trapping shift or tab keys
		if((window.event.keyCode==9) || (window.event.keyCode==16)){
			return;
		}

		var sValue = oObj.value;
		var sNewVal = '';
		
		sValue = sValue.replace(/[^0-9]/ig,"")	//remove non numeric values
		
		//Remove Leading Zeros, If more than 1
		if (oObj.value.length > 1) {
			while (oObj.value.indexOf("0") == 0){
				sValue = sValue.replace('0',"")
				break;
			}
		}
		if (oObj.value.length > 1) {
			for (idx=1; idx < oObj.maxLength; idx++){
				if(oObj.value.charAt(idx) == "0" && oObj.value.charAt(0) == "0"){
					sValue = sValue.replace(oObj.value.charAt(idx),"")
				}
				else break;
			}

			if(oObj.value.charAt(0) == "0" && oObj.value.charAt(1) != "0") {
				sValue = sValue.replace(oObj.value.charAt(0),"")
			}           
		}
		
		// attempting to remove extra characters that may have slipped in.
		if (oObj.maxLength){
			if (sValue.length > parseInt(oObj.maxLength)){ 
				sValue = sValue.substr(0,oObj.maxLength-(parseInt(oObj.maxLength/3))) //MaxLength must = 4, 7 or 10 
			}
		}
		
		if(sValue > 99){
			var nCommas = parseInt((sValue.length / 3))
			if ((sValue.length % 3) == 0){
				//subtract extra comma that can occur if modulus = 0 
				--nCommas
			}	
			
			if (nCommas > 0){

					for (n = nCommas; n > 0; n--){		//add comma(s)
						sNewVal =  sNewVal + ',' + sValue.substr((sValue.length-(n*3)),3);
					}//add remaining
				
					sNewVal =  sValue.substr(0,((sValue.length-(nCommas*3)) / 1)) + sNewVal;
					oObj.value = sNewVal;
				}
			else{
					oObj.value = sValue;
			}		
				
		}
		else{
			oObj.value = sValue;
		}
				
	}catch(exception){
		//do nothing
	}
}	

function autoTab(input,len, e) {
    var isNN = (navigator.appName.indexOf("Netscape")!=-1);
    var keyCode = (isNN) ? e.which : e.keyCode; 
    var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
    if(input.value.length >= len && !containsElement(filter,keyCode)) {
    input.value = input.value.slice(0, len);
    input.form[(getIndex(input)+1) % input.form.length].focus();
}

function containsElement(arr, ele) {
    var found = false, index = 0;
    while(!found && index < arr.length)
    if(arr[index] == ele)
    found = true;
    else
    index++;
    return found;
}

function getIndex(input) {
    var index = -1, i = 0, found = false;
    while (i < input.form.length && index == -1)
    if (input.form[i] == input)index = i;
    else i++;
    return index;
    }
    return true;
}

function getFormValue(field){
//alert('processing ' + field);
    var oObj = document.getElementById(field);
    var oRadioObj = document.getElementsByName(field);
    var sReturnVal = '';
    if(oObj){  //verify object exists on page
	    switch (oObj.tagName){
		    case 'SELECT':
		    case 'TEXTAREA':
			    sReturnVal = escape(oObj.value);
			    break;
		    case 'INPUT':
			    switch (oObj.type){
				    case 'checkbox':
				    case 'radio':
		                nChildren = oRadioObj.length;
		                ndx = 0;
		                for (ndx; ndx < nChildren; ndx++){
					        if (oRadioObj[ndx].checked){
					            if (sReturnVal ==''){
							        sReturnVal = escape(oRadioObj[ndx].value);
					            } else {
							        sReturnVal = escape(oRadioObj[ndx].value);
					            }
					        }
					    }
					    break;
				    case 'text':
				    case 'password':
				    case 'hidden':
					    sReturnVal = escape(oObj.value);
					    break
				    default:
					    //No other types are supports
					    break;	
			    }
			    break;
		    default:
			    //No other types are supports
			    break;
	    }
	}else{
        if(oRadioObj){
            nChildren = oRadioObj.length;
            ndx = 0;
            for (ndx; ndx < nChildren; ndx++){
		        if (oRadioObj[ndx].checked){
		            if (sReturnVal ==''){
				        sReturnVal = escape(oRadioObj[ndx].value);
		            } else {
				        sReturnVal = sReturnVal + "|" + escape(oRadioObj[ndx].value);
		            }
		        }
		    }
        }
	}
	return sReturnVal;
}

function setFormValue(field,value){
    var oObj = document.getElementById(field);
    var oRadioObj = document.getElementsByName(field);
    if(oObj){  //verify object exists on page
	    switch (oObj.tagName){
		    case 'SELECT':
		    case 'TEXTAREA':
			    oObj.value = value;
			    break;
		    case 'INPUT':
			    switch (oObj.type){
				    case 'checkbox':
		                nChildren = oRadioObj.length;
		                ndx = 0;
		                nValues = value.split('|')
		                    for (ndx; ndx < nChildren; ndx++){
				                oRadioObj[ndx].checked = false;
		                        for ( var i = 0 ; i < nValues.length ; i++ ) {
		                            if (escape(oRadioObj[ndx].value) == nValues[i]){
					                    oRadioObj[ndx].checked = true;
					                }
					            }
					        }
					    break;
				    case 'radio':
		                nChildren = oRadioObj.length;
		                ndx = 0;
		                for (ndx; ndx < nChildren; ndx++){
		                    if (escape(oRadioObj[ndx].value) == value)
					            oRadioObj[ndx].checked = true;
					        else{
					            oRadioObj[ndx].checked = false;
					        }
					    }
					    break;
				    case 'text':
				    case 'password':
				    case 'hidden':
					    oObj.value = value;
					    break
				    default:
					    //No other types are supports
					    break;	
			    }
			    break;
		    default:
			    //No other types are supports
			    break;
	    }
	}else{
        nChildren = oRadioObj.length;
        ndx = 0;
        nValues = value.split('|')
            for (ndx; ndx < nChildren; ndx++){
                oRadioObj[ndx].checked = false;
                for ( var i = 0 ; i < nValues.length ; i++ ) {
                    if (escape(oRadioObj[ndx].value) == nValues[i]){
	                    oRadioObj[ndx].checked = true;
	                }
	            }
	        }
	}
}

var Url = {

	// public method for url encoding
	encode : function (string) {
		return escape(this._utf8_encode(string));
	},

	// public method for url decoding
	decode : function (string) {
		return this._utf8_decode(unescape(string));
	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
}

function setVerb(sDirection){
	try{
		//By default the action for the form is not set.
		//This will set the action with the correct verb
		var oForm = document.forms['form1'];
		var sAction = document.forms['form1'].elements['actionContinue'].value;

		oForm.action = sAction.replace('continue',sDirection);
		document.forms['form1'].elements['validNavigation'].value = '1';
	}
	catch(exception){
		//nothing to recover from - just don't error out the page
	}
}

function safeGetElementByID(field){
    //alert('safeGetElementByID for ' + field);
	try{
		if(document.getElementById(field)){
			return true;
		} else {
            return false;
		}
	}
	catch(exception){
		return false;
	}
}

function safeHideShowField(field, sVisibility){
    //alert('safeHideShowField for ' + field);
	try{
	    if (safeGetElementByID(field)){
	        var objField = document.getElementById(field);
		    if((objField) && (objField.style)){
			    objField.style.display = sVisibility;
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function safeSetClassNameProperty(field, style){
	try{
	    if (safeGetElementByID(field)){
	        var objField = document.getElementById(field);
		    if((objField) && (objField.className)){
			    objField.className = style;
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function setErrorClass(field){
	try{
	    if (safeGetElementByID(field)){
	        var objField = document.getElementById(field);
		    if((objField) && (objField.className)){
			    objField.className = objField.className + ' error';
		    }
	    } else {
            //error getting the element
            debugAlert('safeGetElementByID returned false for ' + field);
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function removeErrorClass(field){
	try{
	    if (safeGetElementByID(field)){
	        var objField = document.getElementById(field);
		    if((objField) && (objField.className)){
		        var objClass = objField.className.split(' ');
			    objField.className = objClass[0];
		    }
	    } else {
            //error getting the element
             debugAlert('safeGetElementByID returned false for ' + field);
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function debugAlert(message){
    if (queryString('debug') == 'true' || queryString('debug') == 'on' || queryString('debug') == '1'){alert(message);}
}

function safeSetTextByID(field, InsertThisText){
	try{
	    if (safeGetElementByID(field)){
            var Element=document.getElementById(field);
            if(Element.firstChild){
                Element.firstChild.nodeValue=InsertThisText;
            }else{
                Element.appendChild(document.createTextNode(InsertThisText));
            }
	    } else {
            //error getting the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function safeSetInnerHTMLByID(field, InsertThisHTML){
//alert('inside safeSetInnerHTMLByID');
	try{
	    if (safeGetElementByID(field)){
            var Element=document.getElementById(field);
                Element.innerHTML=InsertThisHTML;
	    } else {
            //error getting the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function safeGetInnerHTMLByID(field){
//alert('inside safeSetInnerHTMLByID');
	try{
	    if (safeGetElementByID(field)){
            var Element=document.getElementById(field);
                return Element.innerHTML;
	    } else {
            //error getting the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function safeRemoveID(ChildToRemove){
	try{
	    if (safeGetElementByID(ChildToRemove)){
            var Element=document.getElementById(ChildToRemove);
                Element.parentNode.removeChild(Element);
	    } else {
            //error getting the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function safeVisibilityField(field, sVisibility){
    //alert('safeHideShowField for ' + field);
	try{
	    if (safeGetElementByID(field)){
	        var objField = document.getElementById(field);
		    if((objField) && (objField.style)){
			    objField.style.visibility = sVisibility;
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ShowYahooQFAds(SearchTerms,PageURL){
//alert('inside ShowYahooQFAds');
    var ShowYahooQFAds = new sack();
    var AdvertisementsConstruct;
    var url = 'https://' + document.domain + '/common/AJAX_Responses.asp?AJAXRequestName=YahooQFAds&SearchTerms=' + SearchTerms + '&PageURL=' + PageURL;
    var oXmlHttp = createXMLHttp();
    oXmlHttp.open("get", url, true);
    oXmlHttp.onreadystatechange = function () {
        if (oXmlHttp.readyState == 4) {
            if (oXmlHttp.status == 200) {
                AdvertisementsConstruct = oXmlHttp.responseText;
                //alert(AdvertisementsXML);
                DisplayYahooQFAds(AdvertisementsConstruct);
            } else {
                debugAlert('An error occurred retrieving the Yahoo! advertisement XML' + '. ' + oXmlHttp.statusText);
            }
        }
    };
    oXmlHttp.send(null);
}

function DisplayYahooQFAds(AdvertisementsConstruct){
    var AdsArray = AdvertisementsConstruct.split(':||:');
    var Ad1 = AdsArray[0].split(':|:');
    var Title1 = Ad1[0];
    var Description1 = Ad1[1];
    var SiteHost1 = Ad1[2];
    var ClickURL1 = Ad1[3];

    var Ad2 = AdsArray[1].split(':|:');
    var Title2 = Ad2[0];
    var Description2 = Ad2[1];
    var SiteHost2 = Ad2[2];
    var ClickURL2 = Ad2[3];

    var Ad3 = AdsArray[2].split(':|:');
    var Title3 = Ad3[0];
    var Description3 = Ad3[1];
    var SiteHost3 = Ad3[2];
    var ClickURL3 = Ad3[3];

    var Ad4 = AdsArray[3].split(':|:');
    var Title4 = Ad4[0];
    var Description4 = Ad4[1];
    var SiteHost4 = Ad4[2];
    var ClickURL4 = Ad4[3];


    ShowYahooQFAds_top(Title1, Description1, ClickURL1, SiteHost1,Title2, Description2, ClickURL2, SiteHost2);
    ShowYahooQFAds_bottom(Title3, Description3, ClickURL3, SiteHost3,Title4, Description4, ClickURL4, SiteHost4);
}

function ShowYahooQFAds_top(Title1, Description1, ClickURL1, SiteHost1,Title2, Description2, ClickURL2, SiteHost2){
    var ads = '<div id="YahooAds_top">';
    ads = ads + '<div class="YahooAd_sponsor">SPONSOR RESULTS</div>';
    ads = ads + '<div class="YahooAd_wrapper"><a rel="nofollow" href="' + ClickURL1 + '" class="YahooAd_HeaderLink" target="_new">' + Title1 + '</a><br/><p class="YahooAd_keywords">' + Description1 + '</p><p class="YahooAd_siteURL">' + SiteHost1 + '</p></div>';
    ads = ads + '<div class="YahooAd_wrapper"><a rel="nofollow" href="' + ClickURL2 + '" class="YahooAd_HeaderLink" target="_new">' + Title2 + '</a><br/><p class="YahooAd_keywords">' + Description2 + '</p><p class="YahooAd_siteURL">' + SiteHost2 + '</p></div>';
    ads = ads + '</div>';
    var contentInnerHTML = safeGetInnerHTMLByID('content');
    ads = ads + contentInnerHTML;
    safeSetInnerHTMLByID('content',ads)
}

function ShowYahooQFAds_bottom(Title3, Description3, ClickURL3, SiteHost3,Title4, Description4, ClickURL4, SiteHost4){
    var ads = '<div id="YahooAds_bottom">';
    ads = ads + '<div class="YahooAd_sponsor">SPONSOR RESULTS</div>';
    ads = ads + '<div class="YahooAd_wrapper"><a rel="nofollow" href="' + ClickURL3 + '" class="YahooAd_HeaderLink" target="_new">' + Title3 + '</a><br/><p class="YahooAd_keywords">' + Description3 + '</p><p class="YahooAd_siteURL">' + SiteHost3 + '</p></div>';
    ads = ads + '<div class="YahooAd_wrapper"><a rel="nofollow" href="' + ClickURL4 + '" class="YahooAd_HeaderLink" target="_new">' + Title4 + '</a><br/><p class="YahooAd_keywords">' + Description4 + '</p><p class="YahooAd_siteURL">' + SiteHost4 + '</p></div>';
    ads = ads + '</div>';
    var continueInnerHTML = safeGetInnerHTMLByID('continue');
    ads = continueInnerHTML + ads;
    safeSetInnerHTMLByID('continue',ads)
}

function getYahooQFAds(){
}

function validateZipCode(message_id,firetime,ZipField,StateField,CountyField,CityField){
    var validateZipCode = new sack();
    
    var url = 'https://' + document.domain + '/common/AJAX_Responses.asp?AJAXRequestName=CityStateCountyByZIP&Zip=' + getFormValue(ZipField);
    
    if (getFormValue(ZipField).length == 5){
        safeSetTextByID(message_id,'validating...');
        var oXmlHttp = createXMLHttp();
        oXmlHttp.open("get", url, true);
        oXmlHttp.onreadystatechange = function () {
            if (oXmlHttp.readyState == 4) {
                if (oXmlHttp.status == 200) {
                    var message = oXmlHttp.responseText;
                    var messagesArray = message.split(":");
                    //Error (0=no, 1=yes):StateId:StateAbbreviation:City:County
                    if (messagesArray[0] == '1'){
                        setErrorClass(message_id);
                        safeSetTextByID(message_id,'Invalid ZIP code');
                        setFormValue(StateField,'');
                        setFormValue(CountyField,'');
                        setFormValue(CityField,'');
                    }else {
                        removeErrorClass(message_id);
                        setFormValue(StateField,messagesArray[1]);
                        setFormValue(CountyField,messagesArray[4]);
                        setFormValue(CityField,messagesArray[3]);
                        safeSetTextByID(message_id,messagesArray[3] + ', ' + messagesArray[2] + ' ' + getFormValue(ZipField));
                        CheckPropStateEligibility();
                    }
                    
                    return;
                } else {
                    debugAlert('An error occurred determining the the State and County for ZipCode ' + '. ' + oXmlHttp.statusText);
                }
            }
        };
        oXmlHttp.send(null);
    } else if (getFormValue(ZipField).length > 0 && firetime == 'onChange'){
        setErrorClass(message_id);
        safeSetTextByID(message_id,'Invalid ZIP code');
        setFormValue(StateField,'');
        setFormValue(CountyField,'');
        setFormValue(CityField,'');
    }
}

function validateZipCode_lender(message_id,firetime,ZipField,StateField,CountyField,CityField,optional){
    var validateZipCode_lender = new sack();
    
    var url = window.document.location.protocol + '//' + document.domain + '/common/AJAX_Responses.asp?AJAXRequestName=CityStateCountyByZIP&Zip=' + getFormValue(ZipField);
    
    if (getFormValue(ZipField).length == 5){
        safeSetTextByID(message_id,'validating...');
        var oXmlHttp = createXMLHttp();
        oXmlHttp.open("get", url, true);
        oXmlHttp.onreadystatechange = function () {
            if (oXmlHttp.readyState == 4) {
                if (oXmlHttp.status == 200) {
                    var message = oXmlHttp.responseText;
                    var messagesArray = message.split(":");
                    //Error (0=no, 1=yes):StateId:StateAbbreviation:City:County
                    if (messagesArray[0] == '1'){
                        setErrorClass(message_id);
                        safeSetTextByID(message_id,'Invalid ZIP code');
                        setFormValue(StateField,'');
                        setFormValue(CountyField,'');
                        setFormValue(CityField,'');
                    }else {
                        removeErrorClass(message_id);
                        if (optional == 'undefined') {
                            setFormValue(StateField,messagesArray[1]);
                        }else {
                            setFormValue(StateField,messagesArray[2]);
                        }
                        setFormValue(CountyField,messagesArray[4]);
                        setFormValue(CityField,messagesArray[3]);
                        safeSetTextByID(message_id,messagesArray[3] + ', ' + messagesArray[2] + ' ' + getFormValue(ZipField));
                        if (optional == 'undefined') {
                            CheckPropStateEligibility();
                        }
                    }
                    
                    return;
                } else {
                    debugAlert('An error occurred determining the the State and County for ZipCode ' + '. ' + oXmlHttp.statusText);
                }
            }
        };
        oXmlHttp.send(null);
    } else if (getFormValue(ZipField).length > 0 && firetime == 'onChange'){
        setErrorClass(message_id);
        safeSetTextByID(message_id,'Invalid ZIP code');
        setFormValue(StateField,'');
        setFormValue(CountyField,'');
        setFormValue(CityField,'');
    }
}

function showAutoQuestions()
{
	try{
		
		// if not refinancing the vehicle or not buying out the lease
		if (
			((document.form1.AUTO_OWNERSHIP_TYPE_CONST) && (document.form1.AUTO_OWNERSHIP_TYPE_CONST.value != '4')) || 
			((document.form1.AUTO_PURCHASE_FROM_CONST) && (document.form1.AUTO_PURCHASE_FROM_CONST.value != '5')))
		{
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-PURCHASE_FROM', '');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', '');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', '');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', '');	
		}
		else{
		}
		
		// if no loan type (ownership_type_const) selected or no dealer (purchase_from_const) selected
		if (
			((document.form1.AUTO_OWNERSHIP_TYPE_CONST) && (document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '00')) || 
			((document.form1.AUTO_PURCHASE_FROM_CONST) && (document.form1.AUTO_PURCHASE_FROM_CONST.value == '00')))
		{
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', 'none');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');			
			safeHideShowField('QUESTION_LINE-AUTO_VIN', 'none');
			safeHideShowField('QUESTION_LINE-NEW_OR_USED', 'none');
		}	
		
		// if buying the auto or buying the motorcycle	
		if((document.form1.AUTO_OWNERSHIP_TYPE_CONST) && 
			(document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '1' || document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '6'))
		{
			// If buying the vehicle from a dealer or "undecided"
			if((document.form1.AUTO_PURCHASE_FROM_CONST) &&
				(document.form1.AUTO_PURCHASE_FROM_CONST.value == '2') || (document.form1.AUTO_PURCHASE_FROM_CONST.value == '3'))
			{
				// If buying a motorcycle	
				if (document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '6')
				{
					document.form1.AUTO_MAKE_CONST.value = '101';
				}
				// user is buying a car
				else {
					document.form1.AUTO_MAKE_CONST.value = '1';
				}
				document.form1.AUTO_MODEL.value = 'NA';
				
				// Transfer the amount the user needs to borrow to the appropriate fields
				if (document.form1.AMT_REQ.value == "")
				{
					document.form1.AUTO_LIST_PRICE.value = '0';
					document.form1.AUTO_PURCHASE_PRICE.value = '0';
				}else {
					document.form1.AUTO_LIST_PRICE.value = document.form1.AMT_REQ.value;
					document.form1.AUTO_PURCHASE_PRICE.value = document.form1.AMT_REQ.value;
				}
				
				document.form1.AUTO_MILEAGE.value = '0';
				document.form1.AUTO_VEHICLE_TYPE_CONST[1].checked = false;
				document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
				
				
				safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
				safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('AUTO_VIN_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
				safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
				safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', '');
				safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', '');
				
				safeHideShowField('AUTO_MAKE_CONST_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_MAKE_CONST_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_MAKE_CONST_HIDE_ERROR_MSG', 'none');
				safeHideShowField('AUTO_YEAR_HIDE_QTEXT', '');
				safeHideShowField('AUTO_YEAR_HIDE_ELEMENT', '');
				safeHideShowField('AUTO_YEAR_HIDE_ERROR_MSG', '');
				safeHideShowField('AUTO_MODEL_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_MODEL_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_MODEL_HIDE_ERROR_MSG', 'none');
				safeHideShowField('AUTO_MILEAGE_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_MILEAGE_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_MILEAGE_HIDE_ERROR_MSG', 'none');
				safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
				
				
				safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_QINFO_ELEMENT', '');
				
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
				safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
				safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
				safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');
				safeHideShowField('QUESTION_LINE-AUTO_VIN', 'none');
				safeHideShowField('QUESTION_LINE-NEW_OR_USED', '');
				
				safeHideShowField('QUESTION_LINE-AUTO_MAKE', 'none');
				safeHideShowField('QUESTION_LINE-AUTO_YEAR', '');
				safeHideShowField('QUESTION_LINE-AUTO_MODEL', 'none');
				safeHideShowField('QUESTION_LINE-AUTO_MILEAGE', 'none');
				safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
				
			}
			
			// If buying from and Individual
			if(document.form1.AUTO_PURCHASE_FROM_CONST.value == '1')
			{
				document.form1.AUTO_MAKE_CONST.value = '00';
				document.form1.AUTO_MODEL.value = "";
				document.form1.AUTO_MILEAGE.value = "";
				if (document.form1.AMT_REQ.value == "")
				{
					document.form1.AUTO_PURCHASE_PRICE.value = '0';
				}else {
					document.form1.AUTO_PURCHASE_PRICE.value = document.form1.AMT_REQ.value;
				}
				document.form1.AUTO_LIST_PRICE.value = '0';
				document.form1.AUTO_VEHICLE_TYPE_CONST[1].checked = true;
				document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
				safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
				safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('AUTO_VIN_HIDE_ELEMENT', '');
				safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', '');
				safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
				safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
				safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
				
				safeHideShowField('AUTO_MAKE_CONST_HIDE_QTEXT', '');
				safeHideShowField('AUTO_MAKE_CONST_HIDE_ELEMENT', '');
				safeHideShowField('AUTO_MAKE_CONST_HIDE_ERROR_MSG', '');
				safeHideShowField('AUTO_YEAR_HIDE_QTEXT', '');
				safeHideShowField('AUTO_YEAR_HIDE_ELEMENT', '');
				safeHideShowField('AUTO_YEAR_HIDE_ERROR_MSG', '');
				safeHideShowField('AUTO_MODEL_HIDE_QTEXT', '');
				safeHideShowField('AUTO_MODEL_HIDE_ELEMENT', '');
				safeHideShowField('AUTO_MODEL_HIDE_ERROR_MSG', '');
				safeHideShowField('AUTO_MILEAGE_HIDE_QTEXT', '');
				safeHideShowField('AUTO_MILEAGE_HIDE_ELEMENT', '');
				safeHideShowField('AUTO_MILEAGE_HIDE_ERROR_MSG', '');
				safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
				safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
				
				safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_QINFO_ELEMENT', 'none');	
				
				
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
				safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
				safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
				safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');	
				safeHideShowField('QUESTION_LINE-AUTO_VIN', '');
				safeHideShowField('QUESTION_LINE-NEW_OR_USED', 'none');
				
				safeHideShowField('QUESTION_LINE-AUTO_MAKE', '');
				safeHideShowField('QUESTION_LINE-AUTO_YEAR', '');
				safeHideShowField('QUESTION_LINE-AUTO_MODEL', '');
				safeHideShowField('QUESTION_LINE-AUTO_MILEAGE', '');
				safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
				safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
			}		
		}
		
		// if refinancing the vehicle or buying out the lease
		if ((document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '4') || document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '5')
		{
			document.form1.AUTO_MAKE_CONST.value = '00';
			document.form1.AUTO_MODEL.value = "";
			document.form1.AUTO_MILEAGE.value = "";
				if (document.form1.AMT_REQ.value == "")
				{
					document.form1.AUTO_PURCHASE_PRICE.value = '0';
				}else {
					document.form1.AUTO_PURCHASE_PRICE.value = document.form1.AMT_REQ.value;
				}
			document.form1.AUTO_LIST_PRICE.value = '0';
			document.form1.AUTO_VEHICLE_TYPE_CONST[1].checked = true;
			document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
			document.form1.AUTO_PURCHASE_FROM_CONST.value = '3';
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			
			safeHideShowField('AUTO_MAKE_CONST_HIDE_QTEXT', '');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_YEAR_HIDE_QTEXT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_MODEL_HIDE_QTEXT', '');
			safeHideShowField('AUTO_MODEL_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_MODEL_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_MILEAGE_HIDE_QTEXT', '');
			safeHideShowField('AUTO_MILEAGE_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_MILEAGE_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
			
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_QINFO_ELEMENT', 'none');
			
			
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-PURCHASE_FROM', 'none');
			safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', '');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', '');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', '');	
			
			safeHideShowField('QUESTION_LINE-AUTO_VIN', '');
			safeHideShowField('QUESTION_LINE-NEW_OR_USED', 'none');
			
			safeHideShowField('QUESTION_LINE-AUTO_MAKE', '');
			safeHideShowField('QUESTION_LINE-AUTO_YEAR', '');
			safeHideShowField('QUESTION_LINE-AUTO_MODEL', '');
			safeHideShowField('QUESTION_LINE-AUTO_MILEAGE', '');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
			
		}
		if (document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '2')
		{
			document.form1.AUTO_MAKE_CONST.value = '1';
			document.form1.AUTO_MODEL.value = 'NA';
			if (document.form1.AMT_REQ.value == "")
			{
				document.form1.AUTO_LIST_PRICE.value = '0';
				document.form1.AUTO_PURCHASE_PRICE.value = '0';
			}else {
				document.form1.AUTO_LIST_PRICE.value = document.form1.AMT_REQ.value;
				document.form1.AUTO_PURCHASE_PRICE.value = document.form1.AMT_REQ.value;
			}
			document.form1.AUTO_VEHICLE_TYPE_CONST[1].checked = false;
			document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
			document.form1.AUTO_PURCHASE_FROM_CONST.value = '2';
			document.form1.AUTO_MILEAGE.value = '0';
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', '');
			
			safeHideShowField('AUTO_MAKE_CONST_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_YEAR_HIDE_QTEXT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_MODEL_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_MODEL_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_MODEL_HIDE_ERROR_MSG', 'none');
			safeHideShowField('AUTO_MILEAGE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_MILEAGE_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_MILEAGE_HIDE_ERROR_MSG', 'none');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
			
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_QINFO_ELEMENT', '');
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-PURCHASE_FROM', 'none');
			safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');	
			
			safeHideShowField('QUESTION_LINE-AUTO_VIN', 'none');
			safeHideShowField('QUESTION_LINE-NEW_OR_USED', '');
			
			safeHideShowField('QUESTION_LINE-AUTO_MAKE', 'none');
			safeHideShowField('QUESTION_LINE-AUTO_YEAR', '');
			safeHideShowField('QUESTION_LINE-AUTO_MODEL', 'none');
			safeHideShowField('QUESTION_LINE-AUTO_MILEAGE', 'none');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
			
		}				
		
	}catch(exception){
		//nothing to recover from - just don't error out the page
	}
}



function customize_auto_pageLoaded()
{
	try{
	
		if ((document.form1.AUTO_OWNERSHIP_TYPE_CONST.value != '4') || (document.form1.AUTO_PURCHASE_FROM_CONST.value != '5'))
		{
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-PURCHASE_FROM', '');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', '');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', '');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', '');	
		
		}
		if ((document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '00') || (document.form1.AUTO_PURCHASE_FROM_CONST.value == '00'))
		{
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');				
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', 'none');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');	
			safeHideShowField('QUESTION_LINE-AUTO_VIN', 'none');
			safeHideShowField('QUESTION_LINE-NEW_OR_USED', 'none');
			
			
		}else {			
			if((document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '1') || (document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '6'))
			{
				if((document.form1.AUTO_PURCHASE_FROM_CONST.value == '2') || (document.form1.AUTO_PURCHASE_FROM_CONST.value == '3'))
				{
					if (document.form1.AMT_REQ.value == "")
					{
						document.form1.AUTO_LIST_PRICE.value = '0';
						document.form1.AUTO_PURCHASE_PRICE.value = '0';
					}else {
						document.form1.AUTO_LIST_PRICE.value = document.form1.AMT_REQ.value;
						document.form1.AUTO_PURCHASE_PRICE.value = document.form1.AMT_REQ.value;
					}
					document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
					
					safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
					safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
					safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
					safeHideShowField('AUTO_VIN_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', 'none');
					safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
					safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
					safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', '');
					safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', '');
					
					safeHideShowField('AUTO_MAKE_CONST_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_MAKE_CONST_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_MAKE_CONST_HIDE_ERROR_MSG', 'none');
					safeHideShowField('AUTO_YEAR_HIDE_QTEXT', '');
					safeHideShowField('AUTO_YEAR_HIDE_ELEMENT', '');
					safeHideShowField('AUTO_YEAR_HIDE_ERROR_MSG', '');
					safeHideShowField('AUTO_MODEL_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_MODEL_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_MODEL_HIDE_ERROR_MSG', 'none');
					safeHideShowField('AUTO_MILEAGE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_MILEAGE_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_MILEAGE_HIDE_ERROR_MSG', 'none');
					safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
					
					safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_QINFO_ELEMENT', '');
					
					/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
					    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
					    are removed from production.
					*/
				
					safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');	
					safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
					safeHideShowField('QUESTION_LINE-AUTO_VIN', 'none');
					safeHideShowField('QUESTION_LINE-NEW_OR_USED', '');
					
					safeHideShowField('QUESTION_LINE-AUTO_MAKE', 'none');
					safeHideShowField('QUESTION_LINE-AUTO_YEAR', '');
					safeHideShowField('QUESTION_LINE-AUTO_MODEL', 'none');
					safeHideShowField('QUESTION_LINE-AUTO_MILEAGE', 'none');
					safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
					
				}
				
				if (document.form1.AUTO_PURCHASE_FROM_CONST.value == '1')
				{
					if (document.form1.AMT_REQ.value == "")
					{
						document.form1.AUTO_LIST_PRICE.value = '0';
						document.form1.AUTO_PURCHASE_PRICE.value = '0';
					}else {
						document.form1.AUTO_LIST_PRICE.value = '0';
						document.form1.AUTO_PURCHASE_PRICE.value = document.form1.AMT_REQ.value;
					}
					document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
					
					safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
					safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
					safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
					safeHideShowField('AUTO_VIN_HIDE_ELEMENT', '');
					safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', '');
					safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
					safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
					safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
					safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
					
					/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
					    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
					    are removed from production.
					*/
					safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');	
					
					safeHideShowField('QUESTION_LINE-AUTO_VIN', '');
					safeHideShowField('QUESTION_LINE-NEW_OR_USED', 'none');
					safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
					safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
					safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
				}		
			}
		}
		if ((document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '4') || document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '5')
		{
			document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
			
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			
			safeHideShowField('AUTO_MAKE_CONST_HIDE_QTEXT', '');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_YEAR_HIDE_QTEXT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_MODEL_HIDE_QTEXT', '');
			safeHideShowField('AUTO_MODEL_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_MODEL_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_MILEAGE_HIDE_QTEXT', '');
			safeHideShowField('AUTO_MILEAGE_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_MILEAGE_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
			
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_QINFO_ELEMENT', 'none');
			
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-PURCHASE_FROM', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', '');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', '');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', '');	
			
			safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
			safeHideShowField('QUESTION_LINE-AUTO_VIN', '');
			safeHideShowField('QUESTION_LINE-NEW_OR_USED', 'none');
			
			safeHideShowField('QUESTION_LINE-AUTO_MAKE', '');
			safeHideShowField('QUESTION_LINE-AUTO_YEAR', '');
			safeHideShowField('QUESTION_LINE-AUTO_MODEL', '');
			safeHideShowField('QUESTION_LINE-AUTO_MILEAGE', '');
			
		}				
		if (document.form1.AUTO_OWNERSHIP_TYPE_CONST.value == '2')
		{
			document.form1.AUTO_TRADE_IN_CONST[1].checked = true;
						
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_FROM_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT', 'none');
			safeHideShowField('CURRENT_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_TRADE_IN_CONST_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_VIN_HIDE_ELEMENT_SPACER_ROW', 'none');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT', '');
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_ELEMENT_SPACER_ROW', '');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_VEHICLE_TYPE_CONST_HIDE_ELEMENT_SPACER_ROW', '');
			
			safeHideShowField('AUTO_MAKE_CONST_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_MAKE_CONST_HIDE_ERROR_MSG', 'none');
			safeHideShowField('AUTO_YEAR_HIDE_QTEXT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ELEMENT', '');
			safeHideShowField('AUTO_YEAR_HIDE_ERROR_MSG', '');
			safeHideShowField('AUTO_MODEL_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_MODEL_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_MODEL_HIDE_ERROR_MSG', 'none');
			safeHideShowField('AUTO_MILEAGE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_MILEAGE_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_MILEAGE_HIDE_ERROR_MSG', 'none');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_LIST_PRICE_HIDE_ELEMENT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_QTEXT', 'none');
			safeHideShowField('AUTO_PURCHASE_PRICE_HIDE_ELEMENT', 'none');
			
			safeHideShowField('DESIRED_VEHICLE_INFO_HIDE_QINFO_ELEMENT', '');
			
			/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    are removed from production.
			*/
			safeHideShowField('QUESTION_LINE-PURCHASE_FROM', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_LENDER_NAME', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_PAYMENT', 'none');
			safeHideShowField('QUESTION_LINE-CURRENT_INTEREST_RATE', 'none');	
			safeHideShowField('QUESTION_LINE-TRADE_IN', 'none');
			safeHideShowField('QUESTION_LINE-AUTO_VIN', 'none');
			safeHideShowField('QUESTION_LINE-NEW_OR_USED', '');
			safeHideShowField('QUESTION_LINE-AUTO_MAKE', 'none');
			safeHideShowField('QUESTION_LINE-AUTO_YEAR', '');
			safeHideShowField('QUESTION_LINE-AUTO_MODEL', 'none');
			safeHideShowField('QUESTION_LINE-AUTO_MILEAGE', 'none');
			
		}				
		
	
	}
	catch(exception){
		//no handling - just preventing page explosions
	}
}

function borrower_info_auto_pageLoaded()
{
	try{
		//On the initial page load, we don't want to show the previous address info
		//In this case, the residence length input fields will be empty 
		if(document.form1.ADDR_RES_LENGTH_BO){
			var boResLength =  document.form1.ADDR_RES_LENGTH_BO.value.length;
				
			if (boResLength == 0){
				safeHideShowField('ADDR_PREV_BO_HIDE_ELEMENT', 'none');
			}
		}
		if(document.form1.ADDR_RES_LENGTH_CO){
			var coResLength =  document.form1.ADDR_RES_LENGTH_CO.value.length;
				
			if (coResLength == 0){
				safeHideShowField('ADDR_PREV_CO_HIDE_ELEMENT', 'none');
			}
		}
	}
	catch(exception){
		//do nothing
	}
}


function employer_info_auto_pageLoaded()
{
	try{
		//On the initial page load, we don't want to show the previous employer info
		//In this case, the residence length input fields will be empty 
		if(document.form1.EMP_LEN_CURRENT_BO){
			var boResLength =  document.form1.EMP_LEN_CURRENT_BO.value.length;
				
			if (boResLength == 0){
				safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT', 'none');
				safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT', 'none');
				safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT', 'none');
				safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
			}
		}
		if(document.form1.EMP_LEN_CURRENT_CO){
			var coResLength =  document.form1.EMP_LEN_CURRENT_CO.value.length;
				
			if (coResLength == 0){
				safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT', 'none');
				safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT', 'none');
				safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
				safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT', 'none');
				safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
			}
		}
	}
	catch(exception){
		//do nothing
	}
}


function showPreviousResidence()
{
	try{
		if((document.form1.ADDR_RES_FREQ_BO) && (document.form1.ADDR_RES_FREQ_BO.value == '1'))
		{
			if((document.form1.ADDR_RES_LENGTH_BO) && (document.form1.ADDR_RES_LENGTH_BO.value < 24) && (document.form1.ADDR_RES_LENGTH_BO.value != ''))
			{
				safeHideShowField('ADDR_PREV_BO_HIDE_ELEMENT', '');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_BO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_CITY_BO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_STATE_BO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ZIP_BO', '');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_BO', '');
			}else {
				safeHideShowField('ADDR_PREV_BO_HIDE_ELEMENT', 'none');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_BO', 'none');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_BO', 'none');
			}		
		} else {
			if((document.form1.ADDR_RES_LENGTH_BO) && (document.form1.ADDR_RES_LENGTH_BO.value < 2) && (document.form1.ADDR_RES_LENGTH_BO.value != ''))
			{
				safeHideShowField('ADDR_PREV_BO_HIDE_ELEMENT', '');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_BO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_CITY_BO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_STATE_BO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ZIP_BO', '');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_BO', '');
			}else {
				safeHideShowField('ADDR_PREV_BO_HIDE_ELEMENT', 'none');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_BO', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_CITY_BO', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_STATE_BO', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ZIP_BO', 'none');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_BO', 'none');
			}		
		}
		if((document.form1.ADDR_RES_FREQ_CO) && (document.form1.ADDR_RES_FREQ_CO.value == '1'))
		{
			if((document.form1.ADDR_RES_LENGTH_CO) && (document.form1.ADDR_RES_LENGTH_CO.value < 24) && (document.form1.ADDR_RES_LENGTH_CO.value != ''))
			{
				safeHideShowField('ADDR_PREV_CO_HIDE_ELEMENT', '');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR1_CO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_CITY', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_STATE', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_ZIP', '');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_CO', '');
			}else {
				safeHideShowField('ADDR_PREV_CO_HIDE_ELEMENT', 'none');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR1_CO', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_CITY', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_STATE', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_ZIP', 'none');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_CO', 'none');
			}		
		} else {
			if((document.form1.ADDR_RES_LENGTH_CO) && (document.form1.ADDR_RES_LENGTH_CO.value < 2) && (document.form1.ADDR_RES_LENGTH_CO.value != ''))
			{
				safeHideShowField('ADDR_PREV_CO_HIDE_ELEMENT', '');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR1_CO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_CITY', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_STATE', '');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_ZIP', '');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_CO', '');
			}else {
				safeHideShowField('ADDR_PREV_CO_HIDE_ELEMENT', 'none');
				/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
				    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
				    are removed from production.
				*/
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR1_CO', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_CITY', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_STATE', 'none');
				safeHideShowField('QUESTION_LINE-PREVIOUS_ADDR_CO_ZIP', 'none');
				safeHideShowField('QUESTION_LINE-TIME_AT_PREVIOUS_ADDR_CO', 'none');
			}		
		}
	}
	catch(exception){
		//no handling - just preventing page explosions
	}
}

function showOtherIncome(borrower)
{
	try
	{
		//Borrower logic
		if (borrower == "BO") {
			if (document.form1.EMP_OTHER_INC_BO){
				var iNumBO = removeStr(document.form1.EMP_OTHER_INC_BO.value);
				if(iNumBO > 0)
				{
					//otherIncome.style.display = "block";
					safeHideShowField('EMP_OTHER_INC_SOURCE_BO_HIDE_ELEMENT', '');
					safeHideShowField('EMP_OTHER_INC_SOURCE_BO_HIDE_ELEMENT_SPACER_ROW', '');
				} else {
					//otherIncome.style.display = "none";
					safeHideShowField('EMP_OTHER_INC_SOURCE_BO_HIDE_ELEMENT', 'none');
					safeHideShowField('EMP_OTHER_INC_SOURCE_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
					document.form1.EMP_OTHER_INC_SOURCE_BO.value = "";
				}
			}
		}
		//Co-borrower logic
		else {
			if (document.form1.EMP_OTHER_INC_CO){
				var iNumCO = removeStr(document.form1.EMP_OTHER_INC_CO.value);
				if(iNumCO > 0)
				{
					//otherIncomeCO.style.display = "block";
					safeHideShowField('EMP_OTHER_INC_SOURCE_CO_HIDE_ELEMENT', '');
					safeHideShowField('EMP_OTHER_INC_SOURCE_CO_HIDE_ELEMENT_SPACER_ROW', '');
				} else {
					//otherIncomeCO.style.display = "none";
					safeHideShowField('EMP_OTHER_INC_SOURCE_CO_HIDE_ELEMENT', 'none');
					safeHideShowField('EMP_OTHER_INC_SOURCE_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
					document.form1.EMP_OTHER_INC_SOURCE_CO.value = "";
				}
			}
		}
	}
	catch(exception){
		// do nothing
	}
}

function showPreviousEmployer(borrower)
{
	try
	{
		// Borrower logic
		if (borrower == "BO") {
			if((document.form1.EMP_TME_UNIT_CURRENT_BO_CONST) && (document.form1.EMP_TME_UNIT_CURRENT_BO_CONST.value == '1'))
			{
				if(document.form1.EMP_LEN_CURRENT_BO){
					if((document.form1.EMP_LEN_CURRENT_BO.value < 24) && (document.form1.EMP_LEN_CURRENT_BO.value != ''))
					{
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT_SPACER_ROW', '');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_BO', '');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_BO', '');
						
					}else {
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_BO', 'none');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_BO', 'none');	
					}
				}		
			} else {
				if(document.form1.EMP_LEN_CURRENT_BO){	
					if((document.form1.EMP_LEN_CURRENT_BO.value < 2) && (document.form1.EMP_LEN_CURRENT_BO.value != ''))
					{
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT_SPACER_ROW', '');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_BO', '');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_BO', '');
					}else {
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_NME_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_LEN_PREV_BO_HIDE_ELEMENT_SPACER_ROW', 'none');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_BO', 'none');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_BO', 'none');
					}
				}		
			}
		}
		// Co-borrower logic
		else {
			if((document.form1.EMP_TME_UNIT_CURRENT_CO_CONST) && (document.form1.EMP_TME_UNIT_CURRENT_CO_CONST.value == '1'))
			{
				if(document.form1.EMP_LEN_CURRENT_CO){
					if((document.form1.EMP_LEN_CURRENT_CO.value < 24) && (document.form1.EMP_LEN_CURRENT_CO.value != ''))
					{
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT_SPACER_ROW', '');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_CO', '');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_CO', '');
					}else {
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_CO', 'none');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_CO', 'none');
					}
				}		
			} else {
				if(document.form1.EMP_LEN_CURRENT_CO){
					if((document.form1.EMP_LEN_CURRENT_CO.value < 2) && (document.form1.EMP_LEN_CURRENT_CO.value != ''))
					{
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT_SPACER_ROW', '');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT', '');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT_SPACER_ROW', '');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_CO', '');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_CO', '');
					}else {
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_NME_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_JOB_TITLE_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT', 'none');
						safeHideShowField('EMP_LEN_PREV_CO_HIDE_ELEMENT_SPACER_ROW', 'none');
						
						/*  Adding these safeHideShowField calls for the updated look/feel.  We should remove the ones
			  			    above this comment line as soon as Automobile Versions 3, 4, and 5 (yellow/maroon old look) 
			    			    are removed from production.
						*/
						safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_CO', 'none');
						safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_CO', 'none');
					}
				}		
			}
		}	
	}
	catch(exception){
	}
}

function calculateIncome(unit, borrower)
{
	try{
		var salaryAmount = "";
		var otherAmount = "";
	
		if (borrower == "BO" && 
			(document.form1.EMP_SALARY_CURRENT_BO && document.form1.EMP_OTHER_INC_BO)) {
			salaryAmount = removeStr(document.form1.EMP_SALARY_CURRENT_BO.value);
			otherAmount = removeStr(document.form1.EMP_OTHER_INC_BO.value);
		}
		
		else if((document.form1.EMP_SALARY_CURRENT_CO) && (document.form1.EMP_OTHER_INC_CO)) {
			salaryAmount = removeStr(document.form1.EMP_SALARY_CURRENT_CO.value);
			otherAmount = removeStr(document.form1.EMP_OTHER_INC_CO.value);
		}
	
		if (unit){
			var itemp;
			itemp = removeStr(unit.value);
			unit.value = format(itemp, '', ',');
		}
		
		
		var btotalAmount;
		
		
		if (isNaN(salaryAmount) || salaryAmount == "") {
			salaryAmount = 0;
		}
		if (isNaN(otherAmount) || otherAmount == "") {
			otherAmount = 0;
		}
	
		btotalAmount = eval(salaryAmount) + eval(otherAmount);	
	
		if (isNaN(btotalAmount)) {
			bTotalAmount = "UNKNOWN NUMBER";
		}
		else {
			if ((borrower == "BO") && (document.form1.TOTAL_INCOME_BO)) {
				document.form1.TOTAL_INCOME_BO.value = format(btotalAmount, '', ',');
			}
			else if (document.form1.TOTAL_INCOME_CO) {
				document.form1.TOTAL_INCOME_CO.value = format(btotalAmount, '', ',');
			}
		}
	}
	catch(exception){
		// do nothing - just don't error on page
	}
}



function loanPurpose_onchange()
{	try{	
		var i;
		var opt;
		var iSel;
		var state;
	
		var selAMT_REQ = document.forms["form1"].AMT_REQ;
		var selHiddenSelect = document.forms["form1"].selHiddenSelect;
		var selLOAN_TYPE = document.forms["form1"].LOAN_TYPE;
		
		for (i=selAMT_REQ.options.length-1;i>0;i--)
		{
			selAMT_REQ.remove(i);
		}
			
		iSel = selLOAN_TYPE.selectedIndex;
		state= selLOAN_TYPE.options[iSel].getAttribute('short');
		
		if (state!='') 
		{
			for (i=0;i<selHiddenSelect.length;i++) 
			{
				if (selHiddenSelect.options[i].value.substring(0,2)==state) 
				{
					opt=document.createElement("OPTION");
					opt.value=selHiddenSelect.options[i].value.substring(2);
					opt.text=selHiddenSelect.options[i].text;	
					try {
						selAMT_REQ.add(opt);	//this is the IE-acceptable format
					}
					catch(ex) {
						document.forms["form1"].AMT_REQ.add(opt,selAMT_REQ.options[selAMT_REQ.length]); //this is the mozilla-acceptable format
					}
				}
			}
			selAMT_REQ.selectedIndex=0;
		}
		opt=null;
		
		if (arguments.length>0) {
			var cbsa=arguments[0];
			for (i=2;i<selAMT_REQ.options.length;i++) {
				if (selAMT_REQ.options[i].value==cbsa) {
					selAMT_REQ.selectedIndex=i;
					break;
				}
			}
		}
		opt=null;
	}
	catch(exception){
		// do nothing
	}	
}	


function hideShowEmploymentFields(borrower)
{
	try
	{
	
		var employementStatus
	
		//Borrower logic
		if (borrower == "BO") {
			if (document.form1.EMPLOYMENT_STATUS_BO_CONST){
				employementStatus = document.form1.EMPLOYMENT_STATUS_BO_CONST.value;
				//show the fields if there is a status of 1(full time) or 2 (part time)
				//for all other values, hide the fields
				if(employementStatus < 4)
				{
					safeHideShowField('QUESTION_LINE-EMP_NME_CURRENT_BO', '');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_ADDRESS', '');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_CITY','');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_STATE','');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_ZIP','');
					safeHideShowField('QUESTION_LINE-EMP_JOB_TITLE_CURRENT_BO', '');
					safeHideShowField('QUESTION_LINE-TIME_AT_CURRENT_EMP_BO', '');
					safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_BO', '');
					safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_BO', '');
				} else {
					safeHideShowField('QUESTION_LINE-EMP_NME_CURRENT_BO', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_ADDRESS', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_CITY','none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_STATE','none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_BO_ZIP','none');
					safeHideShowField('QUESTION_LINE-EMP_JOB_TITLE_CURRENT_BO', 'none');
					safeHideShowField('QUESTION_LINE-TIME_AT_CURRENT_EMP_BO', 'none');
					safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_BO', 'none');
					safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_BO', 'none');
				}
			}
		}
		//Co-borrower logic
		else {
			if (document.form1.EMPLOYMENT_STATUS_CO_CONST){
				employementStatus = document.form1.EMPLOYMENT_STATUS_CO_CONST.value;
				//show the fields if there is a status of 1(full time) or 2 (part time)
				//for all other values, hide the fields
				if(employementStatus < 4)
				{
					safeHideShowField('QUESTION_LINE-EMP_NME_CURRENT_CO', '');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_ADDRESS', '');
					safeHideShowField('QUESTION_LINE-EMP_JOB_TITLE_CURRENT_CO', '');
					safeHideShowField('QUESTION_LINE-TIME_AT_CURRENT_EMP_CO', '');
					safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_CO', '');
					safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_CO', '');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_CITY', '');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_STATE', '');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_ZIP', '');
				} else {
					safeHideShowField('QUESTION_LINE-EMP_NME_CURRENT_CO', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_ADDRESS', 'none');
					safeHideShowField('QUESTION_LINE-EMP_JOB_TITLE_CURRENT_CO', 'none');
					safeHideShowField('QUESTION_LINE-TIME_AT_CURRENT_EMP_CO', 'none');
					safeHideShowField('QUESTION_LINE-EMP_NAME_PREV_CO', 'none');
					safeHideShowField('QUESTION_LINE-TIME_AT_PREV_EMP_CO', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_CITY', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_STATE', 'none');
					safeHideShowField('QUESTION_LINE-CURRENT_EMP_CO_ZIP', 'none');
				}
			}
		}
	}
	catch(exception){
		// do nothing
	}
}

function CalcWindow(page) {
	OpenWin = this.open(page, "CtrlWindow", "toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,dependent=no,directories=no,width=600,height=500,x=50,y=50");
}

function removeCommas(num){
    var d= "";
    len= Url.decode(num).length;
    for(x=0;x<len;++x){ 
      if(Url.decode(num).charAt(x)!=","){d=d +Url.decode(num).charAt(x)} 
    }
    //alert(d);
    return d;
}

function ToggleBORROWER_OTHER_INCOME_SOURCE(){
//alert('inside ToggleBORROWER_OTHER_INCOME_SOURCE');
    if(getFormValue('ANNUAL_OTHER_INCOME_BO') == ''){
        safeHideShowField('EMP_OTHER_INC_SOURCE_BO','none');
    } else {
        safeHideShowField('EMP_OTHER_INC_SOURCE_BO','block');
    }		
}

function ToggleCOBORROWER_OTHER_INCOME_SOURCE(){
//alert('inside ToggleCOBORROWER_OTHER_INCOME_SOURCE');
    if(getFormValue('ANNUAL_OTHER_INCOME_CO') != ''){
        safeHideShowField('EMP_OTHER_INC_SOURCE_CO','block');
    } else {
        safeHideShowField('EMP_OTHER_INC_SOURCE_CO','none');
    }		
}

function ToggleShowHidePREFERRED_LENDERS_COMPETE_DIV(){
//alert('inside ToggleShowHidePREFERRED_LENDERS_COMPETE_DIV');
    var preferred_lender_selected = getFormValue('PERFERRED_LENDER');
    if ((preferred_lender_selected == '-1') || (preferred_lender_selected == '00'))
    {
    //alert('there');
        safeHideShowField('PERFERRED_LENDER_OTHER_row', 'none');
        safeHideShowField('PREFERRED_LENDERS_COMPETE_row', 'none');
    }
    else
    {
    //alert('everywhere');
        if (preferred_lender_selected == '0'){
            safeHideShowField('PERFERRED_LENDER_OTHER_row', 'block');
        }
        else{
            safeHideShowField('PERFERRED_LENDER_OTHER_row', 'none');
        }
        safeHideShowField('PREFERRED_LENDERS_COMPETE_row', 'block');
    }
}


function ToggleBORROWER_PREV_ADDRESS(){
//alert('inside ToggleBORROWER_PREV_ADDRESS');
    if(getFormValue('ADDR_RES_FREQ_BO') == '1'){
        if(getFormValue('ADDR_RES_LENGTH_BO') < 24){
            safeHideShowField('BORROWER_PREV_ADDRESS','block');
        }else {
            safeHideShowField('BORROWER_PREV_ADDRESS','none');
        }		
    } else {
        if(getFormValue('ADDR_RES_LENGTH_BO') < 2){
            safeHideShowField('BORROWER_PREV_ADDRESS','block');
        }else {
            safeHideShowField('BORROWER_PREV_ADDRESS','none');
        }		
    }

    if(getFormValue('ADDR_RES_LENGTH_BO') ==''){
        safeHideShowField('BORROWER_PREV_ADDRESS','none');
    }
}

function ToggleSELLING_PROP_LOCATION(){
//alert('inside ToggleSELLING_PROP_LOCATION');
    if (!(getFormValue('ADDR_CURRENT_RES_BO_CONST') == '1')) {
        safeHideShowField('SELLING_PROP_LOCATION','none');
    } else {
        safeHideShowField('SELLING_PROP_LOCATION','block');
    }
}

function ToggleCoBorrowerAddressSameAsBorrower(){
//alert('inside ToggleCoBorrowerAddressSameAsBorrower');
    if (document.form1.ADDR_SAME_AS_BORROWER[0].checked){
    //alert('there');
        safeHideShowField('CoBorrowerAddress','none');
    } else {
    //alert('everywhere');
        safeHideShowField('CoBorrowerAddress','block');
    }
}

function BlankAndToggleCoBAddressFields(){
//alert('inside BlankAndToggleCoBAddressFields');
    if (document.form1.ADDR_SAME_AS_BORROWER[0].checked){
        //if user clicks "yes", then set the co-borrower values to match the borrower
        //useful for those browsers where we do not hide the div
        //alert(getFormValue('ADDR_LN1_BO'));
        document.getElementById('ADDR_LN1_CO').value = Url.decode(getFormValue('ADDR_LN1_BO'));
        document.getElementById('ADDR_CITY_CO').value = Url.decode(getFormValue('ADDR_CITY_BO'));
        document.getElementById('ADDR_STATE_CO_CONST').value = getFormValue('ADDR_STATE_BO_CONST');
        document.getElementById('ADDR_ZIP_CO').value = getFormValue('ADDR_ZIP_BO');
        document.getElementById('ADDR_RES_LENGTH_CO').value = getFormValue('ADDR_RES_LENGTH_BO');
        document.getElementById('ADDR_RES_FREQ_CO').value = getFormValue('ADDR_RES_FREQ_BO');
    }
    //Attempt to Hide/Show the co-borrower adress div
    ToggleCoBorrowerAddressSameAsBorrower();
}

function ToggleHOME_TYPEUNITS(){
//alert('inside ToggleHOME_TYPEUNITS');
    if (getFormValue('V2PROP_CONST') != '34'){
        safeHideShowField('UNIT_CONST_row','none');
    } else {
        safeHideShowField('UNIT_CONST_row','block');
    }
}

function ToggleOCCUPY_PROP_CO_CONST(){
//alert('inside ToggleOCCUPY_PROP_CO_CONST');
    if(getFormValue('COBORROWER_SPOUSE_OTHER') == '1'){
        safeHideShowField('OCCUPY_PROP_CO_CONST_row','none');
        safeHideShowField('NUMBER_DEBTS_CO_CONST_row','none');
    } else {
        safeHideShowField('OCCUPY_PROP_CO_CONST_row','block');
        safeHideShowField('NUMBER_DEBTS_CO_CONST_row','block');
    }
}

function ToggleCO_BORROWEROCCUPY_PROP(){
//alert('inside ToggleCO_BORROWEROCCUPY_PROP');
    if(getFormValue('COBORROWER_SPOUSE_OTHER') == '1'){
        safeHideShowField('OCCUPY_PROP_CO_CONST_row','none');
    } else {
        safeHideShowField('OCCUPY_PROP_CO_CONST_row','block');
    }
}

function ToggleHPCAddressFields(){
//alert('inside ToggleHPCAddressFields');
    if (document.form1.AVM_ESTIMATE.checked){
        safeHideShowField('PROP_STREET_FOR_HPC','block');
        safeHideShowField('PROP_CITY_FOR_HPC','block');
      } else {
        safeHideShowField('PROP_STREET_FOR_HPC','none');
        safeHideShowField('PROP_CITY_FOR_HPC','none');
      }
}

function ToggleBORROWER_EMAIL(){
//alert('inside ToggleBORROWER_EMAIL');
      if(document.form1.NOINTERNETACCESS[0].checked){
        safeHideShowField('EMAIL_IMPORTANT_INFO_BOLD','none');
        safeHideShowField('EMAIL_BO_row','none');
        safeHideShowField('EMAIL_BO_VERIFY_row','none');
        safeHideShowField('PASSWORD_BO_row','none');
        safeHideShowField('PASSWORD_BO_VERIFY_row','none');
        safeHideShowField('EMAIL_STATUS_CONST_row','none');
      } else {
        safeHideShowField('EMAIL_IMPORTANT_INFO_BOLD','block');
        safeHideShowField('EMAIL_BO_row','block');
        safeHideShowField('EMAIL_BO_VERIFY_row','block');
        safeHideShowField('PASSWORD_BO_row','block');
        safeHideShowField('PASSWORD_BO_VERIFY_row','block');
        safeHideShowField('EMAIL_STATUS_CONST_row','block');
      }
}

function ToggleFAR_COB_OPTIN(){
//alert('inside ToggleFAR_COB_OPTIN');
        IsCityACompanyOwnedBrokerageCity();
}

function ToggleFAR_RENETWORK_OPTIN(){
//alert('inside ToggleFAR_RENETWORK_OPTIN');
        IsCityAnREcomNetworkCoverageCity();
}

function CheckMaxBoxesSelected(obj)
{
  var maxBox;
  maxBox = 3;
  
  var i;
  i = 0;

    if(document.form1.CBX_MORTTYPES_118_1.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_2.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_3.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_4.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_5.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_6.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_11.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_12.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_13.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_14.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_15.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_16.checked)
    { i = i + 1;}
    if(document.form1.CBX_MORTTYPES_118_9999.checked)
    { i = i + 1;}
    
    if (i > maxBox)
    {
      alert('You have selected more than 3 loan types.  \nPlease select no more than 3 loan types before continuing.');
      obj.checked = false;
    }
  }
              
function ToggleHMDA_BO(){
//alert('inside ToggleHMDA_BO');
    //This part works for when the question is on the page
    if (document.form1.WILL_YOU_ANSWER_HMDA_QUESTIONS_BO[0].checked){
        //if user clicks "yes"... show the DIV
        safeHideShowField('HMDA_WRAPPER_BO','block');
    }else{
        //if user clicks "no"... hide the DIV - we'll set the values to "not gonna tell you" during validation
        safeHideShowField('HMDA_WRAPPER_BO','none');
    }
    ToggleHMDA_CO();
}

function ToggleHMDA_CO(){
//alert('inside ToggleHMDA_CO');
    //This part works for when the question is on the page
    if (document.form1.WILL_YOU_ANSWER_HMDA_QUESTIONS_BO[0].checked){
        //if user clicks "yes"... show the DIV
        safeHideShowField('HMDA_WRAPPER_CO','block');
    }else{
        //if user clicks "no"... hide the DIV - we'll set the values to "not gonna tell you" during validation
        safeHideShowField('HMDA_WRAPPER_CO','none');
    }
}

function ToggleHOA_DUES_PURCHASE()
{
    //alert('here');
    var whereinprocess = getFormValue('WHEREINHOMEBUYINGPROCESS');
    if (whereinprocess == '2')
    {
        safeHideShowField('HOA_DUES_PURCHASE','block');
    }
    else
    {
        safeHideShowField('HOA_DUES_PURCHASE','none');
    }
}

function showhideEMPLOYER_INFO_BO()
{
    //alert('here');
    var employment_status_bo = getFormValue('EMPLOYMENT_STATUS_BO_CONST');
    if (employment_status_bo == '4' || employment_status_bo == '5' || employment_status_bo == '6')
    {
        safeHideShowField('EMPLOYER_INFO_BO','none');
    }
    else
    {
        safeHideShowField('EMPLOYER_INFO_BO','block');
    }
}

function showhideEMPLOYER_INFO_CO()
{
    //alert('here');
    var employment_status_co = getFormValue('EMPLOYMENT_STATUS_CO_CONST');
    if (employment_status_co == '4' || employment_status_co == '5' || employment_status_co == '6')
    {
        safeHideShowField('EMPLOYER_INFO_CO','none');
    }
    else
    {
        safeHideShowField('EMPLOYER_INFO_CO','block');
    }
}

function AutoTraderPopup(){
    if (readCookie('AT4Survey') == '1'){
    } else {
        createCookie('AT4Survey','1','14');
        STMRCWindow('/partners/autotrader/CompletedQFSurvey.asp');
    }
}

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + '$' + num + '.' + cents);
}

function verifyEmailMatch(){
    fieldValuesMatch('EMAIL_BO','EMAIL_BO_VERIFY','EMAIL_BO_VERIFY_row','Your email address does not match.')
}

function verifyPasswordMatch(){
    fieldValuesMatch('PASSWORD_BO','PASSWORD_BO_VERIFY','PASSWORD_BO_VERIFY_row','Your password does not match.')
}

function fieldValuesMatch(field1,field2,errorFieldID,errorMessage){
//alert('inside fieldValuesMatch');
    safeRemoveID('error_' + errorFieldID);
    //removeErrorClass(errorFieldID);
    if (getFormValue(field1) == getFormValue(field2)){
    }else{
        var errorFieldInnerHTML = safeGetInnerHTMLByID(errorFieldID);
        errorFieldInnerHTML = '<span style="text-align:left;float:left;padding-left:285px;font-weight:bold;font-size:1.1em;color:red;" id="error_' + errorFieldID + '">' + errorMessage + '</span>' + errorFieldInnerHTML;
        safeSetInnerHTMLByID(errorFieldID,errorFieldInnerHTML);
        var T = setTimeout("highlightID('" + field2 + "');",100);
        //setErrorClass(errorFieldID);
    }
}

function setIDFocus(ID){
//alert('inside setFocus for ' + ID);
    if (safeGetElementByID(ID)){
        document.getElementById(ID).focus();
    }
}

function highlightID(ID){
//alert('inside setFocus for ' + ID);
    if (safeGetElementByID(ID)){
        setIDFocus(ID);
        document.getElementById(ID).select();
    }
}
function checkLength(s)
{
  	minLengthpassword = 8;
  	maxLengthpassword = 20;
  	var pLength = s.length;
  	if (pLength >= minLengthpassword && pLength <= maxLengthpassword)
  	{
      	return true;
  	}
  	else
  	{
      	return false;
  	}
}

function checkSpace(strValue)
{
    var valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var ok = "yes";
    var temp;
    for (var i=0; i<strValue.length; i++) {
    temp = "" + strValue.substring(i, i+1);
    if (valid.indexOf(temp) == "-1") ok = "no";
    }
    if (ok == "no") {
        return false;
   }else {
        return true;
   }
}
function isPatternMatched(passwordValue,pattern)
{
	    return pattern.test(passwordValue);
}

function confirmMatch(Password,NewPassword)
{
	var pass1 = Password.value;
    var pass2 = NewPassword.value;

	if (pass1 == pass2)
	{
		document.getElementById("ValidConfirmColorImage").src = "/images/common/green-checkmark.gif";
	}
	else
	{
		document.getElementById("ValidConfirmColorImage").src = "/images/common/red-xmark.gif";
	}
	if (pass1 == '')
	{
		document.getElementById("ValidConfirmColorImage").src = "/images/common/red-xmark.gif";
	}
}

function checkAlphaNumeric(password)
{
    var reAlpha = /[a-zA-Z]/ ;
	var reNum = /[0-9]/;

    if ( reAlpha.test(password) && reNum.test(password) )
  	{
      	return true;
  	}
  	else
  	{
      	return false;
  	}
}

function validatePassword()
{
    var password = document.getElementById("PASSWORD_BO").value;
    var confirmpassword = document.getElementById("PASSWORD_BO_VERIFY").value;
    var pLength = password.length;
    
    if ((checkLength(password)) && (checkSpace(password)) && checkAlphaNumeric(password))
    { 
    document.getElementById("ValidColorImage").src = "/images/common/green-checkmark.gif";
    }else {
    document.getElementById("ValidColorImage").src = "/images/common/red-xmark.gif";
    }

    if ((checkLength(confirmpassword)) && (checkSpace(confirmpassword)) && checkAlphaNumeric(confirmpassword))
    { 
        confirmMatch(document.getElementById("PASSWORD_BO"),document.getElementById("PASSWORD_BO_VERIFY"));
    }else {
        document.getElementById("ValidConfirmColorImage").src = "/images/common/red-xmark.gif";
    }   
}
