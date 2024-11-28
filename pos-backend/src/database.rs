use sqlx::{PgPool, postgres::PgPoolOptions};
// ,Pool, Postgres};
//use sqlx::postgres::PgPoolOptions;
use std::env;

// pub type DbPool = Pool<Postgres>;

pub async fn init_db_pool() -> PgPool{
    
    dotenv::dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("there should be a DATABASE URL");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Connection to Database Failed")
}
