table! {
    states (id) {
        id -> Integer,
        state_name -> Text,
        has_end_date -> Bool,
        end_date -> Nullable<Timestamp>,
    }
}
