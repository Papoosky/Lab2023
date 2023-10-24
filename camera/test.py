import cv2
from ultralytics import YOLO
import time

# model
model = YOLO("camera/yolov8n.pt")

cap = cv2.VideoCapture('rtsp://root:capstone123@192.168.1.89/axis-media/media.amp')

while cap.isOpened():
    success, frame = cap.read()

    if success:
        start = time.perf_counter()
        results = model(frame, conf = 0.6, classes = 0)

        end = time.perf_counter()
        total_time = end - start
        fps = 1 / total_time

        annotated_frame = results[0].plot(conf = False)

        cv2.putText(annotated_frame, f"FPS: {int(fps)}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        cv2.imshow("YOLOv8", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        break

cap.release()
cv2.destroyAllWindows()