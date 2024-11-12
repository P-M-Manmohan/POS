use actix_web::web;
use crate::controllers::greet;
use crate::controllers::hello;
use crate::controllers::get_product_details;
use crate::controllers::get_all_products;

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg
        .service(hello::hello)
        .service(greet::greet)
        .service(get_product_details::get_product_details)
        .service(get_all_products::get_all_products);

}
