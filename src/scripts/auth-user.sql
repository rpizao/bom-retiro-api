db.auth-users.insert({
  name: "Paulo Silva", 
  email: "governo@pmbr.gov.br", 
  passw: "f4063724513ecb589c06fb7442b9648fe55ae5653a916db56c157113d1f3ea24918acad7a6bc9468acb0e8a0b4a4c548693f34e82a77d89f75cb4601b9ce6b88",
  salt: "Equipe do Governo"
});

db.auth-users.insert({
  name: "Ronaldo Neves", 
  email: "saude@pmbr.gov.br", 
  passw: "7ca04aa91f8b4f3e219dd8b196bb30fef7a9065c1e7dd796fe5bf2089cc91d98f7ddb832e42f688cd69212ff99e74c035d5fab4f501e3718124b4040d9ee4276",
  salt: "Secretaria de Saúde"
});

db.auth-users.insert({
  name: "Roberto Santos", 
  email: "educacao@pmbr.gov.br", 
  passw: "69e71632b6964576437e0e0a8058d96d6f4f069350c12f93e7306c48721ff5a0444ddd2ce810b404ffee013b226648417cfa6f899d33970eb78567a2ce95001f",
  salt: "Secretaria de Educação"
});

/* 
Governo: f4063724513ecb589c06fb7442b9648fe55ae5653a916db56c157113d1f3ea24918acad7a6bc9468acb0e8a0b4a4c548693f34e82a77d89f75cb4601b9ce6b88
Saude: 7ca04aa91f8b4f3e219dd8b196bb30fef7a9065c1e7dd796fe5bf2089cc91d98f7ddb832e42f688cd69212ff99e74c035d5fab4f501e3718124b4040d9ee4276   
Educação: 69e71632b6964576437e0e0a8058d96d6f4f069350c12f93e7306c48721ff5a0444ddd2ce810b404ffee013b226648417cfa6f899d33970eb78567a2ce95001f

console.log("Governo: " + CryptoSaltUtils.encodeSha512("governo", "Equipe do Governo").passw);
console.log("Saude: " + CryptoSaltUtils.encodeSha512("saude", "Secretaria de Saúde").passw);
console.log("Educação: " + CryptoSaltUtils.encodeSha512("educacao", "Secretaria de Educação").passw); */