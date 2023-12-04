#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template
#from flask import request

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# No es necesario instalar, es parte del sistema standard de Python
import os
import time
#--------------------------------------------------------------------



app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

#--------------------------------------------------------------------
class Usuario:
    #----------------------------------------------------------------
    # Constructor de la clase
    #----------------------------------------------------------------
    def __init__(self, host, user, password, database):
        # Primero, establecemos una conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor=self.conn.cursor()

        #Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            #Si la base de datos no existe, la creamos
            if err.errno==mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database=database
            else:
                raise err
            
        #Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios(
            documento INT,
            nombre VARCHAR(25) NOT NULL,
            apellido VARCHAR(25) NOT NULL,
            correo VARCHAR(30) NOT NULL,
            contraseña VARCHAR(15) NOT NULL,
            provincia VARCHAR(19) NOT NULL
                            )''')
        self.conn.commit()

        #Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor=self.conn.cursor(dictionary=True)

    #----------------------------------------------------------------
    #Verificamos si ya existe un usuario con ese numero de documento
    #----------------------------------------------------------------
    def agregar_usuario(self, documento, nombre, apellido, password, correo, provincia):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE documento = {documento}")
        usuario_existe=self.cursor.fetchone()
        if usuario_existe:
            return False
        
        sql="INSERT INTO usuarios(documento, nombre, apellido, password, correo, provincia) VALUES(%s, %s, %s, %s, %s, %s)"
        valores=(documento, nombre, apellido, password, correo, provincia)

        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
    
    #----------------------------------------------------------------
    def consultar_usuario(self, documento):
        # Consultamos un producto a partir de su documento
        self.cursor.execute(f"SELECT * FROM usuarios WHERE documento = {documento}")
        return self.cursor.fetchone()
    
    #----------------------------------------------------------------
    #Mostramos los datos de un usuario a partir de su documento
    #----------------------------------------------------------------
    def modificar_usuario(self, documento, nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_contraseña, nueva_provincia):
        sql="UPDATE usuario SET nombre =%s, apellido=%s, correo=%s, contraseña=%s, provincia=%s WHERE documento =%s"
        valores=(nuevo_nombre, nuevo_apellido, nuevo_correo, nueva_contraseña, nueva_provincia, documento)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------
    def listar_usuarios(self):
        self.cursor.execute("SELECT * FROM usuario")
        usuario=self.cursor.fetchall()
        return usuario
    #----------------------------------------------------------------

    def eliminar_usuario(self, documento):
        #Eliminamos un usuario por medio de su documento
        self.cursor.execute(f"DELETE FROM usuario WHERE documento={documento}")
        self.conn.commit()
        return self.cursor.rowcount > 0

    #----------------------------------------------------------------
    #Mostramos los datos de un usuario a partir de su documento
    #----------------------------------------------------------------
    def mostrar_usuario(self,documento):
        usuario=self.consultar_usuario(documento)
        if usuario:
            print("-" * 40)
            print(f"Documento..: {usuario['documento']}")
            print(f"Nombre.....: {usuario['nombre']}")
            print(f"Apellido...: {usuario['apellidos']}")
            print(f"Correo.....: {usuario['correo']}")
            print(f"Password...: {usuario['password']}")
            print(f"Provincia..: {usuario['provincia']}")
            print("-" * 40)
        else:
            print("Usuario no encontrado.")

#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
user=Usuario(host='localhost', user='root', password='', database='miapp')

#--------------------------------------------------------------------
# ACCIONES SOBRE BASE USUARIOS
#--------------------------------------------------------------------
#--------------------------------------------------------------------
@app.route("/usuariostp", methods=["GET"])
def listar_usuarios():
    usuarios=user.listar_usuarios()
    return jsonify(usuarios)

#--------------------------------------------------------------------
@app.route("/usuariostp/<int:documento>", methods=["GET"])
def mostrar_usuario(documento):
    usuario = user.consultar_usuario(documento)
    if usuario:
        
        return jsonify(usuario),201
        
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

#--------------------------------------------------------------------

@app.route("/usuariostp", methods=["POST"])
def agregar_usuario():
    documento = request.form['documento']
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    correo = request.form['correo']
    password = request.form['password']
    provincia = request.form['provincia']

    print("*"*20)
    
    existeusu = user.mostrar_usuario(documento)
    if existeusu:
        return jsonify({"mensaje": "Usuario ya existe"}), 400
    
    if user.agregar_usuario(documento, nombre, apellido, correo, password, provincia):
        return jsonify({"mensaje": "Usuario agregado"}), 201
    else:
        return jsonify({"mensaje": "Usuario ya existe"}), 400

#--------------------------------------------------------------------

@app.route("/usuariostp/<int:documento>", methods=["PUT"])
def modificar_usuario(documento):
    
    # Datos del usuario
    data = request.form
    nueva_password  = data.get("password")
    
    # Actualización del usuario
    if user.modificar_usuario(documento, nueva_password):
        return jsonify({"mensaje": "Usuario modificado"}), 200
    else:
        return jsonify({"mensaje": "Usuario encontrado"}), 404


#--------------------------------------------------------------------

@app.route("/usuariostp/<int:documento>", methods=["DELETE"])
def eliminar_usuario(documento):
    # Primero, se obtiene la info del usuario
    usuario = user.consultar_usuario(documento)
    if usuario:
        # Luego, elimina el usu
        if usuario.eliminar_usuario(documento):
            return jsonify({"mensaje": "Usuario eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el usuario"}), 500
    else:
        return jsonify({"mensaje": "usuario no encontrado"}), 404


#--------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)