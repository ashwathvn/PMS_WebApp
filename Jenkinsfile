pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build and deploy') {
            steps {
                sh 'npm run build'
             
            }
        }
    }
}
