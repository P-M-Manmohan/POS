use actix_web::{post, Responder, web, HttpResponse};
use crate::models::sales::Sales;
use crate::database::DbPool;
use sqlx::query;


#[post("/dayend")]
pub async fn day_end(
       db_pool: web::Data<DbPool>,
       data:    web::Json<Sales>
    ) -> impl Responder {

    println!("day end");

    let response = query("INSERT INTO sales (date,sales,profit) VALUES ( $1,$2,$3)")
        .bind(data.date)
        .bind(data.sales)
        .bind(data.profit)
        .fetch_all(&**db_pool)
        .await;



    match response{
        Ok(_status) => HttpResponse::Ok().body("updated"),
        Err(err) => {
            eprintln!("Database error: {err}");
            HttpResponse::InternalServerError().body("Internal server error")
        }

    }
}
