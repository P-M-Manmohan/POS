use actix_web::{post, Responder, web, HttpResponse};
use crate::models::product::{ProductId,Product};
use crate::database::DbPool;
use sqlx::query_as;


#[post("/product")]
pub async fn get_product_details(
       db_pool: web::Data<DbPool>,
       product_id: web::Json<ProductId>,
    ) -> impl Responder {
    
    let product_id = product_id.id;

    let product = query_as::<_,Product>("SELECT * FROM inventory WHERE id= $1")
        .bind(product_id)
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
