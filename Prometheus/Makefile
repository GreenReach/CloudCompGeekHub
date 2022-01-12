deploy: 
	kubectl apply -f .\cluster-role.yml
	kubectl apply -f .\config-map.yml
	kubectl apply -f .\prometheus-deployment.yml
	kubectl apply -f .\prometheus-service.yml

clear:
	kubectl delete namespace monitoring