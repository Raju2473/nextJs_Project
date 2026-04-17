pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "rajeshwar2473/nextjs-app"
        DOCKER_TAG = "latest"
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Raju2473/nextJs_Project.git'
            }
        }

       stage('Build Docker Image') {
    steps {
        sh '''
        docker build \
          --build-arg MONGODB_URI=mongodb://dummy:27017/test \
          --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Ym9zcy1veC03Ny5jbGVyay5hY2NvdW50cy5kZXYk \
          -t rajeshwar2473/nextjs-app:latest \
          -f Docker/Dockerfile .
        '''
    }
  }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $DOCKER_IMAGE:$DOCKER_TAG
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }
}