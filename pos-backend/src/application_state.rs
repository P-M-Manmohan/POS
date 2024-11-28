use sqlx::PgPool;
use mongodb::Client as MongoClient;

pub struct AppState {
   pub postgres: PgPool,
   pub mongodb: MongoClient,
}

