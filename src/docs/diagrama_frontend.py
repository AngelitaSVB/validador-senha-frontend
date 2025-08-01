from diagrams import Diagram, Cluster, Edge
from diagrams.aws.network import CloudFront, APIGateway
from diagrams.aws.storage import S3
from diagrams.onprem.ci import GithubActions
from diagrams.onprem.client import Users
from diagrams.onprem.iac import Terraform
from diagrams.onprem.compute import Server

with Diagram("Infraestrutura do Frontend - Validador de Senha", filename="infraestrutura_frontend_validador_senha", show=False, direction="LR"):
    
    usuario = Users("Usuário final")

    with Cluster("GitHub"):
        github = GithubActions("Push para repo")
        actions = GithubActions("GitHub Actions")

    with Cluster("Terraform Cloud"):
        terraform = Terraform("Terraform")

    with Cluster("AWS"):
        s3 = S3("Frontend Angular (S3)")
        cloudfront = CloudFront("Distribuição Global (CloudFront)")
        apigateway = APIGateway("API Gateway")

    backend = Server("Backend no ECS")

    # CI/CD e Deploy
    github >> actions >> terraform >> s3

    # Acesso do usuário
    usuario >> Edge(label="HTTP/HTTPS") >> cloudfront >> s3

    # Comunicação com backend
    s3 >> Edge(label="Requisição REST") >> apigateway >> backend
