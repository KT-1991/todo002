export const LOCAL_STORAGE = {
    COLOR: "todo_color",
}

export const DIALOG_TYPE = {
    ERROR: "error",
    ALERT: "alert",
    INFO: "info",
}

export const RESPONSE_TYPE = {
    OK: "ok",
    CANCEL: "cancel",
}

export const BUTTON_TYPE = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    TERTIARY: "tertiary",
}

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
export const COLOR_TYPE = {
    primary: "primary" as string,
    primaryHeavy: "primaryHeavy" as string,
    secondary: "secondary",
    secondaryHeavy: "secondaryHeavy",
    background: "background",
    error: "error",
    onPrimary: "onPrimary",
    onPrimaryHeavy: "onPrimaryHeavy",
    onSecondary: "onSecondary",
    onSecondaryHeavy: "onSecondaryHeavy",
    onBackground: "onBackground",
    onError: "onError",
    gray: "gray"
}

export const COLOR_INFO: {[id: string]: {id: string,
                                        name: string, 
                                        color: {
                                                primary : string,
                                               primaryHeavy: string,  
                                               secondary: string,
                                               secondaryHeavy: string,
                                               background: string,
                                               error: string,
                                               onPrimary: string,
                                               onPrimaryHeavy: string,
                                               onSecondary: string,
                                               onSecondaryHeavy: string,
                                               onBackground: string,
                                               onError: string,
                                               gray: string         
                                            }
}} = {
    "test": {id: "test",
                name: "テスト", 
                color: {
                    primary : "#E1F5FE",
                    primaryHeavy: "#B3E5FC",
                    secondary: "#E0F7FA",
                    secondaryHeavy: "#B2EBF2",
                    background: "#FFFFFF",
                    error: "#FF0000",
                    onPrimary: "#000000",
                    onPrimaryHeavy: "#000000",
                    onSecondary: "#000000",
                    onSecondaryHeavy: "#000000",
                    onBackground: "#000000",
                    onError: "#FFFFFF",
                    gray: "#AAAAAA"
                }   
            }, 
    "light": {id: "light",
                name: "ライト", 
                color: {
                    primary : "#ECEFF1",
                    primaryHeavy: "#B0BEC5",
                    secondary: "#EFEBE9",
                    secondaryHeavy: "#D7CCC8",
                    background: "#FFFFFF",
                    error: "#FF0000",
                    onPrimary: "#000000",
                    onPrimaryHeavy: "#000000",
                    onSecondary: "#000000",
                    onSecondaryHeavy: "#000000",
                    onBackground: "#000000",
                    onError: "#FFFFFF",
                    gray: "#AAAAAA"
                }   
            }, 
    "dark": {id: "dark",
                name: "ダーク", 
                color: {
                    primary : "#263238",
                    primaryHeavy: "#37474F",
                    secondary: "#212121",
                    secondaryHeavy: "#424242",
                    background: "#000000",
                    error: "#FF0000",
                    onPrimary: "#FFFFFF",
                    onPrimaryHeavy: "#FFFFFF",
                    onSecondary: "#FFFFFF",
                    onSecondaryHeavy: "#FFFFFF",
                    onBackground: "#FFFFFF",
                    onError: "#FFFFFF",
                    gray: "#AAAAAA"
                }   
            }, 
}
