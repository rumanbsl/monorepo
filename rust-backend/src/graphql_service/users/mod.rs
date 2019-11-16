use crate::State;
use juniper::{self, FieldResult, GraphQLInputObject, GraphQLObject};
use mongodb::{bson, db::ThreadedDatabase, doc, oid::ObjectId, Bson};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(GraphQLObject, Default, Serialize, Deserialize, Debug)]
#[graphql(description = "A Useroid creature in the Star Wars universe")]
pub struct User {
    name: String,
    email: String,
    password: String,
}

#[derive(GraphQLInputObject, Default, Serialize, Deserialize, Debug)]
#[graphql(description = "A humanoid creature in the Star Wars universe")]
pub struct NewUser {
    name: String,
    email: String,
    password: String,
}

pub fn get_user(ctx: &State, id: String) -> FieldResult<User> {
    let collection = ctx.db.lock().unwrap().collection("users");
    let doc = doc! {
        "_id": ObjectId::with_string(&id[..]).unwrap()
    };
    let cursor = collection
        .find_one(Some(doc.clone()), None)
        .ok()
        .expect("Failed to execute find.");
    if let Some(data) = cursor {
        let json: Value = Bson::Document(data).into();
        let u: User = serde_json::from_value(json).unwrap();
        Ok(u)
    } else {
        Ok(User::default())
    }
}

pub fn create_user(ctx: &State, user: NewUser) -> FieldResult<String> {
    let collection = ctx.db.lock().unwrap().collection("users");
    let doc = doc! {
        "name": user.name,
        "email": user.email,
        "password": user.password,
    };
    let cursor = collection
        .insert_one(doc.clone(), None)
        .expect("Failed to execute find.");
    println!("{:#?}", cursor);
    Ok("Created".into())
}
