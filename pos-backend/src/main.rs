use actix_web::{ App ,HttpServer,http::header, web, middleware::Logger};
use actix_cors::Cors;
use crate::database::init_db_pool;
use crate::mongodb::init_mongodb;
//use std::sync::Arc;
use env_logger;


mod  routes;
mod models;
mod controllers;
mod database;
mod mongodb;
mod application_state;

use application_state::AppState;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = 8080;
    env_logger::init();
    println!("starting server on {port}");



    let postgres= init_db_pool().await;
    let mongodb = init_mongodb().await;
//    let db_pool = Arc::new(db_pool);

    let app_state = web::Data::new(AppState { postgres, mongodb });

    HttpServer::new(move || {
        App::new()
        .wrap(Logger::default())
        .wrap(Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET","POST","PUT","DELETE"])
            .allowed_headers(vec![header::CONTENT_TYPE])
            .max_age(3600),
            )
        .app_data(web::Data::new(app_state.clone()))
        .configure(routes::routes::configure_routes)
    })
    .bind(("127.0.0.1",port))?
    .run()
    .await
}
