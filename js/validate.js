var anonUrl = 'http://preveoh.com/a/';

var ok = {};

var validateUsername = function() {



	//before we send anything to the server, check to see if there is something in the field.
	var e = document.getElementById('Username');
	if( e.value.search(/^[A-Za-z0-9]{1,20}$/) == -1 ) {
		var d = document.getElementById("UsernameValidationIndicator");
                d.innerHTML = '&nbsp <b style="color: red">This username not available.</b>';
		ok['username'] = 0;
		return;
	}

	var username = document.forms['NewAccount'].elements['Username'].value;
	var request = newRequest();
        var url = anonUrl + 'validate_username?username=' + username;
        request.open("GET",url,true);
        request.onreadystatechange = function() {
                if( request.readyState == 4 ) {
                        if( request.status == 200 ) {
                                var d = document.getElementById("UsernameValidationIndicator");
                                d.innerHTML = request.responseText;
				//yes.  scraping.    i know.  horrors.
				if(d.innerHTML.search('not available') == -1 ) 
					ok['username'] = 1;
                        }
                }
        };
        //now send.  we'll be waiting...
        request.send(null);
};

var validatePassword = function() {

	return;	
	var e1 = document.forms['NewAccount'].elements['SetPassword'];
	var d = document.getElementById("PasswordValidationIndicator");

	

	if( e1.value.search('\\S') == -1 )  {
                 d.innerHTML = '&nbsp <b style="color: red">There is a problem with your password.</b>';
		 ok['password'] = 0;
	}else{
		d.innerHTML = '';
		ok['password'] = 1;
	}
};

var validateEmail = function() {





	//get the patern
	var e = document.getElementById("Email");
	var d = document.getElementById("EmailValidationIndicator");

	if( e.value.search(/^[A-Za-z0-9\._\-\+]+@[A-Za-z0-9\-]+\.\w+\s*$/) == -1 ) { //shit didn't match
                 d.innerHTML = '&nbsp <b style="color: red">This does not seem to be a valid email address.</b>';
		 ok['email'] = 0;
	}else{
		d.innerHTML = '';
		ok['email'] = 1;
	}
		


};

validateFullName = function() {
	//set the pattern.
		

	if( e.value.search('\\S') == -1 ) { //shit didn't match
                 d.innerHTML = '&nbsp <b style="color: red">This does not seem to be a valid name.</b>';
                 ok['fullName'] = 0;
        }else{
                d.innerHTML = '';
                ok['fullName'] = 1;
        }
};

	


function validateInit() {

	document.forms['NewAccount'].elements['Username'].onchange = validateUsername;
	document.forms['NewAccount'].elements['FullName'].onchange = validateFullName;
	//document.forms['NewAccount'].elements['password2'].onchange = validatePassword;
	document.forms['NewAccount'].elements['Email'].onchange = validateEmail;
	document.forms['NewAccount'].elements['SetPassword'].onchange = validatePassword;
}	





var submitNewAccountForm = function() {

	//fireoff all the event handlers on e last time.

	validateUsername();
	validatePassword();
	validateEmail();

	var formOkToSubmit = 1;
	for(var name in ok) {
		if( ok[name] != 1 ) {
			alert('There seems to be a problem with your ' + name);
			formOkToSubmit = 0;
		}
	}

	if( formOkToSubmit == 1 ) {
		document.forms['NewAccount'].submit();
	}

};



			









		
