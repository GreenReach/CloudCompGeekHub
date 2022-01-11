deploy-all:
	kubectl apply -f FileService\deployment.yml
	kubectl apply -f ReviewService\deployment.yml
	kubectl apply -f geekhub-frontend\deployment.yml
	kubectl apply -f ContentInfoService\deployment.yml
	kubectl apply -f AuthentificationService\deployment.yml

deploy-auth:
	kubectl apply -f AuthentificationService\deployment.yml

deploy-content:
	kubectl apply -f ContentInfoService\deployment.yml

deploy-file:
	kubectl apply -f FileService\deployment.yml

deploy-review:
	kubectl apply -f ReviewServiceService\deployment.yml

deploy-front:
	kubectl apply -f geekhub-frontend\deployment.yml


build-content:
	docker build . --tag greenreach/content_info_service:v1.0
	docker push greenreach/content_info_service:v1.0

build-auth:
	docker build . --tag greenreach/authentification_service:v1.0
	docker push greenreach/authentification_service:v1.0
	
build-file:
	docker build . --tag greenreach/file_storage_service:v1.0
	docker push greenreach/file_storage_service:v1.0

build-review:
	docker build . --tag greenreach/review_service:v1.0
	docker push greenreach/review_service:v1.0

build-front:
	docker build . --tag greenreach/geekhub_frontend:v1.0
	docker push greenreach/geekhub_frontend:v1.0