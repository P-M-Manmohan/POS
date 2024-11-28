use actix_web::{put, Responder, web, HttpResponse};
use crate::models::product::Product;
//use crate::database::DbPool;
use sqlx::{query_as, PgPool};


#[put("/update")]
pub async fn update_product(
       db_pool: web::Data<PgPool>,
       data:    web::Json<Product>
    ) -> impl Responder {

    let response = query_as::<_,Product>("UPDATE inventory SET name=$1, stock=$2, price=$3 WHERE id=$4 ")
        .bind(data.name.clone())
        .bind(data.stock)
        .bind(data.price.clone())
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
