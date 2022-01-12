pipeline {
  agent any
  stages {
    stage('build-dockers') {
      steps {
        sh 'make build-auth'
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