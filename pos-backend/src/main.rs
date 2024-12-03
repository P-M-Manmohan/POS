use actix_web::{ App ,HttpServer, http,web, middleware::Logger};
use actix_cors::Cors;
use crate::database::{init_db_pool, DbPool};
use crate::mdatabase::Mdatabase;
use std::sync::Arc;
use env_logger;

mod  routes;
mod models;
mod controllers;
mod database;
mod mdatabase;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = 8080;
    env_logger::init();
    println!("starting server on {port}");

    let db_pool: DbPool = init_db_pool().await;
    let db_pool = Arc::new(db_pool);


    let db = Mdatabase::init().await;
    let db_data = web::Data::new(db);

//    let mongo_client = init_mongodb().await;
//    let mongo_client = Arc::new(mongo_client);

    HttpServer::new(move || {
        App::new()
        .wrap(Logger::default())
        .wrap(Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET","POST","PUT","DELETE"])
            .allowed_headers(vec![http::header::CONTENT_TYPE])
            .max_age(3600),
            )
        .app_data(db_data.clone())
        .app_data(web::Data::from(db_pool.clone()))
        .configure(routes::routes::configure_routes)
    })
    .bind(("127.0.0.1",port))?
    .run()
    .await
}
