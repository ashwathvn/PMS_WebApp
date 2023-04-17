pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Start server') {
            steps {
                bat 'start npm start'
            }
        }
    }
}

