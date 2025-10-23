


export const SQL_TEXT = {
    TABLE_INFO_CATEGORY: "PRAGMA table_info(ms_category);",
    SELECT_CATEGORY: `
        SELECT 
            mc.id as id,
            mc.name as name,
            dc.created_at as delete_at
        FROM 
            ms_category mc 
        LEFT JOIN 
            d_ms_category dc 
        ON 
            mc.id = dc.id 
        WHERE
            delete_at IS NULL
    `,
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