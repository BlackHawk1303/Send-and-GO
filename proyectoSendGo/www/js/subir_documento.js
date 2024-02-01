






$(document).ready(function(){
	
	
	 $('input[type="file"]').change(function(){
                if ($(this).val()) {
                    $('input[type="submit"]').removeAttr('disabled');
                    // or, as has been pointed out elsewhere:
                    // $('input:submit').removeAttr('disabled'); 
                }				
            });
    
	
	
	
	
	var rut = window.localStorage.getItem("rut");
	//$(this).attr("action") = ;
	
	$('#enviar').attr('action', 'http://192.168.1.143:5000/usuario/imprimir/'+rut+'');
	
	
	
	
	
	$("#imprimir").submit(function(event){
		event.preventDefault(); 

		
		//var dir = $(this).attr("action"); //recibe la url
		
	
		
		var metodo = $(this).attr("method"); //metodo a utilizar		
		
		var formData = new FormData(document.getElementById("item"));
		
		//formData.append("impresora", window.localStorage.getItem("impresora"));
		
		$.ajax({
			url: directorio,
			type: metodo,
			dataType: "html",
			data: formData,
			cache: false,
			contentType: false,
			processData: false
		
			}).done(function(res){				
				window.location="subir_documento.html";;
			});
			
		});	



});	
	
	



