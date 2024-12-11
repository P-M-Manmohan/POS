use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct Sales {
    pub date: NaiveDateTime,
    pub profit: f32,
    pub sales: f32,
}
