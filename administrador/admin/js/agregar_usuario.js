$('#enviar').click(function(){
   
	var user = document.getElementById("txt_rut").value;
	var pass = document.getElementById("txt_contra").value;
	
	var appM = document.getElementById("txt_apellido_M").value;
	var appP = document.getElementById("txt_apellido_P").value;
	var cor = document.getElementById("txt_correo").value;
	var nom = document.getElementById("txt_nombre").value;
	
		
	
		
		$.ajax({
			url : 'http://192.168.1.143:5000/usuarios/registrar/',
			type: 'POST',
			data : jQuery.param({ txt_rut: user, txt_contra : pass, txt_nombre: nom, txt_apellido_M : appM,txt_apellido_P: appP,txt_correo: cor}),
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
		}).done(function(response){
	
			if (response == "True"){
				alert("Usuario Ingresado Correctamente");
				document.getElementById("txt_rut").value = "" ;
				document.getElementById("txt_contra").value = "" ;				
				document.getElementById("txt_apellido_M").value = "" ;
				document.getElementById("txt_apellido_P").value = "" ;
				document.getElementById("txt_correo").value = "" ;
				document.getElementById("txt_nombre").value = "" ;
			}
			else{
				alert(response)
				document.getElementById("txt_rut").value = "" ;
				document.getElementById("txt_contra").value = "" ;				
				document.getElementById("txt_apellido_M").value = "" ;
				document.getElementById("txt_apellido_P").value = "" ;
				document.getElementById("txt_correo").value = "" ;
				document.getElementById("txt_nombre").value = "" ;
			}
		});	
});