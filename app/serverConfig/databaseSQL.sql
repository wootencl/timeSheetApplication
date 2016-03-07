CREATE TABLE Persons
(
ID binary(16) NOT NULL,
LastName varchar(255),
FirstName varchar(255),
Email varchar(255),
Role varchar(255),
Password CHAR(60),
PRIMARY KEY (ID)
);