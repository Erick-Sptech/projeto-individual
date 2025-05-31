create database galeria;
use galeria;

create table usuario (
	idusuario int primary key auto_increment,
    nome varchar(45) unique not null,
    email varchar(45) unique not null,
    senha varchar(45) not null
);

create table quadro (
	idquadro int primary key auto_increment,
    nome varchar(45)
);

create table avaliacao (
	avaliacao tinyint(1),
    fkquadro int,
    fkusuario int,
    primary key(fkquadro, fkusuario),
    constraint fkquadro foreign key (fkquadro) references quadro (idquadro),
    constraint fkusuario foreign key (fkusuario) references usuario (idusuario)
);

create table comentario (
	idcomentario int auto_increment,
    conteudo varchar(150) not null,
    data_comentario datetime default current_timestamp,
    id_quadro int,
    id_usuario int,
    primary key (idcomentario, id_quadro, id_usuario),
    constraint id_quadro foreign key (id_quadro) references quadro (idquadro),
    constraint id_usuario foreign key (id_usuario) references usuario (idusuario)
);