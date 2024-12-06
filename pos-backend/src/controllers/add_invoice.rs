use actix_web::{post, web::{Data, Json}, HttpResponse};

use crate::{models::invoice::{Invoice, InvoiceRequest}, mdatabase::Mdatabase};

#[post("/invoice")]
pub async fn add_invoice(
    db: Data<Mdatabase>,
    request: Json<InvoiceRequest>
    ) -> HttpResponse {

    match db
        .add_invoice(
                Invoice::try_from(InvoiceRequest{
                    date_time: request.date_time.clone(),
                    items: request.items.clone(),
                    sub_total: request.sub_total.clone(),
                    total: request.total.clone(),
                    total_cost: request.total_cost.clone(),
                    tax_rate: request.tax_rate.clone(),
                    tax: request.tax.clone(),
                    discount: request.discount.clone(), 
                })
                .expect("Error converting InvoiceRequest to Invoice")
            ).await{
            Ok(invoice) => HttpResponse::Ok().json(invoice),
            Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
        }
}
