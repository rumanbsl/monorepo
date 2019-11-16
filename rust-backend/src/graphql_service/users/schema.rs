use juniper::{self, object};
use serde::{Deserialize, Serialize};
use wither::mongodb::{bson, coll::options::IndexModel, doc, oid::ObjectId};

use wither_derive;

#[derive(Serialize, Deserialize, Debug, wither_derive::Model, Default)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    #[model(index(index = "dsc", unique = "true"))]
    pub email: String,
    pub name: String,
    pub password: String,
}

#[object]
impl User {
    pub fn email(&self) -> &str {
        self.email.as_str()
    }
    pub fn name(&self) -> &str {
        self.name.as_str()
    }
    pub fn id(&self) -> String {
        if let Some(id) = &self.id {
            format!("{}", id)
        } else {
            "".into()
        }
    }
}
