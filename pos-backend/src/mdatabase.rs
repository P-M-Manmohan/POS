use mongodb::{error::Error, results::InsertOneResult, Client, Collection};
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
}

















//use mongodb::{ options::ClientOptions, Client};

//use std::{env, sync::Arc };

//pub async fn init_mongodb() -> mongodb::error::Result<Arc<Client>> {
//    dotenv::dotenv().ok();
//    let client_uri = env::var("MONGO_URI").expect("Mongo uri must be in environment variables");
//    let options = ClientOptions::parse(&client_uri).await?;
//    let client = Client::with_options(options)?;

//   Ok(Arc::new(client))
//}
