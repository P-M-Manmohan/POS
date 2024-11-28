use mongodb::{bson::doc, options::ClientOptions, Client};

pub async fn init_mongodb() -> Client {
    let client_uri = "mongodb://localhost:27017";
    let options = ClientOptions::parse(client_uri).await.unwrap();
    Client::with_options(options).unwrap()
}

