import mysql.connector
import bcrypt
import requests
import qrcode
import os


def send_mail(email,img):
    url = 'https://api.emailjs.com/api/v1.0/email/send'
    headers = {'Content-Type': 'application/json'}
    template_params = {
        'user_email': email,
        'img': img
    }
    payload = {
        'service_id': 'service_9ihw8jk',
        'template_id': 'template_x7r5vhi',
        'user_id': 'WAGJKS3qNlvlNJ5Cl',
        'template_params': template_params
    }
    print(payload)
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print('Email sent successfully.')   
    else:
        print(f'Failed to send email. Status code: {response.status_code}, Response: {response.text}')

def connect():
    # Configura la conexión a la base de datos
    conexion = mysql.connector.connect(
        host="localhost",       # Cambia a la dirección de tu servidor MySQL
        user="root",      # Tu nombre de usuario
            # Tu contraseña
        database="lab2023"    # El nombre de tu base de datos
    )
    return conexion

def crear_cuenta(nombre,apellido,email,carrera,ano, magister):
    connection = connect()
    cursor = connection.cursor()
    salt = bcrypt.gensalt()
    tohash= (nombre+apellido+email).encode('utf-8')
    hash= bcrypt.hashpw(tohash, salt)
    cursor.execute("INSERT INTO User (nombre,apellido,email,carreer,year, magister, hash_user) VALUES (%s, %s, %s, %s, %s, %s,%s)", (nombre,apellido,email,carrera,ano, magister,hash))
    connection.commit()
    connection.close()
    img = qrcode.make(hash)
    path = os.path.normpath(os.path.join(os.path.dirname(__file__), 'imgQr')) #path to the file
    path = path.replace('\\', '/')
    print (path)

    img.save(f"{path}/" + f"{email}.png")
    
    #send_mail(email,img)
    # try:
    #     #send_mail(email, img)
    #     return {'success': True}
    # except Exception as e:
    #     return {'success': False, 'error': str(e)}
    return {'success': True}

def insert_attendance(Transcript):
    connection = connect()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO attendance_2 (Transcript) VALUES (%s)", (Transcript,))
    connection.commit()
    connection.close()
    return {'success': True}


