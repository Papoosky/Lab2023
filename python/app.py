from flask import Flask, flash, request, redirect, url_for, send_file
from flask_cors import CORS, cross_origin
from query import *


app = Flask(__name__)
app.debug = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

    
@app.route('/post_data',methods = ['POST', 'GET'])
def post_data():
    #Example request
    try: 
        if request.method == 'POST':
            data = request.json
            cuenta = crear_cuenta(data["nombre"],data["apellido"],data["email"],data["password"],data["carrera"],data["ano"],data["magister"])
            return cuenta
        else:
            return("sexo")
    except Exception as e:
        print(e)
        return {"status": "no ok"}
    
@app.route('/post_data_test',methods = ['POST', 'GET'])
def post_data_test():
    #Example request
    try: 
        if request.method == 'POST':
            data = request.json
            cuenta = insert_attendance(data["transcript"])
            return cuenta
        else:
            return("sexo")
    except Exception as e:
        print(e)
        return {"status": "no ok"}
    
@app.route('/login',methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.json
        qrhash = login_verificate(data['email'],data['password'])
        print (qrhash[0])
        return (qrhash[0])
    else:
        return ('algo salió mal')
    
@app.route('/post_data_in',methods = ['POST', 'GET'])
def post_data_in():
    try: 
        if request.method == 'POST':
            data = request.json
            insert = instert_in(data["entrada"])
            return insert
        else:
            return("Algo ocurrio")
    except Exception as e:
        print(e)
        return {"status": "no ok"}

@app.route('/post_data_out',methods = ['POST', 'GET'])
def post_data_out():
    try: 
        if request.method == 'POST':
            data = request.json
            insert = insert_out(data["salida"])
            return insert
        else:
            return("Algo ocurrio")
    except Exception as e:
        print(e)
        return {"status": "no ok"}

    
if __name__ == '__main__':
    app.run()