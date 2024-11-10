use actix_web::{Responder, get};

#[get("/")]
pub async fn hello() -> impl Responder {
    format!("hello world")
}
