use actix_web::{post, Responder, web, HttpResponse};
use mongodb::{ Client, bson::Document, bson::doc};
use std::sync::Arc;
//use serde_json::Value;

#[post("/invoice")]
pub async fn add_invoice(
    client: web::Data<Arc<Client>>
    ) -> impl Responder {

    println!("invoice request recieved");
    let collection = client.database("SeenaStores").collection("invoice");

    let _ = collection.insert_one(doc! { "test_key2": "test_value2" }).await;
    println!("Connected and data inserted successfully");
    

    HttpResponse::Ok().body("Invoice inserted")
    //let bson_doc: Document = match bson::to_document(&data.into_inner()) {
    //    Ok(doc) => doc,
    //    Err(err) => {
    //        eprintln!("Failed to convert JSON to BSON: {:?}", err);
    //        return HttpResponse::BadRequest().body("Invalid data format")
    //    }
    //};

    // Insert the document into the collection
    //match collection.insert_one(bson_doc).await {
    //    Ok(_) => HttpResponse::Ok().body("Invoice inserted successfully"),
    //    Err(err) => {
    //        eprintln!("Failed to insert invoice: {:?}", err);
    //        HttpResponse::InternalServerError().body("Failed to insert invoice")
    //    }
    //}
}


//pub async fn get_all_products(
//       db_pool: web::Data<DbPool>,
//    ) -> impl Responder {
//
//        println!("Received request to /product");
//
//    println!("getting products");

 //   let product = query_as::<_,Product>("SELECT * FROM inventory")
//        .fetch_all(&**db_pool)
//        .await;
//

//    match product {
//        Ok(product) => HttpResponse::Ok().json(product),
//        Err(err) => {
//            eprintln!("Database error: {err}");
//            HttpResponse::InternalServerError().body("Internal server error")
//        }

//    }
//}
