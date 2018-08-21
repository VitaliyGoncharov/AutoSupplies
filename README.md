# AutoSupplies
AutoSupplies shop on Spring stack and Angular 6 RESTful

## Quickstart

Requirements:
- JVM
- Maven

```
git clone https://github.com/VitaliyGoncharov/AutoSupplies.git
```

Go to the `server` directory

```
cd server
```

```
mvn clean spring-boot:run
```

Open your browser on `localhost:8080`.

## Client

In order to edit client side you need:
- Node.js
- Angular CLI

Install node.js from official website: https://nodejs.org/en/

Run in command line:

```
npm install -g @angular/cli
```

Make changes in project. To test it without backend use:

```
npm start
```

To build the project use:

```
ng build --prod
```
