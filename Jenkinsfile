pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NaveenNV2303/user-management-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  // Install frontend dependencies
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'ng build --prod'  // Build the frontend
                }
            }
        }

        stage('Serve Frontend Locally') {
            steps {
                script {
                    // Serve the frontend locally (ensure this doesn't conflict with other processes)
                    sh 'ng serve --host 0.0.0.0 --port 4200'  // Make it accessible on port 4200
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend build and local serve completed successfully!'
        }
        failure {
            echo 'Frontend build failed'
        }
    }
}
