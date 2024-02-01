
from clases.conexion import Conexion

class Documento():

	def __init__(self, hojas, doc, rut, tipo, dir, nombre, estado):
		self.cant_hojas = hojas		
		self.id_documento = doc
		self.rut_usuario = rut
		self.tipo_documento = tipo
		self.direccion = dir
		self.nombre = nombre
		self.estado = estado		
		
		self.Conexion = Conexion()
		self.lista = ()
		
		
		
	def lista_Documento(self):
		
		rut = self.rut_Usuario
			
		query = "SELECT * FROM documento WHERE rut = '"+rut+"' and estado ='0'"
			
		self.lista = self.Conexion.querBusqueda(query)
			
		if self.lista is not ():
			return self.lista
			
		else:
			return ()
			
	def insertar_documento(self):
		
		
		query = "INSERT INTO documento (nombre_documento,direccion_documento,estado,hojas,rut,tipo_doc) VALUES ('"+self.nombre+"','"+self.direccion+"','0','"+self.cant_hojas+"','"+self.rut_usuario+"','"+self.tipo_documento+"')"
		
		try:	
			if self.Conexion.query(query):
				return True
			else:
				return False
		
		except:			
			self.Conexion.cerrarConexion()
			return False
		
	#def eliminar_documento(self):
		#nada
	def cambiar_estado(self):
		
		query = "UPDATE documento SET estado = 1 WHERE id ='"+self.id_documento+"' AND estado = 0"
		
		try:	
			if self.Conexion.query(query):			
				self.Conexion.cerrarConexion()
				return True
			else:
				return False
			
		except:			
			self.Conexion.cerrarConexion()
			return False
			
	def insertar_tipo(self,detalle):
		
		
		query = "INSERT INTO tipo_documento(nombre, extension) VALUES ('"+detalle+"','"+self.tipo_documento+"')"
			
		try:	
			if self.Conexion.query(query):			
				self.Conexion.cerrarConexion()
				return True
			else:
				return False
			
		except:			
			self.Conexion.cerrarConexion()
			return False
		
	def buscar_id_documento(self):
		
		
		query = "SELECT * FROM documento WHERE nombre_documento='"+self.nombre+"' AND estado='0'"
		self.lista = self.Conexion.querBusqueda(query)
			
		if self.lista is not ():
			return self.lista
			
		else:
			return ()	

	
		
	def listar_tipo_doc(self):
		
		
		query = "SELECT * FROM tipo_documento"
		self.lista = self.Conexion.querBusqueda(query)
			
		if self.lista is not ():
			return self.lista
			
		else:
			return ()
			
			
			
	def eliminar_extension(self,id):
		
		query = "DELETE FROM tipo_documento WHERE id='"+id+"' "
		
		try:	
			if self.Conexion.query(query):			
				self.Conexion.cerrarConexion()
				return True
			else:
				return False
			
		except:			
			self.Conexion.cerrarConexion()
			return False