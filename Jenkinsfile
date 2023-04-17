pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install mongoose-auto-increment@5.0.1 --force'
                bat 'npm install'
            }
        }
        
        stage('Start server') {
            steps {
                bat 'start npm start'
            }
        }
    }
}

