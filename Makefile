deploy-all:
	kubectl apply -f AuthentificationService\deployment.yml
	kubectl apply -f ContentInfoService\deployment.yml
	kubectl apply -f FileService\deployment.yml
	kubectl apply -f ReviewService\deployment.yml

deploy-auth:
	kubectl apply -f AuthentificationService\deployment.yml

deploy-content:
	kubectl apply -f ContentInfoService\deployment.yml

deploy-file:
	kubectl apply -f FileService\deployment.yml

deploy-review:
	kubectl apply -f ReviewServiceService\deployment.yml
