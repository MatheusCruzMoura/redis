### Rodando os containeers
	```
	docker network create --subnet=172.20.0.0/24 redis-net
	docker compose up --build -d
	```