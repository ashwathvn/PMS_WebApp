pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install mongoose-auto-increment@5.0.1 --force'
               
            }
        }
        
        
        stage('Start server') {
            steps {
                bat 'start npm start'
            }
        }
    
        stage('Build') {
  steps {
    bat 'npm install -g @angular/cli'
    bat 'npm build --prod'
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


