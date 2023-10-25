pipeline {
    agent any

    stages {
        stage ("Clonar repositório") {
            steps {
                git branch: "main", url: "https://github.com/murilopereira006/exercicios-ebac-modulo14.git"
            }
        }
        stage ("Instalar dependências") {
            steps {
                sh "npm install"
            }
        }
        stage ("Inicializar a aplicação") {
            steps {
                sh "npm start"
            }
        }
        stage ("Rodar testes") {
            steps {
                sh "NO_COLOR=1 npm run cy:run"
            }
        }
    }
}
