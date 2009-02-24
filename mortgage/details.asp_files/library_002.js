function SetLowRateForLender(PartnerID,lowRatePartnerID){
    //alert('SetLowRateForLender for PartnerID=' + PartnerID + ' and lowRatePartnerID ' + lowRatePartnerID);
    safeSetInnerHTMLByID('lowRate_' + PartnerID,lowRatePartnerID + '%');
}

function SetLowAPRForLender(PartnerID,lowAPRPartnerID){
    safeSetInnerHTMLByID('lowAPR_' + PartnerID,lowAPRPartnerID + '%');
}

function getcookie(cookieName) {
	var id = cookieName + "=";
	var cookievalue = "";
	if (document.cookie.length > 0) 
		{
		offset = document.cookie.indexOf(id);
	if (offset != -1) 
		{
		cookievalue = "x";
		}
		}
	return cookievalue;
}
function setcookie () {
	var today = new Date();
	document.cookie = cookie
	+ "="
	+ escape ("done");
}
	
function ToggleQFView(DivToShow,TabToShow){
    //alert('ToggleQFView for view' + DivToShow + ' and Tab ' + TabToShow);
    
    safeHideShowField('LenderView','none');
    safeHideShowField('tab1','none');
    safeHideShowField('SortByInterestRate','none');
    safeHideShowField('tab2','none');
    safeHideShowField('SortByPayment','none');    
    safeHideShowField('tab3','none');
    safeHideShowField(DivToShow,'block');    
    safeHideShowField(TabToShow,'block');    
}

function ShowHideDIV(whichDiv){
//alert('inside ShowHideDIV for ' + whichDiv);
    try{
        if (safeGetElementByID(whichDiv)){
            var x = document.getElementById(whichDiv);
            if (x.style.display == 'block'){
                x.style.display = 'none';
            } else {
                x.style.display = 'block';
            }
        } else {
        //error getting the element
        }
    } catch(exception){
        //no handling - just preventing page explosions
    }
}

