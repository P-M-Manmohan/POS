use actix_web::{get, Responder, web, HttpResponse};
use crate::models::product::Product;
//use crate::database::DbPool;
use sqlx::{query_as, PgPool};


#[get("/product")]
pub async fn get_all_products(
       db_pool: web::Data<PgPool>,
    ) -> impl Responder {

        println!("Received request to /product");

    println!("getting products");

    let product = query_as::<_,Product>("SELECT * FROM inventory")
        .fetch_all(&**db_pool)
        .await;


    match product {
        Ok(product) => HttpResponse::Ok().json(product),
        Err(err) => {
            eprintln!("Database error: {err}");
            HttpResponse::InternalServerError().body("Internal server error")
        }

    }
}
