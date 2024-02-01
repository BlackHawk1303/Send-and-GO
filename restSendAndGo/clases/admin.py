from clases.conexion import Conexion
import hashlib

class Admin():

	def __init__(self, user, contra):
         
		 
		self.usr = user
		self.contrasena = contra
		self.Conexion = Conexion()
		self.lista = () 
		
		
	def inicio_sesion(self): #incio de sesion	
		usr = self.usr
		con = self.contrasena
		enc = hashlib.md5() #prepara la variable 
		enc.update(con.encode()) # encripta la variable
		x = enc.hexdigest() # la variable se convierte		
		query = "SELECT * FROM administrador WHERE usuario='"+usr+"'"		
		
		
		self.lista = self.Conexion.querBusqueda(query)
		
		if self.lista: #revisa si la lista no esta vacia, si no lo esta significa que encontro el usuario 
			contra = ""
			
			for l in self.lista: #lista los datos de la tupla 
				contra = l[2] # saca la contraseña
				
			
			
			if contra == x:
				return True # contraseña coincide
			else:
				return False # no coincida la contraseña
		
		else:
			return False #el usuario no es encontrado