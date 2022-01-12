deploy-all:
	kubectl apply -f FileService/deployment.yml
	kubectl apply -f ReviewService/deployment.yml
	kubectl apply -f geekhub-frontend/deployment.yml
	kubectl apply -f ContentInfoService/deployment.yml
	kubectl apply -f AuthentificationService/deployment.yml

deploy-auth:
	kubectl apply -f AuthentificationService/deployment.yml

deploy-content:
	kubectl apply -f ContentInfoService/deployment.yml

deploy-file:
	kubectl apply -f FileService/deployment.yml

deploy-review:
	kubectl apply -f ReviewServiceService/deployment.yml

deploy-front:
	kubectl apply -f geekhub-frontend/deployment.yml

	
build-content:
	docker build ./ContentInfoService --tag greenreach/content_info_service:v1.0
	docker push greenreach/content_info_service:v1.0

build-auth:
	docker build ./AuthentificationService --tag greenreach/authentification_service:v1.0
	docker push greenreach/authentification_service:v1.0
	
build-file:
	docker build ./FileService --tag greenreach/file_storage_service:v1.0
	docker push greenreach/file_storage_service:v1.0

build-review:
	docker build ./ReviewService --tag greenreach/review_service:v1.0
	docker push greenreach/review_service:v1.0

build-front:
	docker build ./geekhub-frontend --tag greenreach/geekhub_frontend:v1.0
	docker push greenreach/geekhub_frontend:v1.0

clear-all:
	kubectl delete deployment auth-deployment
	kubectl delete deployment content-info-deployment
	kubectl delete deployment file-storage-deployment
	kubectl delete deployment frontend-deployment
	kubectl delete deployment review-deployment

	kubectl delete service auth-service
	kubectl delete service content-info-service
	kubectl delete service file-storage-service
	kubectl delete service frontend-service
	kubectl delete service review-service