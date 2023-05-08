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


     stage('Start server') {
            steps {
                script {
                    def serverProcess = null

                    try {
                        serverProcess = bat(script: "start /B cmd /C \"node server/app.js\"", returnStatus: true)
                        echo "Server started successfully"
                        echo "Build completed"
                    } finally {
                        if (serverProcess != null) {
                            bat 'taskkill /F /IM node.exe'
                            echo "Server stopped."
                        }
                    }
                }
            }
        }
    




}
      post {
        always {
            script {
                if (currentBuild.result == 'SUCCESS') {
                    emailext body: 'Jenkins job has completed successfully.',
                            subject: 'Jenkins job succeeded',
                            to: 'shettynidhu111@gmail.com, shettynidhu123@gmail.com'
                } else {
                    emailext body: 'Jenkins job has failed.',
                            subject: 'Jenkins job failed',
                            to: 'shettynidhu111@gmail.com, shettynidhu123@gmail.com'
                }
            }
        }
    }
}







