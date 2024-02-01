
from clases.conexion import Conexion
import win32api
import win32print
import time as t


ghost = "C:\\Program Files (x86)\\gs\\gs9.27\\bin\\gswin32c.exe"
gsprint = "C:\\Program Files\\Ghostgum\\gsview\\gsprint.exe"
c = win32print.GetDefaultPrinter()

class Impresion():
	def __init__(self,doc ,impr, user, dir):
		
		self.id_Documento= doc
		self.id_Impresion= impr
		self.rut_Usuario= user
		self.directorio= dir
		self.conexion = Conexion()
			
	def imprimir_documento(self):
	
		try:
		
			doc = ""
			
			rut = self.rut_Usuario
			documentos = []		
			fecha = t.strftime("%d/%m/%y")	
			
					
			archivo = self.directorio				
				
			win32api.ShellExecute(0,'open', gsprint, '-ghostscript "'+ghost+'" -printer "'+c+'" "'+archivo+'"','.',0)
				
			query_a= "UPDATE documento SET estado= 1 WHERE nombre_documento ='"+doc+"' AND estado = 0"			
			self.conexion.query(query_a)
			query_b = "INSERT INTO impresion (rut,id_documento,id_impresora,fecha_impreso) VALUES ('"+self.rut_Usuario+"','"+self.id_Documento+"','"+self.id_Impresion+"','"+fecha+"')" 
			
			self.conexion.query(query_b)
			self.conexion.cerrarConexion()	
		except Exception as e:			
			print("No posee documentos para imprimir, " +str(e))
			
			
	def buscar_impresora(self,nombre):
	
	
	
		query = "SELECT * FROM impresora WHERE nombre_impresora='"+nombre+"'" 
		lista = self.conexion.querBusqueda(query)
		
		
		try:	
			if lista is not ():			
				self.conexion.cerrarConexion()
				return True
			else:
				return False
		
		except :			
			self.conexion.cerrarConexion()
			return False
			
	def listar_impresora(self):

		query = "SELECT * FROM impresora"
		

		lista = self.conexion.querBusqueda(query)
		
		return lista;
		
		
		
	def ingresar_impresora(self, impresora):
		
		valor = 0
		query = "INSERT INTO impresora(nombre_impresora,hojas_impresa) VALUES ('"+impresora+"','"+str(valor)+"')" 
		
		try:	
			if self.conexion.query(query):			
				self.conexion.cerrarConexion()
				return True
			else:
				return False
		
		except :			
			self.conexion.cerrarConexion()
			return False
			
			
	def eliminar_impresora(self, id):
		
			
		query = "DELETE FROM impresora WHERE id='"+id+"'" 
		
		try:	
			if self.conexion.query(query):			
				self.conexion.cerrarConexion()
				return True
			else:
				return False
		
		except :			
			self.conexion.cerrarConexion()
			return False
		