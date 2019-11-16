use super::{graphql_service, State};
use tide::{App, Context};

async fn echo_path(_: Context<State>) -> String {
	"others".into()
}

pub fn setup_routes(app: &mut App<State>) {
	&app
		.at("/graphql")
		.get(graphql_service::get_graphql_service)
		.post(graphql_service::post_graphql_service);

	&app.at("*").get(echo_path);
}
