use crate::State;
use juniper::{self, FieldError, FieldResult, GraphQLInputObject};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use webforms::validate::{ValidateError, ValidateForm};
use wither::{
	mongodb::{bson, db::ThreadedDatabase, doc, oid::ObjectId, Bson},
	prelude::*,
};
pub mod schema;
use bcrypt::{hash, verify, DEFAULT_COST};
use lazy_static::lazy_static;
use regex::Regex;
pub use schema::User;
#[derive(GraphQLInputObject, Default, Serialize, Deserialize, Debug, ValidateForm)]
pub struct NewUser {
	#[validate(min_length = 5)]
	name: String,
	#[validate(email)]
	email: String,
	#[validate(min_length = 5)]
	password: String,
}

pub fn get_user(ctx: &State, id: String) -> FieldResult<User> {
	let collection = ctx.db.lock().unwrap().collection("users");
	let doc = doc! {
			"_id": ObjectId::with_string(&id[..]).unwrap()
	};
	let cursor = collection.find_one(Some(doc.clone()), None).ok();
	if let Some(data) = cursor.unwrap() {
		let json: Value = Bson::Document(data).into();
		let u: User = serde_json::from_value(json).unwrap();
		println!("{:#?}", u);
		Ok(u)
	} else {
		Ok(User::default())
	}
}

pub fn create_user(ctx: &State, user: NewUser) -> FieldResult<String> {
	if let Err(err) = user.validate() {
		return Err(FieldError::from(format!("{:?}", err)));
	}
	let db = ctx.db.lock()?;
	let password = hash(user.password, DEFAULT_COST)?;
	let mut new_user = User {
		id: None,
		email: user.email,
		name: user.name,
		password,
	};
	new_user.save(db.clone(), None)?;

	Ok("created".into())
}

pub fn login_user(ctx: &State, email: String, password: String) -> FieldResult<User> {
	let db = ctx.db.lock()?;
	let found = User::find_one(db.clone(), Some(doc! { "email": email }), None)?;
	if let Some(user) = found {
		println!("{:?}", user);
		let password = verify(password, &user.password)?;
		if !password {
			Err(FieldError::from(String::from("Password missmatch")))
		} else {
			Ok(user)
		}
	} else {
		Err(FieldError::from("User not found"))
	}
}
