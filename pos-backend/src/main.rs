use actix_web::{ App ,HttpServer, web, middleware::Logger};
use crate::database::{init_db_pool, DbPool};
use std::sync::Arc;
use env_logger;

mod  routes;
mod models;
mod controllers;
mod database;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = 8080;
    env_logger::init();
    println!("starting server on {port}");

    let db_pool: DbPool = init_db_pool().await;
    let db_pool = Arc::new(db_pool);

    HttpServer::new(move || {
        App::new()
        .wrap(Logger::default())
        .app_data(web::Data::from(db_pool.clone()))
        .configure(routes::routes::configure_routes)
    })
    .bind(("127.0.0.1",port))?
    .run()
    .await
}
