use actix_web::{post, web::{Data, Json}, HttpResponse};

use crate::{models::invoice::{Invoice, InvoiceRequest}, mdatabase::Mdatabase};

#[post("/invoice")]
pub async fn add_invoice(
    db: Data<Mdatabase>,
    request: Json<InvoiceRequest>
    ) -> HttpResponse {

    println!("invoice request recieved");

    match db
        .add_invoice(
                Invoice::try_from(InvoiceRequest{
                    date_time: request.date_time.clone(),
                    items: request.items.clone(),
                    sub_total: request.sub_total.clone(),
                    total: request.total.clone(),
                    tax_rate: request.tax_rate.clone(),
                    tax: request.tax.clone(),
                    discount: request.discount.clone(), 
                })
                .expect("Error converting InvoiceRequest to Invoice")
            ).await{
            Ok(invoice) => HttpResponse::Ok().json(invoice),
            Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
        }
    

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
