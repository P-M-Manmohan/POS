use serde::{Serialize, Deserialize};
use sqlx::FromRow;
use bigdecimal::BigDecimal;

#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct Product{
    id: i32,
    name: String,
    price: BigDecimal,
    stock: i32,
}


#[derive(Serialize, Deserialize, FromRow, Debug)]
pub struct ProductId{
    pub id:i32,
}
