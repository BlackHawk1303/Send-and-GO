	var _RUT;

$('#buscar').click(function(){
   
	var user = document.getElementById("txt_rut").value;
	_RUT = user;
		if (!user.trim()) {
			alert("Campos Vacios");
		}
		else{
			
			$.ajax({
				url : 'http://192.168.1.143:5000/usuarios/'+user,
				type: 'GET',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			}).done(function(response){
				
				if (jQuery.type(response)== "object"){								
					document.getElementById("txt_apellido_M").value = response.appellido_m ;
					document.getElementById("txt_apellido_P").value = response.appellido_p ;
					document.getElementById("txt_correo").value = response.correo ;
					document.getElementById("txt_nombre").value = response.nombre ;
				}
				else{
					alert("El usuario no existe");
				}
				
			});
			
		}		
});

$('#cambiar').click(function(){
   
	var pass = document.getElementById("txt_contra").value;	
	var appM = document.getElementById("txt_apellido_M").value;
	var appP = document.getElementById("txt_apellido_P").value;
	var cor = document.getElementById("txt_correo").value;
	var nom = document.getElementById("txt_nombre").value;
	
	
	
		if (!appM.trim() || !appP.trim() || !cor.trim() || !nom.trim()) {
			alert("Campos Vacios");
		}
		else{
			
			$.ajax({
				url : 'http://192.168.1.143:5000/usuarios/modificar/',
				type: 'POST',
				data : jQuery.param({ txt_rut: _RUT, txt_contra : pass, txt_nombre: nom, txt_apellido_M : appM,txt_apellido_P: appP,txt_correo: cor}),
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
			}).done(function(response){
				
				if (response == "True"){
					alert("Usuario Modificado");
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
			
		}		
		
});