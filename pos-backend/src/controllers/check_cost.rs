use crate::mdatabase::Mdatabase;
use actix_web::{get, web::Data, HttpResponse};

#[get("/cost")]
pub async fn check_cost(db: Data<Mdatabase>) -> HttpResponse {
    match db.get_cost().await {
        Ok(number) => HttpResponse::Ok().json(number),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
