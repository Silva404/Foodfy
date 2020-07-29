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
(id, name, created_at, file_id) 
values (1, 'Cleide Pereira', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (2, 'Carlos Ferraz', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (3, 'Gabriele Peixoto', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (4, 'Beatriz Vasconcelos', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (5, 'Marcela', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (6, 'Vanessa', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (7, 'Charles', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (8, 'Breno Silva', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (9, 'Ricardo Pereira', 2020-07-05, 2);
Insert Into chefs 
(id, name, created_at, file_id) 
values (10, 'Bianca Soares', 2020-07-05, 2);



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

INSERT INTO recipes 
(id, title, ingredients, preparation, 
 information, created_at, chef_id)
 values (2, 'Tender Recheado', 
 '{150g de azeite,
 50 g de farinha de trigo,
500ml de leite integral,
50g de queijo emmental ralado,
50g de queijo gruyere ralado,
1 maço de espinafre,
1 batatas cortadas em rodela,
1 cenouras cortadas em rodelas}', 
'{Em uma panela, colocar a manteiga e esperar derreter,
Juntar a farinha e misturar até ela começar a espumar, Adicionar o leite morno e mexer com o auxílio de um fouet para não empelotar, e misturar até engrossar,
Acrescentar o espinafre e misturar até eles murcharem,
Adicionar os queijos e misturar até derreter,
Cortar o tender em fatias de 1cm aproximadamente, mas não até o final, deixando uma base,
Rechear cada fatia intercalando, uma com cenoura, outra com batata e outra com o creme de queijos e espinafre. Repetir o processo até terminar,
Levar ao forno pré-aquecido à 180 graus por, aproximadamente, 1 hora}', 
'Surpreenda seus familiares na ceia de Natal com esse delicioso tender recheado!', 2020-07-05, 1)


INSERT INTO recipes 
(id, title, ingredients, preparation, 
 information, created_at, chef_id)
 values (3, 'Lentilha da Sorte', 
 '{1 colher de sopa de manteiga,
 1 cebola em rodelas finas + 1 cebola em cubos,
1 colher de açúcar,
500g de lentilha Yoki,
500g de lentilha Yoki,
2 ramos de tomilho,
1 colher de sopa de azeite de oliva,
2 dentes de alho picados,
120g de linguiça fininha picada,
250g de costelinha defumada,
Sal}', 
'{Aquecer uma frigideira, derreter a manteiga e dourar a cebola, em seguida juntar o açúcar e cozinhar até caramelar.Reservar.,
Cozinhar a lentilha com o caldo e o tomilho até que os grãos estejam macios.,
Em uma frigideira, aquecer o azeite e dourar a cebola e o alho.,
Acrescentar a linguiça e a costelinha defumada e refogar por, aproximadamente, 5 minutos ou até dourar.,
Juntar as carnes à lentilha já cozida e deixar cozinhar por mais 20 minutos.,
Corrigir o sal da lentilha, caso necessário, e servir com a cebola caramelada.}', 
'Essa receita é perfeita para garantir boa sorte no novo ano!', 2020-07-05, 5)