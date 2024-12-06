use serde::{Serialize, Deserialize};
use chrono::DateTime;
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct Sales{
    pub date: DateTime,
    pub profit: u32,
    pub sales: u32,
}
