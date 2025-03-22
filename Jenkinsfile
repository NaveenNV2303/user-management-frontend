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
                bat 'npm run build -- --prod'  // Build the application for production
            }
        }

        stage('Serve Frontend Locally') {
            steps {
                script {
                    // Serve the production build on port 4200 using http-server
                    bat 'npx http-server dist/user-management-frontend -p 4200 &'
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
