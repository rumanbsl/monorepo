use crate::State;
use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{decode, encode, Header, Validation};
use juniper::{self, FieldError, FieldResult, GraphQLInputObject};
use lazy_static::lazy_static;
use regex::Regex;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use webforms::validate::{ValidateError, ValidateForm};
use wither::{
	mongodb::{bson, db::ThreadedDatabase, doc, Bson},
	prelude::*,
};

use tide::Context;

pub mod schema;
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

#[derive(Deserialize, Serialize, Debug)]
pub struct Claim {
	sub: String,
	exp: usize,
}

pub fn logged_user_info(ctx: &Context<State>) -> Option<User> {
	match ctx.headers().get("Authorization") {
		None => None,
		Some(auth_header) => match auth_header.to_str() {
			Ok(token) => {
				let token = &token[7..];
				match decode::<Claim>(
					&token,
					&ctx.state().env.jwt_secret.as_ref(),
					&Validation::default(),
				) {
					Err(err) => {
						println!("..{:?}", err);
						None
					}
					Ok(auth) => {
						let email = auth.claims.sub;
						// locate user
						let collection = ctx.state().db.collection("users");
						let doc = doc! {
								"email": email
						};
						let cursor = collection.find_one(Some(doc.clone()), None).ok();
						if let Some(data) = cursor.unwrap() {
							let json: Value = Bson::Document(data).into();
							let user: User = serde_json::from_value(json).unwrap();
							Some(user)
						} else {
							None
						}
					}
				}
			}
			Err(_) => None,
		},
	}
}

pub fn create_user(ctx: &State, user: NewUser) -> FieldResult<String> {
	if let Err(err) = user.validate() {
		return Err(FieldError::from(format!("{:?}", err)));
	}
	let password = hash(user.password, DEFAULT_COST)?;
	let mut new_user = User {
		id: None,
		email: user.email,
		name: user.name,
		password,
	};
	new_user.save(ctx.db.clone(), None)?;

	Ok("created".into())
}

pub fn login_user(ctx: &State, email: String, password: String) -> FieldResult<String> {
	let found = User::find_one(ctx.db.clone(), Some(doc! { "email": email.clone() }), None)?;
	if let Some(user) = found {
		let password = verify(password, &user.password)?;
		if !password {
			Err(FieldError::from("Password missmatch"))
		} else {
			let claim = Claim {
				sub: email,
				exp: 1_000_000_000_000,
			};
			let token = encode(&Header::default(), &claim, &ctx.env.jwt_secret.as_ref())?;
			Ok(token)
		}
	} else {
		Err(FieldError::from("User not found"))
	}
}
