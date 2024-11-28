use actix_web::{post, Responder, web, HttpResponse};
use crate::models::product::Product;
//use crate::database::DbPool;
use sqlx::{query_as, PgPool};


#[post("/searchid/{id}")]
pub async fn search_product_id(
       db_pool: web::Data<PgPool>,
       data:    web::Path<i32>
    ) -> impl Responder {

    let id= data.into_inner();

    let response = query_as::<_,Product>("SELECT * FROM inventory WHERE CAST(id as TEXT) LIKE $1 LIMIT 10")
        .bind(format!("{}%",id))
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
#[post("/searchname/{name}")]
pub async fn search_product_name(
       db_pool: web::Data<PgPool>,
       data:    web::Path<String>
    ) -> impl Responder {

    let name = data.into_inner();

    let response = query_as::<_,Product>("SELECT * FROM inventory WHERE name LIKE $1 LIMIT 10")
        .bind(format!("{}%",name))
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
