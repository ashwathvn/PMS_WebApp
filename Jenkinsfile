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
                sh 'pm2 restart app.js' // assuming you use pm2 to manage your Node.js app
            }
        }
    }
}
