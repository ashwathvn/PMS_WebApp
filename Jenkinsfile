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
                echo "Build completed"
            }
        }
       
       stage('Start server') {
            steps {
                script {
                    bat 'start /B cmd /C "node server/app.js"'
                    echo "Server started"
                    echo "Server URL: http://localhost:4000"
                    input(message: "Click 'Proceed' to stop the server", ok: "Proceed")
                }
            }
        }

     
        stage('Stop server') {
            steps {
                script {
                    bat 'taskkill /F /IM node.exe'
                    echo "Server stopped"
                    sleep time: 1 * 60, unit: 'SECONDS' // Server runs for 5 minutes before stopping
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
                            to: 'johncena1997788@gmail.com'
                } else {
                    emailext body: 'Jenkins job has failed.',
                            subject: 'Jenkins job failed',
                            to: 'johncena1997788@gmail.com'
                }
            }
        }
    }
}
