use actix_web::{web, Responder};

#[actix_web::get("/greet/{id}")]
pub async fn greet(id: web::Path<u32>) -> impl Responder {
    format!("hello {id}")
}
