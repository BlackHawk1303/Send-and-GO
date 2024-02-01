#!flask\Scripts\python

from clases.usuario import Usuario
from clases.impresion import Impresion
from clases.documento import Documento
from clases.admin import Admin

from flask import Flask
from flask import request
from flask import Flask
from flask import jsonify
from flask import Response
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_cors import cross_origin

import os
import json

CARPETA_SUBIDA = "C:/restSendAndGo/subidas"
EXTENSIONES = set(['pdf'])

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/documento/tipo', methods=['POST'])
@cross_origin(supports_credentials=True)
def listar_doc():
	
	if request.method == 'POST':
		tipo = request.values.get('txt_tipo')
		ext = request.values.get('txt_extension')
		
		if not tipo or not ext:
			return ("Campos Vacios")
		else:
			doc = Documento("" , "" , "" , tipo ,"", "", "")
			res = doc.insertar_tipo(ext)
			
			if res == True:
				return "True"
			else:
				return "El usuario ya existe"
			

@app.route('/extension', methods=['GET'])
@cross_origin(supports_credentials=True)
def listar_extension():
	
	if request.method == 'GET':
		
		ext = Documento("" , "" , "" , "" ,"", "", "")
		resultado = ext.listar_tipo_doc()
		
		lista = {}		
		if resultado is not (): #revisa si la lista no esta vacia, si no lo esta significa que encontro el usuario 
			for l , x in enumerate(resultado): #lista los datos de la tupla
				
				lista.update(
							{
							resultado[l][0]: {
								'nombre': resultado[l][1] ,
								'tipo': resultado[l][2] ,
							},
						})
				
			 
		response = app.response_class(
        response=json.dumps(lista),
        status=200,
        mimetype='application/json'
		)	
			
		return response
		

