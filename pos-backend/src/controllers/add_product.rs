use actix_web::{post, Responder, web, HttpResponse};
use crate::models::product::Product;
//use crate::database::DbPool;
use sqlx::{query_as,PgPool};


#[post("/add")]
pub async fn add_product(
       db_pool: web::Data<PgPool>,
       data:    web::Json<Product>
    ) -> impl Responder {

    let response = query_as::<_,Product>("INSERT INTO inventory (id, name, stock, price) VALUES ( $1,$2,$3, $4 )")
        .bind(data.id)
        .bind(data.name.clone())
        .bind(data.stock)
        .bind(data.price.clone())
        .fetch_all(&**db_pool)
        .await;



    match response{
        Ok(status) => HttpResponse::Ok().json(status),
        Err(err) => {
            eprintln!("Database error: {err}");
            HttpResponse::InternalServerError().body("Internal server error")
        }

    }
}
