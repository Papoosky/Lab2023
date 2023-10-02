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



def crear_cuenta(nombre,apellido,email,carrera,ano, magister):
    connection = mysql.connector.connect( user='root', password='1234', port="3306", database='lab2023')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO User (nombre,apellido,email,carreer,year, magister) VALUES (%s, %s, %s, %s, %s, %s)", (nombre,apellido,email,carrera,ano, magister))
    connection.commit()
    connection.close()
    return {'success': True}

def insert_attendance(Transcript):
    connection = mysql.connector.connect( user='root', password='1234', port="3306", database='lab2023')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO attendance_2 (Transcript) VALUES (%s)", (Transcript,))
    connection.commit()
    connection.close()
    return {'success': True}