@app.route('/extension/eliminar/<id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def eliminar_extension(id):

	ext = Documento("" , "" , "" , "" ,"", "", "")
	
	res = ext.eliminar_extension(id)
	
	if res:
		return "Eliminado Correctamente"
	else:
		return "No se puede eliminar"
	




@app.route('/admin', methods=['POST'])
@cross_origin(supports_credentials=True)
def inicio_admin():

	if request.method == 'POST':
		user = request.values.get('txtUser')
		contr = request.values.get('txtContra')		
		if not user or  not contr:
			return ("Campos Vacios")
		else:
			ad = Admin(user,contr)
			if ad.inicio_sesion():
				return "True"
			else:
				return "False" 

@app.route('/usuarios/inicio-sesion/', methods=['POST'])#login
def inicio_sesion():

	if request.method == 'POST':
	
		rut = request.values.get('txtRut')
		contr = request.values.get('txtContra')

		if not rut or not contr :
			return ("Campos Vacios")
			
		else:
		
			u = Usuario("", "", "", rut, "", contr)
			res = u.inicio_sesion()
			
			if res:
				lista = {
							'nombre':  res.nombre  ,
							'appellido_m':  res.apellido_M ,
							'appellido_p': res.apellido_P ,
							'rut':  res.rut ,
							'correo':  res.correo ,
							'contrasena':  res.contrasena							
						}
						
				return  jsonify(lista)
			else:
				return "el usuario no existe"	
	
	
@app.route('/usuarios/registrar/', methods=['POST'])
@cross_origin(supports_credentials=True)
def registar_usuario():
	
	if request.method == 'POST':
		
		rut = request.values.get('txt_rut')
		nom = request.values.get('txt_nombre')
		contr = request.values.get('txt_contra')
		app_m = request.values.get('txt_apellido_M')
		app_p = request.values.get('txt_apellido_P')
		correo = request.values.get('txt_correo')
		
		u = Usuario(app_m, app_p, nom, rut, correo, contr)
		
		estado = u.registra_usuario()
		
		if estado == True:
			return "True"
		else:
			return "El usuario ya existe"
			
			
			
@app.route('/usuarios/modificar/', methods=['POST'])
@cross_origin(supports_credentials=True)
def modificar_usuario():
	
	if request.method == 'POST':
		
		rut = request.values.get('txt_rut')
		nom = request.values.get('txt_nombre')
		contr = request.values.get('txt_contra')
		app_m = request.values.get('txt_apellido_M')
		app_p = request.values.get('txt_apellido_P')
		correo = request.values.get('txt_correo')
		
		u = Usuario(app_m, app_p, nom, rut, correo, contr)
		
		estado = u.modificar_usuario()
		
		if estado == True:
			return "True"
		else:
			return "ha ocurrido un problema"			

@app.route('/usuarios/<rut>', methods=['GET'])
@cross_origin(supports_credentials=True)
def buscar_usuario(rut):
	
	u = Usuario("", "", "", rut, "", "")
	
	res = u.busqueda_usuario()
	
	if res:
		lista = {
					'nombre':  res.nombre  ,
					'appellido_m':  res.apellido_M ,
					'appellido_p': res.apellido_P ,
					'rut':  res.rut ,
					'correo':  res.correo,
				}
						
		return  jsonify(lista)
	else:
		return "el usuario no existe"

@app.route('/usuarios', methods=['GET'])
@cross_origin(supports_credentials=True)
def listar_usuario():
		
		user = Usuario("","","","","","")
		resultado = user.listar_usuario()		
		lista = {}		
		if resultado is not (): #revisa si la lista no esta vacia, si no lo esta significa que encontro el usuario 
			for l , x in enumerate(resultado): #lista los datos de la tupla
				
				lista.update(
							{
							resultado[l][0]: {
								'nombre': resultado[l][1] ,
								'app_m': resultado[l][2] ,
								'app_p': resultado[l][3] ,
								'correo': resultado[l][4] ,
							},
				
						})
				
			 
		response = app.response_class(
        response=json.dumps(lista),
        status=200,
        mimetype='application/json'
		)	
			
		return response

@app.route('/usuarios/eliminar/<rut>', methods=['GET'])
@cross_origin(supports_credentials=True)
def elimina_usuario(rut):
	
	u = Usuario("", "", "", rut, "", "")
	
	res = u.elimina_usuario()
	
	if res:
		return "Eliminado Correctamente"
	else:
		return "No se puede eliminar"


@app.route('/usuario/imprimir/<rut>', methods=['POST'])
def imprimir_documento(rut):
	if request.method == 'POST':
		
		directorio = CARPETA_SUBIDA+"/"+rut
		
		if not os.path.exists(directorio):
			os.makedirs(directorio)
			
		archivo = request.files['file']
		#impresora = request.form['impresora']
		
		documento = secure_filename(archivo.filename)
		
		archivo.save(os.path.join(directorio,documento))		
		c = directorio+"/"+documento
		tipo_doc = documento.rsplit(".",1)[1].lower()
		doc = Documento("0","",rut,tipo_doc,"subidas/"+documento, documento,"0")
		doc.insertar_documento()
		res = doc.buscar_id_documento()
		id = ""
		
		if res:			
			for l in res:
				id = l[0]
				
				
			imprimir = Impresion(str(id),"1",rut,c)	
			imprimir.imprimir_documento()
		
		
		
		return "imprimir"


		
@app.route('/impresora/<codigo>', methods=['GET'])
def buscar_impresora(codigo):

	if request.method == 'GET':
		i = Impresion("","","","")
		estado = i.buscar_impresora(codigo)
		
		if estado == True:
			return "True"
		else:
			return "No existe la impresora"
	
@app.route('/impresora/ingresar', methods=['POST'])
@cross_origin(supports_credentials=True)
def ingresar_impresora():
	impr = request.values.get('txt_impr')
	
	if not impr:
			return ("Campos Vacios")
	
	else:
		i = Impresion("","","","")
		
		res = i.ingresar_impresora(impr)
		
		if res:
			return("True")
		else:
			return ("Error Al ingresar")
			
@app.route('/impresora', methods=['GET'])
@cross_origin(supports_credentials=True)
def listar():

	impr = Impresion("","","","")
	resultado = impr.listar_impresora()		
	lista = {}		
	if resultado is not (): #revisa si la lista no esta vacia, si no lo esta significa que encontro el usuario 
		for l , x in enumerate(resultado): #lista los datos de la tupla
			
			lista.update(
						{
							resultado[l][0]: {
								'nombre_impr': resultado[l][1] ,
								'hojas': resultado[l][2] ,								 
							},
				
						})
				
			 
	response = app.response_class(
    response=json.dumps(lista),
    status=200,
    mimetype='application/json'
	)	
			
	return response

@app.route('/impresora/eliminar/<id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def eliminar_impresora(id):
	i = Impresion("", "", "", "")
	
	res = i.eliminar_impresora(id)
	
	if res:
		return "Eliminado Correctamente"
	else:
		return "No se puede eliminar"
if __name__ == '__main__':
    app.run(host='0.0.0.0', port="5000" ,debug=True)