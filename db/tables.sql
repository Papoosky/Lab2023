CREATE TABLE User
(
  User_id INT NOT NULL,
  Nombre VARCHAR(50) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  Carreer VARCHAR(50) NOT NULL,
  Year INT NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  Magister VARCHAR(5) NOT NULL,
  Hash_user VARCHAR(100) NOT NULL,
  PRIMARY KEY (User_id)
);

CREATE TABLE Attendance
(
  Entry_date DATE NOT NULL,
  Attendance_id INT NOT NULL,
  Exit_date DATE NOT NULL,
  User_id INT NOT NULL,
  PRIMARY KEY (Attendance_id),
  FOREIGN KEY (User_id) REFERENCES User(User_id)
);

CREATE TABLE Cam_discrepancy
(
  Date DATE NOT NULL,
  Cam_discrepancy_id INT NOT NULL,
  Qr_count INT NOT NULL,
  Cam_count INT NOT NULL,
  PRIMARY KEY (Cam_discrepancy_id)
);