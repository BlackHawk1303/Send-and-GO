


$(document).ready(function(){

		
	
		document.addEventListener("backbutton", function(boton){
		if($.mobile.activePage.is('#escanear')){
			boton.preventDefault();
		}
		else {
			if (confirm("Esta seguro de salir?")) {
				navigator.app.exitApp();
			}
			else {
				return false;
			}
		}
	}, false);


	
	
	
	
	$("#scanear").click(function(){
			cordova.plugins.barcodeScanner.scan(
			
			function (result) {
				  if (result.format == "QR_CODE"){					
						
							$.ajax({
									url : 'http://192.168.1.143:5000/impresora/'+result.text+'',
									type: "GET",
									
							}).done(function(response){
									
								if (response === ("True")){
									window.localStorage.setItem("impresora", result.text);
									window.location="subir_documento.html";
								}
								else{
									alert(response);
								}
							
							
							});
										
										
						
					}
			},
			  
			function (error) {
				alert("No se pudo escanear: " + error);
			},
			{
				formats : "QR_CODE",
				orientation : "portrait",				  
			}
		  
		);
	});
	
	
	$("#cerrar_Sesion").click(function(){
		
			var n = window.localStorage.getItem("nombre");
			var m = window.localStorage.getItem("ape_M");
			var p = window.localStorage.getItem("ape_p");
			var r = window.localStorage.getItem("rut");
			var corr = window.localStorage.getItem("correo");
			var contr = window.localStorage.getItem("contra");
			
			
			
			if(n || m || p || r || corr || contr){
				
				window.localStorage.removeItem("nombre");
				window.localStorage.removeItem("ape_M");
				window.localStorage.removeItem("ape_P");
				window.localStorage.removeItem("rut");
				window.localStorage.removeItem("correo");
				window.localStorage.removeItem("contra");
				
				
				
				
				window.location="index.html";
			}
	});
})	
	
	



