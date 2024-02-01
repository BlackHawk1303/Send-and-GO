$(document).ready(function() {
	
	$.ajax({
		url : "http://192.168.1.143:5000/usuarios",
		type: 'GET',
		dataType: 'json',		
	}).done(function(response){
		
		
		x = jQuery.parseJSON(JSON.stringify(response));;
		var table = $('#lista');
		for(key in x) {			
			table.append("<tr><td>"+key+"</td> <td>"+x[key].app_p+"</td> <td> "+x[key].app_m+"</td> <td> "+x[key].correo+"</td> <td> "+x[key].nombre+"</td> <td> <button class='btn btn-danger' id='"+key+"' onclick='eliminar(this.id)'> Eliminar </button></td> </tr> ");
		};
		$('#lista').dataTable();
		
	});
	
	
	
	
	
        
});

function eliminar(id){
  var answer = confirm('Va a eliminar a un usuario, Continuar?');
		if (answer)
		{
			$.ajax({
				url : "http://192.168.1.143:5000/usuarios/eliminar/"+id+"",
				type: 'GET',						
			}).done(function(response){
				alert(response);
				location.reload();
			});
		}		
}
	