pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install mongoose-auto-increment@5.0.1 --force'
                 bat 'npm install mocha --save-dev --force'
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
        timeout(time: 5, unit: 'MINUTES') {
            bat 'node server/app.js'
            echo "Tests passed"
        }
    }
}
}
    post {
        success {
            mail to: 'shettynidhu111@gmail.com',
                 subject: 'Jenkins job completed',
                 body: 'Jenkins job has completed successfully.'
        }
        failure {
            mail to: 'shettynidhu111@gmail.com',
                 subject: 'Jenkins job failed',
                 body: 'Jenkins job has failed. Please check the console output for details.'
        }
    }
}







