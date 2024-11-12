use actix_web::{get, Responder, web, HttpResponse};
use crate::models::product::Product;
use crate::database::DbPool;
use sqlx::query_as;


#[get("/product")]
pub async fn get_all_products(
       db_pool: web::Data<DbPool>,
    ) -> impl Responder {

    let product = query_as::<_,Product>("SELECT * FROM inventory")
        .fetch_optional(&**db_pool)
        .await;

    match product {
        Ok(Some(product)) => HttpResponse::Ok().json(product),
        Ok(None) => HttpResponse::NotFound().body("Product not found"),
        Err(err) => {
            eprintln!("Database error: {err}");
            HttpResponse::InternalServerError().body("Internal server error")
        }

    }
}
