CREATE TABLE files (
	id SERIAL PRIMARY KEY,
  name text not null,
  chef_id int not null
)

CREATE TABLE chefs (
	id SERIAL PRIMARY KEY,
  name text not null,
  created_At int not null
)

CREATE TABLE files (
	id SERIAL PRIMARY KEY,
  title text not null,
  ingredients text[] not null,
  information text[] not null,
  created_At int not null,
  chef_id int not null
)

CREATE TABLE recipe_files (
	id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  file_id INTEGER REFERENCES files(id)
)

Insert Into chefs 
(id, name, created_at) 
values (1, 'Cleide Pereira', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (2, 'Carlos Ferraz', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (3, 'Gabriele Peixoto', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (4, 'Beatriz Vasconcelos', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (5, 'Marcela', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (6, 'Vanessa', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (7, 'Charles', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (8, 'Breno Silva', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (9, 'Ricardo Pereira', 2020-07-05);
Insert Into chefs 
(id, name, created_at) 
values (10, 'Bianca Soares', 2020-07-05);



INSERT INTO recipes 
(id, title, ingredients, preparation, 
 information, created_at, chef_id)
 values (1, 'Charuto de Repolho', 
 '{1 repolho grande,
 700 g de carne moída de primeira,
3 xícaras de arroz cru,
cebola picada, alho picado, pimenta picada, caldo de carne em pó (ou legumes),
sal a gosto, 1 lata de pomarola,
mais ou menos 3 a 4 xícaras de água}', 
'{Separe as folhas do repolho tirando a parte do meio (talo),
Coloque as folhas para cozinhar em água fervendo até que elas fiquem moles, reserve,
Em uma vasilha misture o arroz, a carne moída, a cebola, o alho, o caldo de carne e o sal,
Amasse bem até que todos os ingredientes estejam bem misturados,
Abra a folha em uma superfície e coloque a mistura de arroz e carne e enrole como se fosse um rocambole}', 
'Saboreie, bon apetite', 2020-07-05, 1)