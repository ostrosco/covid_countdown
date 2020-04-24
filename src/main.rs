#[macro_use]
extern crate diesel;
use actix_files as fs;
use actix_rt;
use actix_web::{get, middleware, web, App, Error, HttpResponse, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

mod actions;
mod models;
mod schema;

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

#[get("/states")]
async fn get_all_states(
    pool: web::Data<DbPool>,
) -> Result<HttpResponse, Error> {
    let conn = pool
        .get()
        .expect("Couldn't get a db connection from the pool");
    let state_names: Vec<String> =
        web::block(move || actions::get_state_names(&conn))
            .await
            .map_err(|e| {
                eprintln!("{}", e);
                HttpResponse::InternalServerError().finish()
            })?;

    Ok(HttpResponse::Ok().json(state_names))
}

#[get("/state/{state_name}")]
async fn get_state(
    pool: web::Data<DbPool>,
    state_name: web::Path<String>,
) -> Result<HttpResponse, Error> {
    let state_name = state_name.into_inner();
    let state_name_cl = state_name.clone();
    let conn = pool
        .get()
        .expect("Couldn't get a db connection from the pool");

    let state: Option<models::State> =
        web::block(move || actions::find_state(state_name, &conn))
            .await
            .map_err(|e| {
                eprintln!("{}", e);
                HttpResponse::InternalServerError().finish()
            })?;

    if let Some(state) = state {
        Ok(HttpResponse::Ok().json(state))
    } else {
        let res = HttpResponse::NotFound()
            .body(format!("No data for {}", state_name_cl));
        Ok(res)
    }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let connspec =
        std::env::var("DATABASE_URL").expect("no DATABASE_URL found");
    let manager = ConnectionManager::<SqliteConnection>::new(connspec);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let bind = "0.0.0.0:80";

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(middleware::Logger::default())
            .service(get_state)
            .service(get_all_states)
            .service(fs::Files::new("/", "./static/").index_file("index.html"))
    })
    .bind(&bind)?
    .run()
    .await
}
