use serde::{Serialize, Deserialize};
use sqlx::FromRow;
use bigdecimal::BigDecimal;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct Product{
    pub id: i32,
    pub name: String,
    pub price: BigDecimal,
    pub stock: i32,
}


#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct ProductId{
    pub id:i32,
}
