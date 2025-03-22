pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NaveenNV2303/user-management-frontend'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Production') {
            steps {
                bat 'npm run build -- --configuration production'  // Use npm run for Angular build
            }
        }

        stage('Serve Frontend Locally') {
            steps {
                script {
                    // Serve the production build on port 4200 using http-server
                    bat 'npm start'
                }
            }
        }

        stage('Post Actions') {
            steps {
                echo 'Frontend build finished!'
            }
        }
    }

    post {
        failure {
            echo 'Frontend build failed'
        }
    }
}
