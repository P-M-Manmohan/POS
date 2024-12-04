use mongodb::bson::{oid::ObjectId, DateTime};
use serde::{Serialize,Deserialize};
use chrono::Utc;
use std::time::SystemTime;

#[derive(Clone, Deserialize, Serialize, Debug)]
pub struct Item{
    pub id: u32,
    pub name: String,
    pub quantity: u32,
    pub unit_price: String,
    pub price: u32,

}


#[derive(Deserialize, Serialize, Debug)]
pub struct Invoice{
    pub _id: ObjectId,
    pub date_time: DateTime,
    pub items: Vec<Item>,
    pub sub_total: u32,
    pub total: u32,
    pub tax_rate: u8,
    pub tax: u32,
    pub discount: u32,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct InvoiceRequest{
    pub date_time: String,
    pub items: Vec<Item>,
    pub sub_total: u32,
    pub total: u32,
    pub tax_rate: u8,
    pub tax: u32,
    pub discount: u32,
}

impl TryFrom<InvoiceRequest> for Invoice {
    type Error = Box<dyn std::error::Error>;

    fn try_from(item: InvoiceRequest) -> Result<Self, Self::Error>{
        let chrono_datetime: SystemTime = chrono::DateTime::parse_from_rfc3339(&item.date_time)
            .map_err(|err| format!("error parsing date time: {}",err))?
            .with_timezone(&Utc)
            .into();

        Ok(Self {
            _id:ObjectId::new(),
            date_time: DateTime::from(chrono_datetime),
            items: item.items,
            sub_total: item.sub_total,
            total: item.total,
            tax_rate: item.tax_rate,
            tax: item.tax,
            discount: item.discount,
        })
    }
}

