# AutoSupplies
AutoSupplies shop on Spring Boot and Angular 6 RESTful

# Description
This is autoshop project, where users can view items from different catalogs, store items in cart and then make order without authentication. If user is logged in, data for order will be taken from his profile (for ex.: name, default address, phone).

Manager can view all orders, their info, items. Also he can edit order products (add items, remove, change their amount).

**Credentials:**

ADMIN
**********************
email: admin@gmail.com
password: 12345
**********************

MANAGER
**********************
email: manager@gmail.com
password: 12345
**********************

USER
**********************
email: user@gmail.com
password: 12345
**********************

## Quickstart

Requirements:
- JRE >=8
- Database (PostgreSQL is preferred OR MySQL OR you can choose in-memory database H2)

Download one of the following jars for your database:
- H2 | [google drive](https://drive.google.com/file/d/1AxMPvIHHwZ9LshV4M14339H32pIHo8gi/view?usp=sharing)  ( If you don't want to deal with database at all )
- MySQL | [google drive](https://drive.google.com/file/d/15A1gFoPVhK56RK-urdaHKYKmOzuRx4r8/view?usp=sharing)
- PostgreSQL | [google drive](https://drive.google.com/file/d/1pWVhedUZjKAy5pvy691umIBcYgZ87hlv/view?usp=sharing)

Run the jar:
```
java -jar autoshop-{your database name}.jar
```

Open your browser on `localhost:8080`.



## How to build jar

Requirements:
- JRE >=8
- Maven
- Database (PostgreSQL is preferred OR MySQL OR you can choose in-memory database H2)

Clone repository:
```
git clone https://github.com/VitaliyGoncharov/AutoSupplies.git
```

**Find file /server/src/main/resources/application.properties**

For H2 database:
- uncomment H2 Web Console and DATASOURCE for H2 blocks
- comment spring.jpa.properties.hibernate.dialect, spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults properties
- comment DATASOURCES for MySQL and PostgreSQL
- make sure each model in server/src/main/java/com/carssps/model has @GeneratedValue(strategy = GenerationType.SEQUENCE)

For MySQL database:
- comment H2 Web Console and DATASOURCES for H2 and PostgreSQL
- comment spring.jpa.properties.hibernate.dialect AND spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults properties
- uncomment DATASOURCE for MySQL
- change spring.datasource.username AND spring.datasource.password properties
- create database `autoshop` | CREATE DATABASE autoshop;
- make sure each model in server/src/main/java/com/carssps/model has @GeneratedValue(strategy = GenerationType.AUTO)

For PostgreSQL database
- comment H2 Web Console and DATASOURCES for H2 and MySQL
- uncomment DATASOURCE for PostgreSQL
- change spring.datasource.username AND spring.datasource.password properties
- create database `autoshop` | CREATE DATABASE autoshop;
- make sure each model in server/src/main/java/com/carssps/model has @GeneratedValue(strategy = GenerationType.IDENTITY)
- make sure the following in application.properties is uncomment: spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults= false 

PostgreSQL is preferred 'cause I used postgres specific Full Text Search queries.

--------------------------------------------------------------------------------------------------------------------------------

Go to the `server` directory
```
cd server
```

Assemble the jar with dependencies. Its name is "autoshop.jar" by default.
```
mvn clean package
```

Run the jar file:
```Java
java -jar target/autoshop.jar
```

Open your browser on `localhost:8080`.


## Client API

```TypeScript
{
        path: '',
        component: MainComponent,
        resolve: { catalogs: CatalogsResolver },
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'search', component: SearchComponent },
            { path: 'special-deals', component: SpecialDealsComponent },
            { path: 'shops-list', component: ShopsListComponent },
            { path: 'company-info', component: CompanyInfoComponent },
            {
                path: 'cart',
                component: CartComponent,
                resolve: { items: ItemsCartResolver, user: UserResolver }
            },
            {
                path: 'catalog/list/:catalog',
                component: CatalogsListComponent
            },
            {
                path: 'catalog/:title',
                redirectTo: 'catalog/:title/1'
            },
            {
                path: 'catalog/:title/:page',
                resolve: { items: ItemsResolver },
                component: CatalogItemsComponent
            },
            { 
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                resolve: { user: UserResolver}
            },
            {
                path: 'manager',
                canActivateChild: [AuthGuard, OrderGuard],
                children: [
                    { path: '', redirectTo: '/' , pathMatch: 'full' },
                    { path: 'orders', component: OrdersListComponent, resolve: { orders: OrdersResolver} },
                    { path: 'order/:id/details', component: OrderDetailsComponent, resolve: { order: OrderResolver } },
                    { path: 'order/:id/edit', component: OrderEditComponent, resolve: { order: OrderResolver } }
                ]
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
```

## Server API

```Java
HomeController
GET /api/password | params: password
POST /api/signup | params: {email,password,firstname?,lastname?,birth?,gender?,address?,phone?}
POST /api/token | params: {grant_type, email, password, refresh_token}

UserController (All routes require authentication)
GET /api/user
!# GET /api/user/edit | params: {email,password,firstname,lastname,birth,gender,address,phone}

CatalogController
GET /api/catalogs
!# GET /api/catalog/item/add | params: {catalogId,productId}
GET /api/catalog/{catalogPathName}/items/count
GET /api/catalog/items | params: catalog,page,limit
GET /api/catalog/id/{id}
GET /api/catalog/list/{catalogPathName}

OrderController
POST /api/order/add | params: {name,address,phone,surname,products: Array<{id,amount}>}

ProductController
POST /api/search/product | params: {keyword}
GET /api/products | params: ids | ?ids=2,6,7

OrderManagerController (All routes require authentication)
POST /api/manager/order/{orderId}/products/edit | params: Array<{id,amount}>
GET /api/manager/orders
GET /api/order | params: id

```

## DB schema

<img src="https://lh3.googleusercontent.com/OhdlmCCVL-7qRZmsj4iKA1fdl6HCdzch-1Le4-CDQLV8oHgt-NI3PgIUxZ3FmTgXTl_PWmZoCUUbM7ORbnrpPegkwntQr_nPFxPX0rtKxaDxWYlxlXmRsKGBsbrCYTgDfGOpvwGKxlSvrFKGQgm7XKU13dBTM_bHNUvxWCiI-FU44k6-7yKWvGvFT7wjJ23gwXLQAr-j_-UQUK98c9SQyp7T5XR85CV8CqHC4lSCnLtVpGo7LLbuWuSgS8Cv970a-RaubzNDeHuh5Ji10rn05bBpMLRzGziIVPKVRaswbLxKYjLjfkWukW4RhUigXFHGZZ709jB5vaBwFz1sKi_l4w73TtRiwwZzySe-JOUfkFa_0LCNAxw-skeiefEKnuvVKESiGT25jC86bI6FK9JLRmOfTkFCILaztM8YsuXMDIobHP7BBt_6bvzvwF-aiic-Hm2uXA4Gq4uMxypHFmVK7xuQSP7AaYP93PMOz3Azivpnh12FH6tXT1dhGZBNDNudG6YhJYagvDCw73F6X-K3qAfGCjP2fSKN2XF0qMkkUQaFfl_j88phM63jOefN3M0x_aV9U3qe60oNeHKzI7fVtHAKv1Dm5-6v_ISQ4IN30HJeVVJi2T4jvZtIiM4GOm9fCuAuBiUykpLQP4gcZ_90QXoO65RMBM31FhSJ7lFBZlB1_GPr1nbwUlw=w999-h744-no">
