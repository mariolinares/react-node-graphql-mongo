# React + Node + MongoDb + GraphQL

Aplicación CRM basada en Javascript. 

## Instalación

La instalación consiste en tres pasos: 

1. En primer lugar instalamos [Homebrew](https://brew.sh/index_es).

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. Emita desde el terminal para acceder al Tap de Homebrew oficial de [MongoDB](https://brew.sh/index_es).

```bash
brew tap mongodb/brew
```

3. Instalación de [MongoDB](https://brew.sh/index_es).

```bash
brew install mongodb-community@4.0
```

## Uso

1. Clonamos el repositorio de [github](http://github.com).
```bash
git clone https://github.com/mariolinares/react-node-graphql-mongo
```

2. Abrimos una ventana de terminal y arrancamos mongoDb
con el siguiente comnando: 
```sh
mongod
```


3. Abrimos una segunda terminal y accedemos a la carpeta servidor, instalamos los paquetes y arrancamos el servidor

```sh
cd servidor
npm install
npm start
```

4. En una tercera ventana de terminal, accedemos a la carpeta cliente, instalamos y arrancamos el cliente

```sh
cd cliente
npm install
npm start
```

