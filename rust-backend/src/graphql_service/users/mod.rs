use crate::State;
use juniper::{self, FieldResult, GraphQLInputObject};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use wither::{
	mongodb::{bson, db::ThreadedDatabase, doc, oid::ObjectId, Bson},
	prelude::*,
};
pub mod schema;
pub use schema::User;

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
		println!("{:#?}", u);
		Ok(u)
	} else {
		Ok(User::default())
	}
}

pub fn create_user(ctx: &State, user: NewUser) -> FieldResult<String> {
	let db = ctx.db.lock().unwrap();
	let mut new_user = User {
		id: None,
		email: user.email,
		name: user.name,
		password: user.password,
	};
	new_user.save(db.clone(), None)?;

	Ok("created".into())
}
