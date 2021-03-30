# Copia arquivos para o servidor
scp HSSL-603381b8a5418/*.* root@93.188.162.181:/root/Certs

# Copia do servidor para local
scp root@93.188.162.181:/etc/ssl/certs/ssl_bundle.crt ssl_bundle.crt