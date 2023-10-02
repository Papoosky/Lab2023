from flask import Flask, flash, request, redirect, url_for, send_file
from flask_cors import CORS, cross_origin
from server import *


app = Flask(__name__)
app.debug = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'


@app.route('/get_hello',methods = ['POST', 'GET'])
def get_hello():
    #Example request
    try: 
        if request.method == 'POST':
            # data = request.json
            return {"status": "Hello world!"}
        else:
            return("no get ono")
    except Exception as e:
        print(e)
        return {"status": "no ok"}