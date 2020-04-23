use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable)]
pub struct State {
    id: i32,
    state_name: String,
    stay_at_home_end: NaiveDateTime,
}
