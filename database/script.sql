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
    nome varchar(45),
    visitas int default 0,
    caminhoImagemQuadro varchar(50),
    caminhoImagem varchar(50)
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

-- drop user galeriaUser;
-- drop database galeria;

create user galeriaUser identified by '1234';

grant all privileges on galeria.* to 'galeriaUser'@'%';

insert into usuario (nome, email, senha) values ('Erick', 'erick@gmail.com', '1234');

insert into quadro (nome, caminhoImagem, caminhoImagemQuadro) values
	('quadro1', 'assets/card_images/card_image1.png', 'assets/card_images/card_ex.png'),
    ('quadro2', 'assets/card_images/card_image1.png', 'assets/card_images/card_ex.png'),
    ('quadro3', 'assets/card_images/card_image1.png', 'assets/card_images/card_ex.png'),
    ('quadro4', 'assets/card_images/card_image1.png', 'assets/card_images/card_ex.png'),
    ('quadro5', 'assets/card_images/card_image1.png', 'assets/card_images/card_ex.png')
;

select * from avaliacao;
select * from quadro;
select * from usuario;
select u.nome, c.conteudo, c.data_comentario from comentario c inner join usuario u on c.id_usuario = u.idusuario where id_quadro = 1 order by data_comentario desc, idcomentario desc limit 10;

update quadro set visitas = visitas + 1 where idquadro = 1;