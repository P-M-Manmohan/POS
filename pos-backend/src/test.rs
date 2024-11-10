use std::{
    collections::HashMap, //To create and use a hashmap
    sync::{Arc,Mutex},// ARC(Atomic Reference Counting) -> for safe multithreading while ensuring
    // safety . This is immutable by default can be made mutable by wraping in Mutex or rwLock  , Mutex -> To make it mutable
};

use actix_web::{App, HttpServer, Responder, web, HttpResponse, Error, error::ErrorNotFound}; 
                //App is the instance in which the API runs
                //HttpServer created the Httpserver for the app to run in
                //Responder converts return values into HTTP responses 
                //web is used for handling routing, deserializing and handling request parameters
                //HttpResponse is used to create an HttpResponse with more control over it
                //Error is an alias for Box<dyn ResponseError> this converts an error into and http
                //response
                //error::ErrorNotFound creates the 404 error
use serde::{Deserialize, Serialize}; //Serialize -> it is the porcess of converting in memory data
                                     //structure like rust structand converting it into easily storable and
                                     //transmitable data types like json
                                     //
                                     //Deserialize -> it is the porcess of converting data
                                     //structures into in memory data types like rust structs

#[derive(Serialize, Deserialize)]
struct User{
    name:String,
}


type UserDb = Arc<Mutex<HashMap<u32,User>>>;

#[actix_web::get("/users/{id}")]
async fn get_user(
    user_id: web::Path<u32>,
    db: web::Data<UserDb>
    ) -> Result<impl Responder, Error>{
    let user_id = user_id.into_inner();
    let db = match db.lock() { //.lock() makes sure only one thread can access the data at a time
                               //ensuring data concurrence
                               //the data can get poisoned when trying to access non existant data
        Ok(gaurd) => gaurd,
        Err(poisoned) => poisoned.into_inner()
    };

    match db.get(&user_id){
        Some(user_data) =>  Ok(HttpResponse::Ok().json(user_data)),
        None => Err(ErrorNotFound("User not found")),
    }
}

#[derive(Serialize)]
struct CreateUserResponse {
    id: u32,
    name: String,
}

#[actix_web::post("/users")]
async fn create_user(   
        user_data: web::Json<User>,
        db: web::Data<UserDb>,
    ) -> impl Responder {
    let mut db = db.lock().unwrap();
    let new_id = *db.keys().max().unwrap_or(&0) + 1; // .max().unwrap returns &k where k is
                                                     // the highest key you can add &u32 with u32
                                                     // in this case as rust automatically
                                                     // deferences &u32 so that you can add it with
                                                     // u32

    let name = user_data.name.clone(); // using .into_inner() uses up user_data so cloning it so
                                       // that it can be used again
    db.insert(new_id, user_data.into_inner());
    HttpResponse::Created().json(CreateUserResponse {
        id: new_id,
        name,
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()>{
    let port = 8080;
    println!("Starting server of port {port}");

    let user_db: UserDb = Arc::new(Mutex::new(HashMap::<u32, User>::new()));

    HttpServer::new(move|| {
        let app_data = web::Data::new(user_db.clone());
        App::new()
            .app_data(app_data)
            .service(get_user)
            .service(create_user)
    })
        .bind(("127.0.0.1",port))?
        .workers(2)
        .run()
        .await

}
