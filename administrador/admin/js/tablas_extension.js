$(document).ready(function() {
	
	$.ajax({
		url : "http://192.168.1.143:5000/extension",
		type: 'GET',
		dataType: 'json',		
	}).done(function(response){
		console.log(response)
		
		x = jQuery.parseJSON(JSON.stringify(response));;
		var table = $('#lista');
		for(key in x) {			
			table.append("<tr><td>"+key+"</td> <td>"+x[key].nombre+"</td> <td> "+x[key].tipo+"</td><td> <button class='btn btn-danger' id='"+key+"' onclick='eliminar(this.id)'> Eliminar </button></td> </tr> ");
		};
		$('#lista').dataTable();
		
	});
	
	
	
	
	
        
});

function eliminar(id){
  var answer = confirm('Esta seguro de eliminar?');
		if (answer)
		{
			$.ajax({
				url : "http://192.168.1.143:5000/extension/eliminar/"+id+"",
				type: 'GET',						
			}).done(function(response){
				alert(response);
				location.reload();
			});
		}		
}
	