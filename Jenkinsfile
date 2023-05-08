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
        bat 'start /B cmd /C "node server/app.js"'
        powershell '''
        $ErrorActionPreference = 'Stop'
        $timeout = 1
        $url = "http://localhost:4000"
        $wc = New-Object System.Net.WebClient
        do {
            Start-Sleep -Seconds 1
            try {
                $response = $wc.DownloadString($url)
                if ($response -eq "Server started") {
                    Write-Host "Server is up and running."
                    break
                }
            } catch {
                Write-Host "Server is not yet ready. Waiting..."
            }
            $timeout--
        } while ($timeout -gt 0)

        if ($timeout -eq 0) {
            throw "Server startup timeout"
        }
        '''
        echo 'build complete'
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







