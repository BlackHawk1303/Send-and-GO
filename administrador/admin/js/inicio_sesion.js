$('#enviar').click(function(){
   
   var user = document.getElementById("txtUsuario").value;
   var pass = document.getElementById("txtContra").value;
   
   /*$.ajax({
    url: 'http://192.168.1.143:5000/admin',
    type: 'POST',
    data: jQuery.param({ txtUser: "user", txtConrta : "pass"}) ,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (response) {
        alert(response);
    },
    error: function () {
        alert("error");
    }*/
	
	$.ajax({
		url : 'http://192.168.1.143:5000/admin',
		type: 'POST',
		data : jQuery.param({ txtUser: user, txtContra : pass}),
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	}).done(function(response){
	
		if (response == "True"){
			window.location="index.html";
		}
		else{
			alert(response)
		}
	});
});