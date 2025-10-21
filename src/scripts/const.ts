


export const SQL_TEXT = {
    TABLE_INFO_CATEGORY: "PRAGMA table_info(ms_category);",
    SELECT_CATEGORY: "SELECT * FROM ms_category",
    INIT_CATEGORY: [
        "INSERT INTO ms_category (name) VALUES ('書類作成')",
        "INSERT INTO ms_category (name) VALUES ('書類提出')" ,
        "INSERT INTO ms_category (name) VALUES ('その他')" 
    ],
}

export const TABLE_INFO = {
    "MS_CATEGORY": [
        "id",
        "name",
        "created_at"
    ],

}