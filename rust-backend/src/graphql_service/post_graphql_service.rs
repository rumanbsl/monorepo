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
	fn get_user(ctx: &State, id: String) -> FieldResult<users::User> {
		users::get_user(ctx, id)
	}
}

#[object(Context = State)]
impl Mutation {
	fn create_user(ctx: &State, user: users::NewUser) -> FieldResult<String> {
		users::create_user(ctx, user)
	}
	pub fn login_user(ctx: &State, email: String, password: String) -> FieldResult<String> {
		users::login_user(ctx, email, password)
	}
}

type Schema = RootNode<'static, Query, Mutation>;

pub async fn post_graphql_service(mut cx: Context<State>) -> EndpointResult {
	let query: GraphQLRequest = cx.body_json().await.client_err()?;
	let schema = Schema::new(Query, Mutation);
	let gql = query.execute(&schema, cx.state());
	let status = if gql.is_ok() {
		StatusCode::OK
	} else {
		StatusCode::BAD_REQUEST
	};
	let mut resp = response::json(gql);
	*resp.status_mut() = status;
	Ok(resp)
}
