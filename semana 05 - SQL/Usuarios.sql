-- Crear la base de datos

create database if not exists usuarios;

-- Usar la base de datos
USE usuarios;

-- Creamos la tabla de personas
create table if not exists personas(
	id int unsigned primary key auto_increment,
    dni varchar (11) unique not null, 
    telefono varchar(20),
    email varchar (50) not null,
	nombre varchar(50)not null,
    apellido varchar(50)not null,
	pais varchar (30),
    cp char(5),
    direccion1 varchar(150),
    direccion2 varchar(150)
    
);



-- Mostramos las columnas de la tabla usuario
describe personas;

-- Eliminamos las columnas referentes a la direccion de la tabla personas

alter table personas drop column pais;
alter table personas drop column cp;
alter table personas drop column direccion1;
alter table personas drop column direccion2;

-- Creamos una nueva tabla "datos" con las columnas que hemos eliminado de la tabla personas
create table if not exists datos(
	id int unsigned primary key auto_increment,
    pais varchar (30) not null,
    cp char(5) not null,
    direccion1 varchar(150) not null,
    direccion2 varchar(150)
);

alter table personas add column idDatos int unsigned,
add foreign key (idDatos) references datos (id);

-- Así sabemos si las tablas están correctas 

show tables;

describe personas;

-- Insertamos los siguientes datos en la Base de datos:
/* ```csv
id,first_name,last_name,email,tlf,DNI,country,cp,addr_line1,addr_line2
1,Irvin,Lethem,ilethem0@google.com.au,993870144,279948941-9,Indonesia,83297,98339 Loftsgordon Road,Babakanbandung
2,Kylie,Mungan,kmungan1@howstuffworks.com,497494899,748551874-7,Philippines,44455,74641 Dwight Avenue,Bilar
3,Yul,Dibbert,ydibbert2@businesswire.com,776631050,215649413-4,Indonesia,62965,9510 Milwaukee Street,Sumberejo
4,Tamra,Mc Gorley,tmcgorley3@studiopress.com,921948685,617064473-7,Norway,54756,8902 Doe Crossing Alley,Steinkjer
5,Elmira,Imbrey,eimbrey4@cpanel.net,304168000,178988896-4,United States,51471,8616 Stephen Hill,Charleston
``` 
*/
-- En primer lugar insertamos los que van en la tabla de datos

insert into datos (pais, cp, direccion1, direccion2)
values	("Indonesia", "83297", "98339 Loftsgordon Road", "Babakanbandung"),
("Philippines", "44455", "74641 Dwight Avenue", "Bilar"),
("Indonesia", "62965", "9510 Milwaukee Street", "Sumberejo"),
("Norway", "54756", "8902 Doe Crossing Alley", "Steinkjer"),
("United States", "51471", "8616 Stephen Hill", "Charleston");

-- Ahora faltaría insertar los datos en las personas

insert into personas (dni, telefono, email, nombre, apellido, idDatos)
values ("279948941-9", "993870144", "ilethem0@google.com.au", "Irvin", "Lethem", 1),
("748551874-7", "497494899", "kmungan1@howstuffworks.com", "Kylie", "Mungan", 2),
("215649413-4", "776631050", "ydibbert2@businesswire.com", "Yul", "Dibbert", 3),
("617064473-7", "921948685", "tmcgorley3@studiopress.com", "Tamra", "Mc Gorley", 4),
("178988896-4", "304168000", "eimbrey4@cpanel.net", "Elmira", "Imbrey", 5);

-- para comprobar que los datos están correctos consultaremos con los siguientes comando: 
select * from personas;

select * from datos;

-- Ahora seleccionaremos el nombre, apellido y número de teléfono de todos los usuarios, ordenador alfabéticamente según su apellido.

select nombre, apellido, telefono
from personas
order by apellido;

-- Ahora consultaremos cuantos usuarios jau que cada país, basándonos en la tabla de datos.

select count(*), pais
from datos
group by pais;

-- Cogemos la base de datos que hemos hecho, seleccionamos los datos de las personas, incluida toda la información de su dirección

select * from personas p
inner join datos d on (p.idDatos = d.id);

-- Actualizamos la tabla de personas para añadir una columna para la edad. Después rellenamos las columnas para los 5 usuarios que existen.

alter table personas add column edad int unsigned;

-- Ahora hacemos un select a la tabla de personas para ver si tiene columna edad.

select * from personas;

-- Y ahora actualizamos los usuarios.

update personas set edad = 30 where id=1;
update personas set edad = 18 where id=2;
update personas set edad = 22 where id=3;
update personas set edad = 40 where id=4;
update personas set edad = 25 where id=5;

-- Ahora volvemos a hacer un select a la tabla de personas para ver los datos están correctamente metidos.

select * from personas;

-- Por último realizaremos una subconsulta para saber la edad de los usuarios mas mayores.

select nombre, edad
from personas
where edad =(
select max(edad) from personas
);

