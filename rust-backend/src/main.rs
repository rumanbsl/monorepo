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
}

impl State {
    pub fn new(db: Mutex<Database>) -> State {
        State { db }
    }
}

fn main() -> Result<(), Error> {
    let config = Config::get()?;

    let mongo = Client::connect(&config.db_host[..], 27017)
        .expect("Failed to initialize standalone client.");
    mongo.db("tide").collection("hello");
    let mut app = App::with_state(State::new(Mutex::new(mongo.db("docker-ts"))));
    app.middleware(RootLogger::new());

    setup_routes(&mut app);
    let server_url = format!("0.0.0.0:{}", config.server_port);
    Ok(app.serve(server_url)?)
}

#[derive(Default)]
struct Config {
    db_host: String,
    server_port: String,
}

impl Config {
    fn get() -> Result<Config, Error> {
        let mut config = Config::default();
        if let Ok(port) = env::var("SERVER_PORT") {
            config.server_port = port;
        } else {
            return Err(Error::new(ErrorKind::NotFound, "No server port found"));
        };
        if let Ok(db_host) = env::var("HOST_DB") {
            config.db_host = db_host;
        } else {
            return Err(Error::new(ErrorKind::NotFound, "No db host found"));
        };

        Ok(config)
    }
}
