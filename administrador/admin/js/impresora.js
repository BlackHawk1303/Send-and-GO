$('#enviar').click(function(){
   
	var impr = document.getElementById("txt_impr").value;	
		
		$.ajax({
			url : 'http://192.168.1.143:5000/impresora/ingresar',
			type: 'POST',
			data : jQuery.param({ txt_impr: impr}),
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
		}).done(function(response){
	
			if (response == "True"){
				alert("Ingresado Correctamente");				
				location.reload();
			}
			else{
				alert(response)
				document.getElementById("txt_impr").value = "" ;
			
			}
		});	
});


$(document).ready(function() {
	
	$.ajax({
		url : "http://192.168.1.143:5000/impresora",
		type: 'GET',
		dataType: 'json',		
	}).done(function(response){
		
		
		x = jQuery.parseJSON(JSON.stringify(response));;
		var table = $('#lista');
		for(key in x) {			
			table.append("<tr><td>"+key+"</td> <td>"+x[key].nombre_impr+"</td> <td> "+x[key].hojas+"</td> <td> <button class='btn btn-danger' id='"+key+"' onclick='eliminar(this.id)'> Eliminar </button></td> </tr> ");
		};
		
		$('#lista').dataTable();
		
	});
	
	
	
	
	
        
});

function eliminar(id){
  var answer = confirm('Esta seguro de eliminar?');
		if (answer)
		{
			$.ajax({
				url : "http://192.168.1.143:5000/impresora/eliminar/"+id+"",
				type: 'GET',						
			}).done(function(response){
				alert(response);
				location.reload();
			});
		}		
}