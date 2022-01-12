pipeline {
  agent any
  stages {
    stage('build-dockers') {
      steps {
        sh 'make build-auth'
        sh 'make build-content'
        sh 'make build-file'
        sh 'make build-review'
        sh 'make build-front'
      }
    }
    stage('deploy') {
        steps {
            sh 'make clear-all'
            sh 'make deploy-all'
        }
    }
  }
}