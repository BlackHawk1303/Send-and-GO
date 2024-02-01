$('#enviar').click(function(){
   
	var tipo = document.getElementById("txt_tipo").value;
	var ext = document.getElementById("txt_extension").value;
	
	
	
		
	
		
		$.ajax({
			url : 'http://192.168.1.143:5000/documento/tipo',
			type: 'POST',
			data : jQuery.param({ txt_tipo: tipo, txt_extension : ext}),
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
		}).done(function(response){
	
			if (response == "True"){
				alert("Extension Ingresada Correctamente");
				document.getElementById("txt_tipo").value = "" ;
				document.getElementById("txt_extension").value = "" ;	
			}
			else{
				alert(response)
				document.getElementById("txt_tipo").value = "" ;
				document.getElementById("txt_extension").value = "" ;	;
			}
		});	
});