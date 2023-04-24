pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install mongoose-auto-increment@5.0.1 --force'
                bat 'npm install mocha --save-dev'
               
            }
        }
        
        
        stage('Start server') {
            steps {
                bat 'start npm start'
            }
        }
    
        stage('Build') {
  steps {
    
    bat 'npm run'
    echo "Deliver completed"
  }
}


    stage('Test') {
    steps {
        timeout(time: 20, unit: 'MINUTES') {
            bat 'npm test'
            echo "Tests passed"
        }
    }
}

    }

}


