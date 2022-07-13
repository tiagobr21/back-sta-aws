create table user(
   id int primary key AUTO_INCREMENT,
   name varchar(250),
   email varchar(50),
   password varchar(250),
   status varchar(20),
   role varchar(20),
   UNIQUE(email)
);

insert into user values(default,'Admin','admin@gmail.com','admin','true','admin');