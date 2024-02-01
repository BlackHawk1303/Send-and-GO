#coding = utf-8
from clases.conexion import Conexion
import hashlib

class Usuario():

	def __init__(self, apellido_M, apellido_P, nombre, rut, correo ,contra):
                
		self.apellido_M = apellido_M
		self.apellido_P = apellido_P
		self.nombre = nombre
		self.rut  = rut
		self.correo = correo
		self.contrasena = contra
		self.Conexion = Conexion()
		self.lista = () 
		
		
		
		
	def inicio_sesion(self): #incio de sesion
		
		ru = self.rut
		con = self.contrasena
		enc = hashlib.md5() #prepara la variable 
		enc.update(con.encode()) # encripta la variable
		x = enc.hexdigest() # la variable se convierte		
		query = "SELECT * FROM usuario WHERE rut='"+ru+"'"		
		usuario_dos = None
		
		self.lista = self.Conexion.querBusqueda(query)
		
		if self.lista: #revisa si la lista no esta vacia, si no lo esta significa que encontro el usuario 
			contra = ""
			
			for l in self.lista: #lista los datos de la tupla 
				contra = l[5] # saca la contraseña
				
			
			
			if contra == x:
				for l in self.lista: #lista los datos de la tupla
					strRut = l[0]					
					strNombre = l[1]
					strAppM = l[2]
					strAppP = l[3]
					strCorreo = l[4]					
					usuario_dos = Usuario(strAppM,strAppP,strNombre,strRut,strCorreo,contra)
				
					
				return usuario_dos # contraseña coincide
			else:
				return () # no coincida la contraseña
		
		else:
			return () #el usuario no es encontrado
			
			
	def busqueda_usuario(self):
		
		ru = self.rut			
		query = "SELECT * FROM usuario WHERE rut='"+ru+"'"
		
		self.lista = self.Conexion.querBusqueda(query)		
		usuario_dos = None
		if self.lista is not (): #revisa si la lista no esta vacia, si no lo esta significa que encontro el usuario 
			for l in self.lista: #lista los datos de la tupla
				strRut = l[0]
				strNombre = l[1]
				strAppM = l[2]
				strAppP = l[3]
				strCorreo = l[4]
				usuario_dos = Usuario(strAppM,strAppP,strNombre,strRut,strCorreo,"")
				
			
			return usuario_dos
		else:
			return None #el usuario no es encontrado
	
	def elimina_usuario(self):
		
		rut = self.rut
		
		query = "DELETE FROM usuario WHERE rut='"+rut+"'" 
		
		try:	
			if self.Conexion.query(query):			
				self.Conexion.cerrarConexion()
				return True
			else:
				return False
		
		except :			
			self.Conexion.cerrarConexion()
			return False
	
	def registra_usuario(self):		
		
		ru = self.rut
		nom = self.nombre
		apeM = self.apellido_M
		apeP = self.apellido_P
		corr = self.correo
		con = self.contrasena
		enc = hashlib.md5()
		enc.update(con.encode())
		x = enc.hexdigest()
		
		
		query = "INSERT INTO usuario VALUES ('"+ru+"','"+nom+"','"+apeM+"','"+apeP+"','"+corr+"','"+x+"')" 
			
		try:	
			if self.Conexion.query(query):			
				self.Conexion.cerrarConexion()
				return True
			else:
				return False
		
		except :			
			self.Conexion.cerrarConexion()
			return False
			
	def modificar_usuario(self):		
		
		ru = self.rut
		nom = self.nombre
		apeM = self.apellido_M
		apeP = self.apellido_P
		corr = self.correo
		con = self.contrasena
		enc = hashlib.md5()
		enc.update(con.encode())
		x = enc.hexdigest()
		
		query = ""
		
		if not x:				
			query = "UPDATE usuario SET nombre='"+nom+"',apellido_Materno='"+apeM+"',apellido_Paterno='"+apeP+"',correo='"+corr+"' WHERE rut='"+ru+"' " 
		
		else:
			query = "UPDATE usuario SET nombre='"+nom+"',apellido_Materno='"+apeM+"',apellido_Paterno='"+apeP+"',correo='"+corr+"', contrasena ='"+x+"' WHERE rut='"+ru+"' " 
			
		try:	
			if self.Conexion.query(query):			
				self.Conexion.cerrarConexion()
				return True
			else:
				return False
		
		except :			
			self.Conexion.cerrarConexion()
			return False
	
	def listar_usuario(self):
	
		query = "SELECT * FROM usuario"

		self.lista = self.Conexion.querBusqueda(query)
		
		return self.lista
	
	
			
			

