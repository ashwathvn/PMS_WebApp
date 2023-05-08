pipeline {
    agent any
    
    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install mongoose-auto-increment@5.0.1 --force'
                 bat 'npm install mocha --save-dev --force'
            }
        }
        

  stage('Build') {
         steps {
            bat 'npm run'
            echo "Deliver completed"
          }
       }


     stage('Start server and Test') {
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
            emailext body: 'Jenkins job has completed successfully.',
            subject: 'Jenkins job succeeded',
            to: 'shettynidhu111@gmail.com, shettynidhu123@gmail.com'
        }
        failure {
            emailext body: 'Jenkins job has failed.',
            subject: 'Jenkins job failed',
            to: 'shettynidhu111@gmail.com, shettynidhu123@gmail.com'
        }
    }
}







