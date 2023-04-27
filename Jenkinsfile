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
                script {
                    try {
                        timeout(time: 20, unit: 'MINUTES') {
                            bat 'node server/app.js'
                            def response =  bat 'curl http://localhost:4000'
                            if (response.contains("OK")) {
                                echo "Server is running properly"
                            } else {
                                error "Server is not running properly"
                            }
                            
                            echo "Tests passed"
                        }
                    } catch (err) {
                        currentBuild.result = 'FAILURE'
                        error("An error occurred while running tests: ${err}")
                    }
                }
            }
        }
    }
}







