mod graphql_service;
mod routes;

use routes::setup_routes;
use std::{
	env,
	io::{Error, ErrorKind},
	sync::Mutex,
};
use tide::{middleware::RootLogger, App};
use wither::mongodb::{
	db::{Database, ThreadedDatabase},
	Client, ThreadedClient,
};
pub struct State {
	db: Mutex<Database>,
	env: Env,
}

impl State {
	pub fn new(db: Mutex<Database>, env: Env) -> State {
		State { db, env }
	}
}

fn main() -> Result<(), Error> {
	match Env::get() {
		Err(e) => Err(Error::new(ErrorKind::NotFound, e)),
		Ok(env_vars) => {
			let mongo = Client::connect(&env_vars.db_host[..], 27017)?;
			mongo.db("tide").collection("hello");
			let mut app = App::with_state(State::new(
				Mutex::new(mongo.db("docker-ts")),
				env_vars.clone(),
			));
			app.middleware(RootLogger::new());

			setup_routes(&mut app);
			let server_url = format!("0.0.0.0:{}", env_vars.server_port);
			Ok(app.serve(server_url)?)
		}
	}
}

#[derive(Default, Clone)]
pub struct Env {
	db_host: String,
	server_port: String,
	jwt_secret: String,
}

impl Env {
	fn get() -> Result<Env, env::VarError> {
		let mut env_vars = Env::default();
		env_vars.server_port = env::var("SERVER_PORT")?;
		env_vars.db_host = env::var("HOST_DB")?;
		env_vars.jwt_secret = env::var("JWT_SECRET_KEY")?;

		Ok(env_vars)
	}
}
