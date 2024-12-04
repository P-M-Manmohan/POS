use mongodb::{error::Error, results::InsertOneResult, bson::{doc, Bson}, Client, Collection};
use futures::stream::StreamExt;
use std::env;
use crate::models::invoice::Invoice ;



pub struct Mdatabase {
        invoice: Collection<Invoice>,
}

impl Mdatabase{
    pub async fn init() -> Self {
        let uri = match env::var("MONGO_URI") {
            Ok(v)   => v.to_string(),
            Err(_)  => "mongodb://localhost:27017/?directConnection=true".to_string(), 
        };

        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("SeenaStores");

        let invoice: Collection<Invoice> = db.collection("invoice");

        Mdatabase{
            invoice,
        }
    }

    pub async fn add_invoice(&self, invoice: Invoice) -> Result<InsertOneResult, Error>{
        let result = self
            .invoice
            .insert_one(invoice)
            .await
            .ok()
            .expect("Error adding invoice");

        Ok(result)
    }

    pub async fn get_sales(&self) -> Result<i64, Error>{
    
        let mut cursor = self
            .invoice
            .aggregate(vec![
                doc!{
                    "$group": {
                        "_id": null,
                        "sumTotal": {
                            "$sum": "$total"
                        }
                    }
                }
            ])
            .await
            .ok()
            .expect("Error fetching sales Data");

        while let Some(result) = cursor.next().await {
                if let Ok(doc) = result {

                   if let Some(Bson::Int64(sum_total)) = doc.get("sumTotal") {
                        return Ok(*sum_total);
                    }
                }
            }

        Ok(0)

    }
}
