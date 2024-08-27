 create table patient(
    PID varchar(3) primary key check (PID like 'P%'),
    Pname varchar(25)
 );

create table doctor(
    DID varchar(3) primary key check (DID like 'D%'),
    Dname varchar(25),
    Dtype varchar(15) check (Dtype in ('In-house', 'Visiting'))
 );

create table tHistory(
    PID varchar(3) references patient(PID),
    DID varchar(3) references doctor(DID),
    Symptom text(50),
    Diagnosis text(50),
    Medicine text(30),
    Test text(30)
);

create table receipt(
    PID varchar(3) references patient(PID),
    Pmode varchar(10),
    VisitDate date
);

insert into doctor (DID, Dname, Dtype) values 
("D01", "Dr. R. Mukherjee", "Visiting"),
("D02", "Dr. I. Sarkar", "In-House"),
("D03", "Dr. P. Sen", "In-House"),
("D04", "Dr. S. Kumar", "Visiting"),
("D05", "Dr. A. Ghosh", "In-House");


insert into patient (PID, Pname) values 
("P01", "Aryan Gupta"),
("P02", "Rahul Roy"),
("P03", "Ishan Saha"),
("P04", "Mehul Ghosh"),
("P05", "Priti Halder");

insert into tHistory(PID, DID, Symptom, Diagnosis, Medicine, Test) values
("P01", "D05", "Cold and Cough", "Common Flu", "Paracetamol", "Chest X-ray"),
("P01", "D02", "Cold and Cough", "Common Flu", "Paracetamol", "Chest X-ray"),
("P02", "D01", "Stomach Ache, Discoloured Poop", "Ulcer", "Ipzoine", "Upper and lower abdomen ultrasonography"),
("P02", "D03", "Stomach Ache, Discoloured Poop", "Ulcer", "Ipzoine", "Upper and lower abdomen ultrasonography"),
("P02", "D05", "Stomach Ache, Discoloured Poop", "Ulcer", "Ipzoine", "Upper and lower abdomen ultrasonography"),
("P03", "D05", "Headache, Blurry vision", "Brain Tumor", "Lopudopine", "Brain CT"),
("P03", "D01", "Headache, Blurry vision", "Brain Tumor", "Lopudopine", "Brain CT");

insert into receipt(PID, Pmode, VisitDate) values
("P01", "Online", "2024-06-12"),
("P02", "Offline", "2024-06-29"),
("P03", "Online", "2024-07-16");