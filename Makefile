build: 
	docker build -t server .
run:
	docker run -p 5001:5000 -d --rm --name server server
stop: 
	docker stop server
rmi: 
	docker rmi server
