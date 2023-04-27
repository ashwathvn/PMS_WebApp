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
        script {
            def cmd = 'npm start'
            def process = ''
            if (isUnix()) {
                process = sh(script: "${cmd} &", returnProcess: true)
            } else {
                process = bat(script: "start /B ${cmd}", returnProcess: true)
            }
            sleep 10
            if (process != null) {
                def exitCode = process.exitValue()
                if (exitCode == 0) {
                    echo "Server started successfully"
                } else {
                    error "Failed to start server: exit code ${exitCode}"
                }
            } else {
                error "Failed to start server: process is null"
            }
        }
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