function ToggleHideShowOfferSummary(partnerID){
    //alert('ToggleHideShowOfferSummary for ' + partnerID);
	try{
	    if (safeGetElementByID('offersummary_' + partnerID)){
	        var objField = document.getElementById('offersummary_' + partnerID);
		    if((objField) && (objField.style)){
			    if (objField.style.display == 'block'){
			        objField.style.display = 'none';
			        safeSetInnerHTMLByID('ShowHide_' + partnerID,'View offers from this lender');
			        document.getElementById('ShowHideImage_' + partnerID).src='/images/myaccount/button-collapsed.gif'
			    } else {
			        objField.style.display = 'block';
			        safeSetInnerHTMLByID('ShowHide_' + partnerID,'Hide offers from this lender');
			        document.getElementById('ShowHideImage_' + partnerID).src='/images/myaccount/button-expanded.gif'
			    }
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ToggleHideShowRatePaymentDetails(){
    //alert('ToggleHideShowOfferSummary for ' + partnerID);
	try{
	    if (safeGetElementByID('RatePaymentDetails')){
	        var objField = document.getElementById('RatePaymentDetails');
		    if((objField) && (objField.style)){
			    if (objField.style.display == 'block'){
			        objField.style.display = 'none';
			        //safeSetInnerHTMLByID('ShowHide_RatePaymentDetails','Show Rate & Payment Details');
			        document.getElementById('ShowHideImage_RatePaymentDetails').src='/images/myaccount/button-collapsed.gif'
			    } else {
			        objField.style.display = 'block';
			        //safeSetInnerHTMLByID('ShowHide_RatePaymentDetails','Hide Rate & Payment Details');
			        document.getElementById('ShowHideImage_RatePaymentDetails').src='/images/myaccount/button-expanded.gif'
			    }
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ToggleHideShowSettlementChargesDetails(){
    //alert('ToggleHideShowOfferSummary for ' + partnerID);
	try{
	    if (safeGetElementByID('SettlementChargesDetails')){
	        var objField = document.getElementById('SettlementChargesDetails');
		    if((objField) && (objField.style)){
			    if (objField.style.display == 'block'){
			        objField.style.display = 'none';
			        //safeSetInnerHTMLByID('ShowHide_SettlementChargesDetails','Show Settlement Charges');
			        document.getElementById('ShowHideImage_SettlementChargesDetails').src='/images/myaccount/button-collapsed.gif'
			    } else {
			        objField.style.display = 'block';
			        //safeSetInnerHTMLByID('ShowHide_SettlementChargesDetails','Hide Settlement Charges');
			        document.getElementById('ShowHideImage_SettlementChargesDetails').src='/images/myaccount/button-expanded.gif'
			    }
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ToggleHideShowOfferDescription(){
    //alert('ToggleHideShowOfferDescription for ' + partnerID);
	try{
	    if (safeGetElementByID('OfferDescriptionDetails')){
	        var objField = document.getElementById('OfferDescriptionDetails');
		    if((objField) && (objField.style)){
			    if (objField.style.display == 'block'){
			        objField.style.display = 'none';
			        //safeSetInnerHTMLByID('ShowHide_OfferDescription','Show Offer Description');
			        document.getElementById('ShowHideImage_OfferDescription').src='/images/myaccount/button-collapsed.gif'
			    } else {
			        objField.style.display = 'block';
			        //safeSetInnerHTMLByID('ShowHide_OfferDescription','Hide Offer Description');
			        document.getElementById('ShowHideImage_OfferDescription').src='/images/myaccount/button-expanded.gif'
			    }
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ToggleHideShowOfferConditions(){
    //alert('ToggleHideShowOfferCondition for ' + partnerID);
	try{
	    if (safeGetElementByID('OfferConditionsDetails')){
	        var objField = document.getElementById('OfferConditionsDetails');
		    if((objField) && (objField.style)){
			    if (objField.style.display == 'block'){
			        objField.style.display = 'none';
			        //safeSetInnerHTMLByID('ShowHide_OfferConditions','Show Offer Conditions');
			        document.getElementById('ShowHideImage_OfferConditions').src='/images/myaccount/button-collapsed.gif'
			    } else {
			        objField.style.display = 'block';
			        //safeSetInnerHTMLByID('ShowHide_OfferConditions','Hide Offer Conditions');
			        document.getElementById('ShowHideImage_OfferConditions').src='/images/myaccount/button-expanded.gif'
			    }
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ToggleHideShowOfferOverview(){
    //alert('ToggleHideShowOfferCondition for ' + partnerID);
	try{
	    if (safeGetElementByID('OfferOverviewDetails')){
	        var objField = document.getElementById('OfferOverviewDetails');
		    if((objField) && (objField.style)){
			    if (objField.style.display == 'block'){
			        objField.style.display = 'none';
			        //safeSetInnerHTMLByID('ShowHide_OfferConditions','Show Offer Conditions');
			        document.getElementById('ShowHideImage_OfferOverview').src='/images/myaccount/button-collapsed.gif'
			    } else {
			        objField.style.display = 'block';
			        //safeSetInnerHTMLByID('ShowHide_OfferConditions','Hide Offer Conditions');
			        document.getElementById('ShowHideImage_OfferOverview').src='/images/myaccount/button-expanded.gif'
			    }
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ToggleHideShowRatePaymentDetails(){
    //alert('ToggleHideShowRatePaymentDetails for ' + partnerID);
	try{
	    if (safeGetElementByID('RatePaymentDetails')){
	        var objField = document.getElementById('RatePaymentDetails');
		    if((objField) && (objField.style)){
			    if (objField.style.display == 'block'){
			        objField.style.display = 'none';
			        //safeSetInnerHTMLByID('ShowHide_OfferConditions','Show Offer Conditions');
			        document.getElementById('ShowHideImage_RatePaymentDetails').src='/images/myaccount/button-collapsed.gif'
			    } else {
			        objField.style.display = 'block';
			        //safeSetInnerHTMLByID('ShowHide_OfferConditions','Hide Offer Conditions');
			        document.getElementById('ShowHideImage_RatePaymentDetails').src='/images/myaccount/button-expanded.gif'
			    }
		    }
	    } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
	    }
	} catch(exception){
		//no handling - just preventing page explosions
	}
}

function ToggleHideShowSettlementChargesDetails(){
//alert('ToggleHideShowSettlementChargesDetails for ' + partnerID);
    try{
        if (safeGetElementByID('SettlementChargesDetails')){
            var objField = document.getElementById('SettlementChargesDetails');
            if((objField) && (objField.style)){
                if (objField.style.display == 'block'){
                    objField.style.display = 'none';
                    //safeSetInnerHTMLByID('ShowHide_OfferConditions','Show Offer Conditions');
                    document.getElementById('ShowHideImage_SettlementChargesDetails').src='/images/myaccount/button-collapsed.gif'
                } else {
                    objField.style.display = 'block';
                    //safeSetInnerHTMLByID('ShowHide_OfferConditions','Hide Offer Conditions');
                    document.getElementById('ShowHideImage_SettlementChargesDetails').src='/images/myaccount/button-expanded.gif'
                }
            }
        } else {
            //error gettign the element
            //alert('safeGetElementByID returned false');
        }
    } catch(exception){
        //no handling - just preventing page explosions
    }
}

function Compare(boxName){
//alert('inside Compare for ' + boxName);
    var elements = document.getElementsByName('cbx' + boxName);
    var index=0;
    var numSelected=0;
    var CompareList = "";
    for(var i = 0 ;i<elements.length;i++){
        if(elements[i].checked){
            CompareList = CompareList + ',' + elements[i].value;
            numSelected++;
        }
    }

    if(numSelected < 2 || numSelected > 5){
        alert("Need to select between two and five offers");
    }else{
        CompareList = Right(CompareList, CompareList.length-1)
        //alert('CompareList=' + CompareList);
        setFormValue(boxName + 'CompareList',CompareList);
        document.getElementById('frm' + boxName).submit();
    }
}

function Certify(URL) {
  popupWin = window.open(URL, 'Participant', 'location,scrollbars,width=800,height=330')
  window.top.name = 'opener';
}

function saveCache(lenderID) {
    document.cookie = 'lenderID=' + lenderID;
    return false;
}
