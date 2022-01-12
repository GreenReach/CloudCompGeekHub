deploy: 
	kubectl apply -f .\cluster-role.yml
	kubectl apply -f .\config-map.yml
	kubectl apply -f .\prometheus-deployment.yml
	kubectl apply -f .\prometheus-service.yml

clear:
	kubectl delete clusterrole prometheus
	kubectl delete clusterrolebinding prometheus
	kubectl delete configmap prometheus-server-conf
	kubectl delete deployment prometheus-deployment
	kubectl delete service prometheus-service

