import mysql.connector
import bcrypt
import requests
import os

salt = bcrypt.gensalt()

def connect():
    # Configura la conexión a la base de datos
    conexion = mysql.connector.connect(
        host="localhost",       # Cambia a la dirección de tu servidor MySQL
        user="root",      # Tu nombre de usuario
            # Tu contraseña
        database="lab2023"    # El nombre de tu base de datos
    )
    return conexion

def crear_cuenta(nombre,apellido,email,password,carrera,ano, magister):
    connection = connect()
    cursor = connection.cursor()
    tohash= (nombre+apellido+email).encode('utf-8')
    hash= bcrypt.hashpw(tohash, salt)
    passtohash= bcrypt.hashpw(password.encode('utf-8'), salt)
    password= passtohash.decode('utf-8')
    cursor.execute("INSERT INTO User (name,last_name,email, password, carreer,year, magister, hash_user) VALUES (%s, %s, %s, %s, %s, %s,%s,%s)", (nombre,apellido,email, password,carrera,ano, magister,hash))
    connection.commit()
    connection.close()
    return {'success': True}

def insert_attendance(Transcript):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO attendance_2 (Transcript) VALUES (%s)", (Transcript,))
    connection.commit()
    connection.close()
    return {'success': True}

def instert_in(registro):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO attendance (Hash_user,Entry_date) VALUES (%s, NOW())", (registro,))
    connection.commit()
    connection.close()
    return {'success': True}

def insert_out(registro):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO attendance (Hash_user,Exit_date) VALUES (%s, NOW())", (registro,))
    connection.commit()
    connection.close()
    return {'success': True}

def login_verificate(email, password):
    connection = connect()
    cursor = connection.cursor()
    passtohash= bcrypt.hashpw(password.encode('utf-8'), salt)
    password= passtohash.decode('utf-8')
    cursor.execute("SELECT hash_user FROM user WHERE email = %s AND password = %s ", (email, password))
    print("mail= " + email+ "password= " + password)
    result = cursor.fetchone()
    print('resultado = ',result)
    connection.close()
    return result

