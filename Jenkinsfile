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

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Serve Frontend Locally') {
            steps {
                bat 'start cmd /k "npm start"'
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
