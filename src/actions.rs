use diesel::prelude::*;

use crate::models;

pub fn find_state(
    state: String,
    conn: &SqliteConnection,
) -> Result<Option<models::State>, diesel::result::Error> {
    use crate::schema::states::dsl::*;

    let state = states
        .filter(state_name.eq(state))
        .first::<models::State>(conn)
        .optional()?;

    Ok(state)
}

pub fn get_state_names(
    conn: &SqliteConnection,
) -> Result<Vec<String>, diesel::result::Error> {
    use crate::schema::states::dsl::*;

    let state_names = states.select(state_name).load::<String>(conn)?;
    Ok(state_names)
}
