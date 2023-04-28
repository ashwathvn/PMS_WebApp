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
        always {
            emailext body: 'Jenkins job has completed.',
            subject: 'Jenkins job completed',
            to: 'shettynidhu111@gmail.com'
        }
    }
}







