use http::status::StatusCode;
use tide::{error::ResultExt, response, Context, EndpointResult};
use juniper::{
    self,
    object,
    RootNode,
    http::GraphQLRequest,
    FieldResult,
};

use super::super::{State};
use super::users;

struct Query;
struct Mutation;
impl juniper::Context for State {}


#[object(Context = State)]
impl Query {
    fn get_user(ctx: &State, id: String)->FieldResult<users::User>{ users::get_user(ctx, id) }
}

#[object(Context = State)]
impl Mutation {
    fn create_user(ctx: &State, user: users::NewUser)->FieldResult<String>{ users::create_user(ctx, user) }
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


