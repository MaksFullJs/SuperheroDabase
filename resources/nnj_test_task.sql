create database if not exists nnj_test_task;

use nnj_test_task;

drop table if exists superhero_image;
drop table if exists superhero;

create table superhero (
	id int not null auto_increment,
    nickname varchar(100) not null,
    real_name varchar(100) not null,
    origin_description text not null,
    superpowers json,
    catch_phrase varchar(255) not null,
    constraint PK_superhero primary key (id)
);

create table superhero_image (
	id int not null auto_increment,
    url varchar(255),
    superhero_id int not null,
    constraint PK_superhero_image primary key (id)
);

alter table superhero_image add constraint FK_Image_superhero foreign key (superhero_id)
    references superhero (id);
    








