use actix_web::{get, web::Data, HttpResponse};
use crate::mdatabase::Mdatabase;

#[get("/sales")]
pub async fn check_sales(
    db: Data<Mdatabase>,
    ) -> HttpResponse {

    match db
        .get_sales()
            .await{
            Ok(number) => HttpResponse::Ok().json(number),
            Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
        }
}
