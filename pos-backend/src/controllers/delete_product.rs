use actix_web::{delete, Responder, web, HttpResponse};
use crate::models::product::Product;
//use crate::database::DbPool;
use sqlx::{ query_as,PgPool };


#[delete("/delete")]
pub async fn delete_product(
       db_pool: web::Data<PgPool>,
       data:    web::Json<Product>
    ) -> impl Responder {

    let response = query_as::<_,Product>("DELETE FROM inventory WHERE id=$1 ")
        .bind(data.id)
        .fetch_all(&**db_pool)
        .await;


    println!("{:?}",response);
    match response{
        Ok(status) => HttpResponse::Ok().json(status),
        Err(err) => {
            eprintln!("Database error: {err}");
            HttpResponse::InternalServerError().body("Internal server error")
        }

    }
}
