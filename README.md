### Rodando os containeers
	```
	docker compose up --build -d
	```

<!-- 1. Criando a rede:
	```
	docker network create redis-net
	```

2. Criando containers docker: 
	
	```
	docker run --name redis-master -p 6379:6379 --network redis-net -d redis redis-server --appendonly yes
	docker run --name redis-replica1 -p 6380:6379 --network redis-net -d redis redis-server --appendonly yes --slaveof redis-master 6379
	docker run --name redis-replica2 -p 6381:6379 --network redis-net -d redis redis-server --appendonly yes --slaveof redis-master 6379
	```

3. Checando IP dos containers:
	```
	docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)
	```

4. Criando os aqrquivos sentinel.conf e ligando ao master (mudar o caminho dos arquivos e o IP do master):
	```
	echo "sentinel monitor mymaster 172.18.0.2 6379 2" > ./sentinel_1/sentinel.conf
	echo "sentinel monitor mymaster 172.18.0.2 6379 2" > ./sentinel_2/sentinel.conf
	echo "sentinel monitor mymaster 172.18.0.2 6379 2" > ./sentinel_3/sentinel.conf
	```

5. Criando os containers das sentinels (mudar o caminho dos arquivos):
	```
	docker run -d --name redis-sentinel_1 -p 26379:26379 --network redis-net -v ./sentinel_1:/data redis redis-sentinel /data/sentinel.conf
	docker run -d --name redis-sentinel_2 -p 26380:26379 --network redis-net -v ./sentinel_2:/data redis redis-sentinel /data/sentinel.conf
	docker run -d --name redis-sentinel_3 -p 26381:26379 --network redis-net -v ./sentinel_3:/data redis redis-sentinel /data/sentinel.conf
	```

6. Verificando se as sentinelas estão executando corretamente:	
	```
	docker container logs --follow redis-sentinel_1
	docker container logs --follow redis-sentinel_2
	docker container logs --follow redis-sentinel_3
	```

6. Executando API node.js (atualizar lista de endpoints):
	```
	npm install
    npm start
	``` -->
