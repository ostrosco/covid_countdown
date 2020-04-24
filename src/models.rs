use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct State {
    id: i32,
    state_name: String,
    has_end_date: bool,
    end_date: Option<NaiveDateTime>,
}
