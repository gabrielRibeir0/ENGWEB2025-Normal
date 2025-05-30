# ENGWEB2025-Normal

Gabriel Pereira Ribeiro
A104171

30-05-2025

## Tratamento do dataset

Para relizar o tratamento do dataset, foi criado um script em python `fix_dataset.py` que se focou em tratar:

- Substituir ids por _id do mongo
- Renomear campos com acentos para não haver possíveis conflitos
- Separar o dataset em outros 2, edicoes.json e musicas.json
- Acrescentar a cada musica o id da sua edição

## Setup base de dados

A base de dados utilizada foi o MongoDB a correr num container no Docker.

Para isso, foi necessário configurar o Docker, o mongoDB dentro do Docker e carregar o dataset para o mongoDB.

Os passos realizados são indicados mais abaixo nas instruções.

### Queries

1.
db.edicoes.countDocuments()
65 edições

db.musicas.countDocuments()
1598 músicas

Totalizando 1663 registos na base de dados.

2.
db.edicoes.countDocuments({ vencedor: "Ireland" })
7 edições

3.
db.musicas.distinct("interprete").sort()

4.
db.musicas.aggregate([{ $group: { _id: "$id_edicao", total: { $sum: 1 } } }])


5.
db.edicoes.aggregate([{ $match: { vencedor: { $ne: "" } } }, { $group: { _id: "$vencedor", total: { $sum: 1 } } }])

## API de dados (`/ex1`)

Para responder a pedidos de dados, foi criado um serviço com Express na porta 25000 que responde às rotas necessárias.

- lista de rotas

Para isso, foi necessário conectar à base de dados no MongoDB utilizando *mongoose* e também criar os modelos e controladores para os dados em:

- `models/edicoes.js` para criar o schema a representar uma edicao
- `models/musicas.js` para criar o schema a representar uma musica
- `controllers/edicoes.js` para realizar as queries necessárias aos pedidos
- `controllers/musicas.js` para realizar as queries necessárias aos pedidos

Para gestão das rotas, o(s) router(s) criado(s) foram:

- `router/edicoes.js` que responde a todos os pedidos em `/edicoes`
- `router/interpretes.js` que responde a todos os pedidos em `/interpretes`
- `router/paises.js` que responde a todos os pedidos em `/paises`
- `router/musicas.js` que responde a todos os pedidos necessários à interface em `/musicas`

Para testar o funcionamento da API, as rotas foram testadas usando o Postman.

## Interface (`/ex2`)

Para o utilizador comunicar com a API de dados, foi criado um serviço com Express na porta 25001 que responde às rotas necessárias.

Para gestão das rotas, o(s) router(s) criado(s) foram:

- `router/index.js` que responde a todos os pedidos em `/`
- `router/paises.js` que responde a todos os pedidos em `/paises`

A construção das páginas foi feita com Pug e [w3.css](https://www.w3schools.com/w3css/w3css_downloads.asp) e colocadas em `/views`

## Instruções

### Script tratamento de dados

Para executar o script pata tratar o dataset, é preciso colocar o `.py` e o dataset na mesma pasta e executar:

`fix_dataset.py`

É necessário o dataset ter o nome **dataset.json**.

### Base de dados

#### Docker (passo intermédio, se necessário)

Recomenda-se utilizar MongoDB num container Docker, pelo qual é necessário ter o Docker instalado.

Para configurar o Docker as instruções são:

- `docker pull mongo` para obter a imagem do mongo
- `docker volume create mongoData2025` para criar o volume *mongoData2025*
- `docker run -d -p 27017:27017 --name mongoEW -v mongoData2025:/data/db mongo` para iniciar o container *mongoEW* nas portas internas e externas 27017
- `docker ps` para confirmar o estado do container
- `docker start mongoEW` para iniciar o container, se necessário

#### Carregamento dos dados

Para carregar os dados do dataset para a base de dados os passos são os seguintes:

- `docker cp edicoes.json mongoEW:/tmp` para copiar o dataset para o docker na pasta `/tmp`
- `docker cp musicas.json mongoEW:/tmp` para copiar o dataset para o docker na pasta `/tmp`
- `docker exec -it mongoEW` para iniciar a shell no container
- `mongoimport -d eurovisao -c edicoes /tmp/edicoes.json --jsonArray` para importar o dataset para o mongo
- `mongoimport -d eurovisao -c musicas /tmp/musicas.json --jsonArray` para importar o dataset para o mongo
- (Opcional) `mongosh` para iniciar a shell do mongo e `use database` para selecionar a nova database e conseguir realizar queries

### API

Na pasta `ex1`, executar:

- `npm install` para instalar as dependências
- `npm start` para iniciar o serviço na porta **25000**

### Interface

Na pasta `ex2`, executar:

- `npm install` para instalar as dependências
- `npm start` para iniciar o serviço na porta **25001**