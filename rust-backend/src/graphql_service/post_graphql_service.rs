use http::status::StatusCode;
use juniper::{self, http::GraphQLRequest, object, FieldResult, RootNode};
use tide::{error::ResultExt, response, Context, EndpointResult};

use super::users;
use crate::State;

struct Query;
struct Mutation;
impl juniper::Context for State {}

#[object(Context = State)]
impl Query {
	fn version(ctx: &State) -> String {
		println!("User Info: => {:?}", ctx.authenticated_user);
		"1.0".into()
	}
}

#[object(Context = State)]
impl Mutation {
	async fn create_user(ctx: &State, user: users::NewUser) -> FieldResult<String> {
		users::create_user(ctx, user)
	}
	async fn login_user(ctx: &State, email: String, password: String) -> FieldResult<String> {
		users::login_user(ctx, email, password)
	}
}

type Schema = RootNode<'static, Query, Mutation>;

pub async fn post_graphql_service(mut ctx: Context<State>) -> EndpointResult {
	let authenticated_user = users::logged_user_info(&ctx);
	let query: GraphQLRequest = ctx.body_json().await.client_err()?;
	let schema = Schema::new(Query, Mutation);
	let state = ctx.state();
	let state = State {
		db: state.db.clone(),
		env: state.env.clone(),
		authenticated_user,
	};
	let gql = query.execute(&schema, &state);
	let status = if gql.is_ok() {
		StatusCode::OK
	} else {
		StatusCode::BAD_REQUEST
	};
	let mut resp = response::json(gql);
	*resp.status_mut() = status;
	Ok(resp)
}
