use tonic::{Request, Response, Status};

// Include the generated proto code
pub mod pb {
    tonic::include_proto!("chat.v1");
}

use pb::health_service_server::{HealthService, HealthServiceServer};
use pb::{HealthCheckRequest, HealthCheckResponse, health_check_response::ServingStatus};

#[derive(Debug, Default)]
pub struct HealthServiceImpl;

#[tonic::async_trait]
impl HealthService for HealthServiceImpl {
    async fn check(
        &self,
        request: Request<HealthCheckRequest>,
    ) -> Result<Response<HealthCheckResponse>, Status> {
        let service = request.into_inner().service;
        tracing::debug!("Health check for service: {}", service);

        let response = HealthCheckResponse {
            status: ServingStatus::Serving.into(),
        };

        Ok(Response::new(response))
    }
}

pub fn health_service() -> HealthServiceServer<HealthServiceImpl> {
    HealthServiceServer::new(HealthServiceImpl::default())
}
