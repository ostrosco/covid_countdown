#[macro_use]
extern crate diesel;
use actix_web::{get, web, App, HttpServer, Responder};
use actix_rt;

mod actions;
mod models;
mod schema;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    println!("Hello, world!");
    Ok(())
}
