 -- Cria servidor back-end
 pm2 start --name "agendavaa_api" "npm -- run deploy-run" --log api.log

 pm2 start dist/index.js --name "agendavaa_api" --log api.log

-- Criar servidor de log
 pm2 start index.js --name "agendavaa_backup" --log backup.log 