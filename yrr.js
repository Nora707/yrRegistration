'use strict';
var surname=document.getElementById('surName');
var givenname=document.getElementById('givenName');
var emailFirstPart=document.getElementById('emailLocal');
var emailSecondPart=document.getElementById('emailDomain');
var phoneNumber=document.getElementById('phoneNomber');
var submitBtn=document.getElementById('submit');
var newsLetterBox=document.getElementById('newsLetterBox');
var radioAnswersArr=['a','b','c'];
var user={
		firstName: '',
		lastName: '',
		email: '',
		education:'' ,
		englishLevel: '',
		age: '',
	};
	
/*  Listeners  */
surname.oninput=validatingName;  //oninput works in real time
givenname.oninput=validatingName;
emailFirstPart.onchange=validatingEmailLocal;
emailSecondPart.onchange=validatingEmailDomain;
phoneNumber.oninput=validatingPhoneNumber;

/*  validating while user typing  */
	/*  doesn't let invalid characters in the name inputs  */
function validatingName(){//ŐŐ szó közben beszúrt rossz karaktert hogy lehet eltüntetni, IT miért enged számot
	var nameLength=this.value.length;
	
	if (!/^[a-zéáűúőóüöí .-]+$/ig.test(this.value)) {
		console.log("Invalid characters");
		this.value=this.value.substring(0,nameLength-1); //deletes invalid character
	}
	//console.log(this.value.indexOf(/^[a-zéáűúőóüöí .-]+$/i));

}
	/*  doesn't let duble .. or . be the first/last character in the email inputs  */
function validatingEmailLocal(){
	var emailLength=this.value.length;
	
	if (this.value.indexOf('..')>-1 || this.value.indexOf('.')==0 || this.value.indexOf('.')==emailLength ){
		console.log("Invalid email");// ŐŐ HOVA IRJAM KI ,HOGYAN JELEZZEM HOGY ROSSZ
		//this.value=this.value.substring(0,nameLength-1); //deletes invalid character
	}
}

function validatingEmailDomain(){
	var emailDLength=this.value.length;
	
	if (this.value.indexOf('..')>-1 || this.value.indexOf('.')==0 || this.value.indexOf('.')==emailLength ){
		console.log("Invalid email");//ŐŐ MI NEM LEHET BENNE ,HOGY TESZTELJEM
		//this.value=this.value.substring(0,nameLength-1); //deletes invalid character
	}
}
	/*  only number can be in the phone number inputs, without the number type controls  */
function validatingPhoneNumber(){
	var phoneLength=this.value.length;
	
	if (!/^\+[0-9]*$/g.test(this.value)) {
		console.log("Invalid characters");
		this.value=this.value.substring(0,phoneLength-1); //deletes invalid character
	}
}

/*  validation, submitting and acting on server's answer  */
jQuery("form").on('submit',function(e){
	var schoolRadioArr=document.querySelectorAll('label [name="school"]');
	var englishRadioArr=document.querySelectorAll('label [name="english"]');
	var ageRadioArr=document.querySelectorAll('label [name="ageRange"]');
	
    e.preventDefault();
	
	user.firstName=givenname.value;
	user.lastName=surname.value;
	user.email=emailFirstPart.value+'@'+emailSecondPart.value;
	
	radioValues(schoolRadioArr,"education");
	radioValues(englishRadioArr, "englishLevel");
	radioValues(ageRadioArr, "age");
	
	if(newsLetterBox.checked==true){
		user.newsLetter='on';
	}
	console.log(user);
	var userJson = JSON.stringify(user);
	console.log(userJson);
	sendData(user);

});

function sendData(user){
	$.post("https://yellowroad.training360.com/registration", user, function(res) {
   console.log(res);
   if(res.success==true){
	   submitBtn.innerHTML='Sikeres Regisztráció';
	   submitBtn.classList.add('done');
   }
});
}

/*  sets the a,b,c radio values in user obj  */
function radioValues(givenRadioArr, keyForUser){
	for(var i=0; i<givenRadioArr.length;i++){
		if(givenRadioArr[i].checked==true){
			user[keyForUser]=radioAnswersArr[i];
		}
	}
}