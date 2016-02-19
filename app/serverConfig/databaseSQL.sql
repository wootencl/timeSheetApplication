CREATE TABLE Persons
(
ID int NOT NULL AUTO_INCREMENT,
LastName varchar(255) NOT NULL,
FirstName varchar(255) NOT NULL,
Email varchar(255),
Role varchar(255),
Password Binary(60),
PRIMARY KEY (ID)
)