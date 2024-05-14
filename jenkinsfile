pipeline {
  agent any
  stages {
    stage('Deploy App on k8s') {
      steps {
        withCredentials([
          string(credentialsId: 'my_kubernetes', variable: 'testoken')
        ]) {
          bat 'kubectl --token $testoken --server http://127.0.0.1:8001 --insecure-skip-tls-verify=true apply -f deployment.yaml'
        }
      }
    }
  }
}
