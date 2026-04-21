pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "rajeshwar2473/nextjs-app"
        DOCKER_TAG   = "latest"
        KUBECONFIG   = "/var/lib/jenkins/.kube/config"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                withCredentials([
                    string(credentialsId: 'clerk-publishable-key', variable: 'CLERK_KEY')
                ]) {
                    sh '''
                    docker build \
                      --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$CLERK_KEY \
                      --build-arg MONGODB_URI=dummy \
                      -t $DOCKER_IMAGE:$DOCKER_TAG \
                      -f Docker/Dockerfile .
                    '''
                }
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

        stage('Push Docker Image') {
            steps {
                sh '''
                docker push $DOCKER_IMAGE:$DOCKER_TAG
                '''
            }
        }

        stage('Deploy to K3s') {
            steps {
                sh '''
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }
}
