from flask import Flask, flash, request, redirect, url_for, send_file, Response
from flask_cors import CORS, cross_origin
from query import *
import cv2
# from ultralytics import YOLO
import time

# model
# model = YOLO("yolov8n.pt")

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

    
# def camera():
#     cap = cv2.VideoCapture(0)

#     while True:
#         success, frame = cap.read()

#         if success:
#             start = time.perf_counter()
#             results = model(frame, conf = 0.6, classes = 0, verbose = False)

#             end = time.perf_counter()
#             total_time = end - start
#             fps = 1 / total_time

#             annotated_frame = results[0].plot(conf = False)

#             cv2.putText(annotated_frame, f"FPS: {int(fps)}", (5, 25), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
#             cv2.putText(annotated_frame, f"Personas: {len(results[0])}", (5, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

#             yield annotated_frame

# def gen_frames():
#     while True:
#         frame = camera()
#         for frame in frame:
#             ret, buffer = cv2.imencode('.jpg', frame)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    

# @app.route('/camera')
# def video_feed():
#     return Response(gen_frames(),
#                     mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run()