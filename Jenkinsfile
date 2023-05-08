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
                }
            }
        }

       

        stage('Stop server') {
            steps {
                script {
                    bat 'taskkill /F /IM node.exe'
                    echo "Server stopped"
                    sleep time: 5 * 60, unit: 'SECONDS' // Server runs for 5 minutes before stopping
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
