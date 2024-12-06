use actix_web::web;
use crate::controllers::greet;
use crate::controllers::hello;
use crate::controllers::get_product_details;
use crate::controllers::get_all_products;
use crate::controllers::add_product;
use crate::controllers::update_product;
use crate::controllers::delete_product;
use crate::controllers::search;
use crate::controllers::add_invoice;
use crate::controllers::update_stock;
use crate::controllers::check_sales;
use crate::controllers::check_cost;
use crate::controllers::day_end;

pub fn configure_routes(cfg: &mut web::ServiceConfig) {

    cfg
        .service(hello::hello)
        .service(greet::greet)
        .service(get_product_details::get_product_details)
        .service(get_all_products::get_all_products)
        .service(add_product::add_product)
        .service(update_product::update_product)
        .service(delete_product::delete_product)
        .service(search::search_product_id)
        .service(search::search_product_name)
        .service(add_invoice::add_invoice)
        .service(update_stock::update_stock)
        .service(check_sales::check_sales)
        .service(check_cost::check_cost)
        .service(day_end::day_end);

}
