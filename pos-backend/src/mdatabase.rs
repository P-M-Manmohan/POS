use crate::models::invoice::Invoice;
use chrono::{Local, TimeZone};
use futures::stream::StreamExt;
use mongodb::{
    bson::{doc, Bson, DateTime as BsonDateTime},
    error::Error,
    results::InsertOneResult,
    Client, Collection,
};
use std::env;

pub struct Mdatabase {
    invoice: Collection<Invoice>,
}

impl Mdatabase {
    pub async fn init() -> Self {
        let uri = match env::var("MONGO_URI") {
            Ok(v) => v.to_string(),
            Err(_) => "mongodb://localhost:27017/?directConnection=true".to_string(),
        };

        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("SeenaStores");

        let invoice: Collection<Invoice> = db.collection("invoice");

        Mdatabase { invoice }
    }

    pub async fn add_invoice(&self, invoice: Invoice) -> Result<InsertOneResult, Error> {
        let result = self
            .invoice
            .insert_one(invoice)
            .await
            .ok()
            .expect("Error adding invoice");

        Ok(result)
    }

    pub async fn get_sales(&self) -> Result<i64, Error> {
        let start = Local::now().date_naive().and_hms_opt(0, 0, 0).unwrap();
        let end = Local::now().date_naive().and_hms_opt(23, 59, 59).unwrap();

        let start = BsonDateTime::from_millis(start.timestamp_millis());
        let end = BsonDateTime::from_millis(end.timestamp_millis());

        let mut cursor = self
            .invoice
            .aggregate(vec![
                doc! {
                        "$match": {
                            "date_time": {
                                "$gte": start,
                                "$lte": end
                            }
                         }
                },
                doc! {
                    "$group": {
                        "_id": null,
                        "sumTotal": {
                            "$sum": "$total"
                        }
                    }
                },
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

    pub async fn get_cost(&self) -> Result<i64, Error> {
        let start = Local::now().date_naive().and_hms_opt(0, 0, 0).unwrap();
        let end = Local::now().date_naive().and_hms_opt(23, 59, 59).unwrap();

        let start = BsonDateTime::from_millis(start.timestamp_millis());
        let end = BsonDateTime::from_millis(end.timestamp_millis());

        let mut cursor = self
            .invoice
            .aggregate(vec![
                doc! {
                        "$match": {
                            "date_time": {
                                "$gte": start,
                                "$lte": end
                            }
                         }
                },
                doc! {
                    "$group": {
                        "_id": null,
                        "totalCost": {
                            "$sum": "$total_cost"
                        }
                    }
                },
            ])
            .await
            .ok()
            .expect("Error fetching sales Data");

        while let Some(result) = cursor.next().await {
            if let Ok(doc) = result {
                if let Some(Bson::Int64(total_cost)) = doc.get("totalCost") {
                    return Ok(*total_cost);
                }
            }
        }
        Ok(0)
    }
}
