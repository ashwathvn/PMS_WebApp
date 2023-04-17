pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build and deploy') {
            steps {
                sh 'npm run build'
             
            }
        }
    }
}
