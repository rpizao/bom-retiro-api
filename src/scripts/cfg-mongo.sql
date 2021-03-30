docker volume create mongodatatcc;

docker stop <ID>;
docker rm <ID>;
docker run --name tcc -v mongodatatcc:/data/db -d -p 27018:27017 mongo; // no auth
docker exec -it tcc bash;

-- Conexão leitura
mongo

-- Criando DB e usuário
use pmbr_db;
db.createUser({user:"pmbr", pwd:"TccRPzPUCMG", roles:[{role:"readWrite", db: "pmbr_db"}]});

-- Conectando com mongo
mongo -u pmbr -p 'TccRPzPUCMG' --authenticationDatabase pmbr_db

docker run --name tcc -v mongodatatcc:/data/db -d -p 27018:27017 mongo --auth

-- Quando as imagens estão disponíveis e o docker está parado.
docker start container_id;