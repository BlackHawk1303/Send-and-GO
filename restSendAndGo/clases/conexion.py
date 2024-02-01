
import MySQLdb

class Conexion():

	def __init__(self): #conexion a base de datos.
		try:
			self.conexion = MySQLdb.connect("localhost","root","","serviprint")
			self.cursor = self.conexion.cursor()
			self.lista = ()
		except MySQLdb.Error as e:
			print("revise la conexion a internet o si la base de datos se encuentra activa")
			print(e)
			
			
	def query (self, query): #Se ejecuta la query
		x = self.cursor.execute(query)
		self.conexion.commit()
		return x
	
	def cerrarConexion(self): #Cierra la conexion
		self.cursor.close()
		self.conexion.close()
		
	def querBusqueda (self, query): #Se ejecuta la query
		self.cursor.execute(query)
		self.lista = self.cursor.fetchall()
		return self.lista #se retorna la tupla	
		
