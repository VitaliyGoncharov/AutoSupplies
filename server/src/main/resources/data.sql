insert into users (email, password) values ('admin@gmail.com','$2a$11$uPbRVGe07TtmFrBGKrliUOGx8DpdqQ2Bn8oecZ//y/DchReYSuqdK')
insert into users (email, password, firstname, lastname, birth, gender, address, phone) values ('manager@gmail.com','$2a$11$uPbRVGe07TtmFrBGKrliUOGx8DpdqQ2Bn8oecZ//y/DchReYSuqdK','David','Belcher','1996-08-26','male','Fremont, CA','+1 555-427-5677')
insert into users (email, password) values ('user@gmail.com','$2a$11$uPbRVGe07TtmFrBGKrliUOGx8DpdqQ2Bn8oecZ//y/DchReYSuqdK')
insert into role (name) values ('ROLE_ADMIN'), ('ROLE_MANAGER'), ('ROLE_USER')

insert into catalog (parent_id, cat_name, path_name) values (0, 'Масло и смазки','oil-and-grease'), (0, 'Диски', 'disks'), (0,'Аккумуляторы','accumulator')

insert into product (title, image, price) values ('Масло Castrol','https://ozon-st.cdn.ngenix.net/multimedia/audio_cd_covers/1023562045.jpg',50)
insert into product (title, image, price) values ('Масло Toyota','https://ozon-st.cdn.ngenix.net/multimedia/audio_cd_covers/1022715721.jpg',60)
insert into product (title, image, price) values ('Масло Mitsubisi','https://autolans.ru/d/mz320757.jpg',110)
insert into product (title, image, price) values ('Масло Motul Scooter для скутеров','https://motorov.net/upload/iblock/f9e/f9e845e04a81be5ad749579d9439ddb6.png',40)
insert into product (title, image, price) values ('Масло GAZPROMNET','https://dvizhok.su/i/files/images/Gazpromneft-05(1).jpg',90)
insert into product (title, image, price) values ('Масло Лукойл','https://avatars.mds.yandex.net/get-mpic/195452/img_id1075648514582913699/9hq',30)
insert into product (title, image, price) values ('Масло GTX Castrol','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhuVogGPWb_3o157AZDTSrYd8ozVSfNAGYp02J82OcIPuK1p-0',57)

insert into catalog_product(catalog_id, product_id) values (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7)

insert into product (title, image, price) values ('Диски ALUTEC POISON SCHWARZ 6X16 4X100 ET40 D58.1','https://a.d-cd.net/16e2be8s-960.jpg',62)
insert into product (title, image, price) values ('Колесные диски K&K Кристалл 6x15/5x112 D66.6 ET40 Алмаз черный','http://avatars.mds.yandex.net/get-mpic/195452/img_id7168814409836755755/orig',78)
insert into product (title, image, price) values ('Литые диски R13 4GO','https://vkolesa.ru/image/data/DP153GMMF(1).JPG',54)

insert into catalog_product(catalog_id, product_id) values (2,8),(2,9),(2,10)

insert into product (title, image, price) values ('Аккумулятор автомобильный Varta Blue Dynamic A14 6СТ-40 обр. (42B19L)','https://www.autoakb.ru/photo/big/1480505819_77.jpg',28)
insert into product (title, image, price) values ('Аккумулятор автомобильный Totachi KOR 42B19FLS 6СТ-40 обр. с бортом','https://www.autoakb.ru/photo/big/1471426757_16.jpeg',31)
insert into product (title, image, price) values ('Аккумулятор автомобильный Eco President 44B19L 6СТ-42 обр.','https://www.autoakb.ru/photo/big/1473844432_20.jpg',54)

insert into catalog_product(catalog_id, product_id) values (3,11),(3,12),(3,13)

insert into p_prop_title (name) values ('color'), ('manufacturer')
insert into p_prop (prop_title_id, value) values (1, 'orange')
insert into p_prop (prop_title_id, value) values (1, 'white')

insert into products_props (product_id, property_id) values (1,1), (2,2)

insert into customer (name, phone) values ('David Foplan','+1 (234) 452-234-92')

insert into orders (id,customer_id,address, created_at, status, total, updated_at) values (6,1,'Vladivostok','2018-05-15',2,1280,'2018-05-20')
insert into order_product (amount, order_id, product_id) values (54, 6, 2), (3, 6, 1)

insert into users_roles values (1,1), (2,2), (3,3)