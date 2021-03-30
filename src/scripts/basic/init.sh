# Cria o usuário e dá permissão para os DBs disponíveis
db.createUser({user:"agendavaa", pwd:"lxm#68Q^ch", roles:[{role:"readWrite", db: "agendavaa_db"}]});
db.grantRolesToUser( "agendavaa", [ {role:"readWrite", db: "aldeiavaa_db"} ]);
db.grantRolesToUser( "agendavaa", [ {role:"readWrite", db: "hinomaru_db"} ]);


db.createUser({ user: "agendavaa" , pwd: "lxm#68Q^ch", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]});