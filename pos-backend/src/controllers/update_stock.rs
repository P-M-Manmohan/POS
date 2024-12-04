use actix_web::{post, Responder, web, HttpResponse};
use crate::models::product::Product;
use crate::database::DbPool;



#[post("/update")]
pub async fn update_stock(
       db_pool: web::Data<DbPool>,
       data:    web::Json<Vec<Product>>
    ) -> impl Responder {

        println!("stock changing");

    match query(&db_pool,&data).await{
        Ok(status) => HttpResponse::Ok().json(status),
        Err(err) => {
            eprintln!("Database error: {err}");
            HttpResponse::InternalServerError().body("Internal server error")
        }

    }
}


async fn query(
        pool:   &DbPool,
        items:   &[Product]
    ) -> Result<(),sqlx::Error> {
        let mut query: String = String::from("UPDATE inventory SET stock = CASE ");
        let mut ids = Vec::new();

        println!("{:?}",items);

        for item in items {
            query.push_str(&format!("WHEN id = {} THEN stock-{} ",item.id,item.stock));
            ids.push(item.id.to_string());
        }

        query.push_str(" END WHERE id IN (");
        query.push_str(&ids.join(", "));
        query.push_str(")");

        println!("{}",query);

        sqlx::query(&query).execute(pool).await?;
        Ok(())
}
