




function revisarSesion(){
	
			var n = window.localStorage.getItem("nombre");
			var m = window.localStorage.getItem("ape_M");
			var p = window.localStorage.getItem("ape_p");
			var r = window.localStorage.getItem("rut");
			var corr = window.localStorage.getItem("correo");
			var contr = window.localStorage.getItem("contra");
			
			
			
			
			if(!typeof(n) === 'string'|| !typeof(m) === 'string'||!typeof(p) === 'string'|| !typeof(r) === 'string' || !typeof(corr) === 'string'|| typeof(contr) === 'string'){
				window.location="escanear.html";
			}
	}
	var $rut = $('input[type="text"]');
	var $contr = $('input[type="password"]');

	setInterval(function(){
		if($rut.val().length > 0 || $contr.val().length > 0){			
			$('input[type="submit"]').removeAttr('disabled');
			
		}else{
			$('input[type="submit"]').prop("disabled", true);
		}
	}, 100);




$("#enviar").submit(function(event){
	event.preventDefault(); 
	var dir = $(this).attr("action"); //recibe la url
	var metodo = $(this).attr("method"); //metodo a utilizar
	var datos = $(this).serialize(); //encripta los elementos para enviar
	
	
	
	$.ajax({
		url : dir,
		type: metodo,
		data : datos
	}).done(function(response){ //
		
		var usuario = response;	
		
		if (jQuery.type(response)== "object"){
			

			
			
			window.localStorage.setItem("nombre", usuario.nombre);
			window.localStorage.setItem("ape_M", usuario.apellido_m);
			window.localStorage.setItem("ape_p", usuario.apellido_p);
			window.localStorage.setItem("rut", usuario.rut);
			window.localStorage.setItem("correo", usuario.correo);
			window.localStorage.setItem("contra", usuario.contrasena);
			window.location="escanear.html"; 
			
			
			
		}
		
		else{
			alert(response);
			
		}
		
		
		
	});
});