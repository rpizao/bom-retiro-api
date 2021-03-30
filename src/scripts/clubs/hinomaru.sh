# Criar database com usuário para acesso
use hinomaru_db;
db.createUser({user:"hinomaru_easy", pwd:"tQ4xD29WbY", roles:[{role:"readWrite", db: "hinomaru_db"}]});

# Conectando ao banco
mongo -u hinomaru_easy -p 'tQ4xD29WbY' --authenticationDatabase agendavaa_db;


