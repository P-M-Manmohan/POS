use actix_web::{post, Responder, web, HttpResponse};
use crate::models::sales::Sales;
use crate::database::DbPool;
use sqlx::query_as;


#[post("/dayend")]
pub async fn day_end(
       db_pool: web::Data<DbPool>,
       data:    web::Json<Sales>
    ) -> impl Responder {

    let response = query_as::<_,Sales>("INSERT INTO sales (date,cost,sales) VALUES ( $1,$2,$3)")
        .bind(data.date)
        .bind(data.cost)
        .bind(data.sales)
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
