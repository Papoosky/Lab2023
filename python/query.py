import mysql.connector

def connect():
    # Configura la conexión a la base de datos
    conexion = mysql.connector.connect(
        host="localhost",       # Cambia a la dirección de tu servidor MySQL
        user="root",      # Tu nombre de usuario
        password="1234",  # Tu contraseña
        database="lab2023"    # El nombre de tu base de datos
    )
    return conexion

