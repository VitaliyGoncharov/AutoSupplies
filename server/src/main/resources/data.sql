insert into users (username, password) values ('admin@gmail.com','$2a$10$6l.h1f6VVF65Uq0nkDwj8.pDey4EBTjh.48exa46P9XJAbJiLqz/y')
insert into role (name) values ('ROLE_ADMIN'), ('ROLE_USER')

insert into product (title, image, price) values ('Букет из алых роз','https://ozon-st.cdn.ngenix.net/multimedia/audio_cd_covers/1023562045.jpg',50)
insert into product (title, image, price) values ('Масло 2','https://ozon-st.cdn.ngenix.net/multimedia/audio_cd_covers/1022715721.jpg',60)

insert into p_prop_title (name) values ('color'), ('manufacturer')
insert into p_prop (prop_title_id, value) values (1, 'orange')
insert into p_prop (prop_title_id, value) values (1, 'white')

insert into products_props (product_id, property_id) values (1,1), (2,2)

insert into orders (id,address, created_at, status, total, updated_at) values (6,'Vladivostok','2018-05-15',1,1280,'2018-05-20')
insert into order_product (amount, order_id, product_id) values (54, 6, 2), (3, 6, 1)

insert into users_roles values (1,1)