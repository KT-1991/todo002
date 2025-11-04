// src/stores/counter.ts
import { defineStore } from "pinia";
import { SQL_TEXT, TABLE_INFO } from "@/scripts/const";
import { useSQLite } from "@/scripts/sqlite";
const { isLoading, error, executeQuery, exportDB, importDB } = useSQLite()

// カウンターストアを定義
export const useTodoStore = defineStore("todo", {
  // ストアの状態（state）
  state: () => ({
    listCategory: [{}] as {id: number, name: string}[],
    currentTodo: {} as {[idCategory: number]: {id: number, 
                                              createAt: Date,
                                              doAt: Date, 
                                              title: string, 
                                              detail: string}[]},
    completedTodo: {} as {[idCategory: number]: {id: number, 
                                                createAt: Date, 
                                                doAt: Date, 
                                                completedAt: Date, 
                                                title: string, 
                                                detail: string}[]},
    suggestions: [] as string[],
    isSortedByDateAsc: true as Boolean,
    isSortedByTitleAsc: true as Boolean,
  }),
  getters: {
    dateSpan(): string[] {
      let minDate: number;
      let maxDate: number;
        minDate = new Date().getTime();
        maxDate = new Date().getTime();
      this.listCategory.forEach(category => {
          this.currentTodo[category.id]?.forEach(item => {
              if(minDate > item.doAt.getTime()){
                  minDate = item.doAt.getTime();
              }
              if(maxDate < item.doAt.getTime()){
                  maxDate = item.doAt.getTime();
              }
          })
      });
      const result = [];
      for (let date = new Date(minDate); date.getTime() <= maxDate; date.setDate(date.getDate() + 1)) {
        result.push(date.toLocaleDateString());
      }
      return result;
    },
    calenderTodo(): {[doAt: string]: 
                          {[idCategory: number]:  
                                        {id: number, 
                                          createAt: Date,
                                          doAt: Date, 
                                          title: string, 
                                          detail: string}[]}} {
      let minDate: number;
      let maxDate: number;
        minDate = new Date().getTime();
        maxDate = new Date().getTime();
      
      this.listCategory.forEach(category => {
          this.currentTodo[category.id]?.forEach(item => {
              if(minDate > item.doAt.getTime()){
                  minDate = item.doAt.getTime();
              }
              if(maxDate < item.doAt.getTime()){
                  maxDate = item.doAt.getTime();
              }
          })
      });
    const calendarTodo: {[doAt: string]: 
                          {[idCategory: number]:  
                                        {id: number, 
                                          createAt: Date,
                                          doAt: Date, 
                                          title: string, 
                                          detail: string}[]}} = {};
    for (let date = new Date(minDate); date.getTime() <= maxDate; date.setDate(date.getDate() + 1)) {
      calendarTodo[date.toLocaleDateString()] = {};
      this.listCategory.forEach(category => {
        calendarTodo[date.toLocaleDateString()]![category.id] = [];
        if(this.currentTodo[category.id] != null){
          if(this.currentTodo[category.id]!.length > 0){
            this.currentTodo[category.id]!.forEach(item => {
              if(item.doAt.getFullYear() == date.getFullYear() && item.doAt.getMonth() == date.getMonth() && item.doAt.getDate() == date.getDate()){
                calendarTodo[date.toLocaleDateString()]![category.id]?.push(item);
              }
            });
          }          
        }
      });
    }
    return calendarTodo;
  }
  },
  
  actions: {
    
    async init() {
      await this.initListCategory();
      await this.initTodo(false, 0, 0);

      this.listCategory.forEach(category => {
        //this.isSortedByDateAsc = false;
        this.isSortedByDateAsc = !this.isSortedByDateAsc;
        this.sortByDate(category.id);
      });
    },

    async initWithCompletedData(limit: number, offset: number){
      await this.initListCategory();
      await this.initTodo(true, limit, offset);
    },

    async getColumnInfo(tableName: string): Promise<{[colName: string]: number}> {
      const result = await executeQuery("PRAGMA table_info(" + tableName + ");")
      const tableColNameId: {[key: string]: number} = {};
      for(let i=0; i < result.result.resultRows?.length!; i++){
        const id: number = result.result.resultRows![i]![0] as number;
        const name: string = result.result.resultRows![i]![1] as string;
        tableColNameId[name] = id;
      }
      return tableColNameId;
    },
    async initListCategory() {
      const colIdName: {[colName: string]: number} = await this.getColumnInfo("ms_category");
      let result = await executeQuery(SQL_TEXT.SELECT_CATEGORY);
      if(result?.result.resultRows?.length == 0){
        for(let i=0; i < SQL_TEXT.INIT_CATEGORY.length; i++){
          await executeQuery(SQL_TEXT.INIT_CATEGORY[i]!)
        }
        result = await executeQuery(SQL_TEXT.SELECT_CATEGORY);
      }
      
      this.listCategory = [];
      for(let i=0; i < result?.result.resultRows!.length; i++){
        const item = result?.result.resultRows![i];
        const id: number = item![colIdName["id"] as number] as number;
        const name: string = item![colIdName["name"!] as number] as string;
        this.listCategory.push({id: id, name: name});
      }
    },

    async initTodo(hasCompletedData: boolean, limit: number, offset: number) {
      this.listCategory.forEach(element => {
          this.currentTodo[element.id] = [];
          this.completedTodo[element.id] = [];
      });
      let whereCondition: string = "";
      let tableCondition: string = " d_tr_todo dt ";
      let limitCondition: string = "" ;
      if(!hasCompletedData){
        whereCondition = " WHERE deleted_at IS NULL ";
      }else{
        limitCondition = " LIMIT " + offset.toString() + " , " + limit.toString()
        tableCondition = ` ( SELECT 
                                * 
                              FROM 
                                d_tr_todo 
                              ORDER BY 
                                created_at DESC 
                              LIMIT ` + (offset + limit).toString() + ` ) dt `;        
      }
      
      let sqlSelect: string = `SELECT 
                                    tt.id as id,
                                    tt.id_category as id_category,
                                    tt.title as title,
                                    tt.detail as detail,
                                    tt.do_at as do_at,
                                    tt.created_at as created_at,
                                    dt.created_at as deleted_at`
                                if(hasCompletedData){
                                  sqlSelect += " , ifnull(dt.created_at, tt.created_at) as sort_date " 
                                }
                      
                                sqlSelect +=  ` 
                                  FROM 
                                    tr_todo tt 
                                  LEFT JOIN `
                                  + tableCondition +
                                  `
                                  ON tt.id = dt.id `
                                  + whereCondition +
                                  `ORDER BY`
                                  if(hasCompletedData){
                                    sqlSelect += " sort_date DESC "
                                  }else{
                                    sqlSelect += " do_at DESC "
                                  }
                                  sqlSelect += limitCondition;


      console.log(sqlSelect);
      let result = await executeQuery(sqlSelect);
      if(result.result.resultRows?.length == 0){
        await executeQuery("INSERT INTO tr_todo (id_category, title, detail, do_at) VALUES (1, 'test01', 'test01-01', '2025-10-01')");
        result = await executeQuery("SELECT * FROM tr_todo");
      }
      const colNameId: {[key: string]: number} = {};
      colNameId["id"] = 0;
      colNameId["id_category"] = 1;
      colNameId["title"] = 2;
      colNameId["detail"] = 3;
      colNameId["do_at"] = 4;
      colNameId["created_at"] = 5;
      colNameId["deleted_at"] = 6;

      result.result.resultRows!.forEach(elem => {
        const id: number = elem[colNameId["id"]!] as number;
        const id_category: number = elem[colNameId["id_category"]!] as number;
        const title: string = elem[colNameId["title"]!] as string;
        const detail: string = elem[colNameId["detail"]!] as string;
        const do_at: Date = new Date(elem[colNameId["do_at"]!] as string) as Date;
        const created_at: Date = new Date(elem[colNameId["created_at"]!] as string) as Date;
        const deleted_at = elem[colNameId["deleted_at"]!];

        if(deleted_at != null){
          this.completedTodo[id_category]!.push({id: id, 
                                                  createAt: created_at, 
                                                  title: title, 
                                                  detail: detail, 
                                                  doAt: do_at,
                                                  completedAt: new Date(deleted_at as string)});
        }else{
          if(this.currentTodo[id_category] != null){
            this.currentTodo[id_category]!.push({id: id, createAt: created_at, title: title, detail: detail, doAt: do_at});
          }
        }
        
      });
    },

    async addTodo(idCategory: number, title: string, detail: string, doAt: Date) {
      await executeQuery("INSERT INTO tr_todo (id_category, title, detail, do_at) VALUES ("+idCategory.toString()+", '"+title+"', '"+detail+"', '"+doAt.toString()+"')");
      await this.initTodo(false, 0, 0)
    },
    async deleteTodo(id: number){
      const sql: string = `INSERT INTO d_tr_todo
                                    (id) 
                            VALUES (` + id.toString() + `)`;
      try {
        await executeQuery(sql);
      } catch (error) {
        
      }
      //await this.initTodo(false, 0, 0);
      await this.init();
    },
    async cancelDeleteTodo(id: number){
      const sql: string = `DELETE FROM  
                              d_tr_todo
                            WHERE id = ` + id.toString() ;
      try {
        await executeQuery(sql);
      } catch (error) {
        
      }
    },
    async cancelAddTodo(id: number){
      const sql: string = `DELETE FROM  
                              tr_todo
                            WHERE id = ` + id.toString() ;
      try {
        await executeQuery(sql);
      } catch (error) {
        
      }
    },
    async addCategory(name: string) {
      await executeQuery("INSERT INTO ms_category (name) VALUES ('" + name + "')")
      await this.initListCategory();
      await this.initTodo(false, 0, 0);
    },
    async deleteCategory(id: number) {
      const sql: string = `INSERT INTO d_ms_category
                              (id)
                          VALUES (` + id.toString() + `)`;
      await executeQuery(sql);
      await this.initTodo(false, 0, 0);
    },
    async makeSuggestions(word: string) {
      const sql: string = `SELECT 
                              DISTINCT title 
                            FROM 
                              tr_todo tt
                            WHERE 
                              title LIKE '%` + word + `%' 
                            ORDER BY
                              tt.id DESC
                            LIMIT 10`
      const result = await executeQuery(sql);
      this.suggestions = [];
      for(let i=0; i < result.result.resultRows?.length!; i++){
        this.suggestions.push(result.result.resultRows![i]![0] as string);
      }
    },
    export(){
      exportDB();
    },
    import(){
      importDB();
    },
    sortByDate(categoryId: number){
      this.isSortedByDateAsc = !this.isSortedByDateAsc
      this.currentTodo[categoryId]?.sort((a, b): number => {
        const sign: number = this.compareTime(a.doAt, b.doAt);
        if(sign == 0){
          return this.compareTitle(a.title, b.title);
        }else{
          return sign;
        }
      })
    },
    sortByTitle(categoryId: number){
      this.isSortedByTitleAsc = !this.isSortedByTitleAsc;
      this.currentTodo[categoryId]?.sort((a, b): number => {
        const sign: number = this.compareTitle(a.title, b.title);
        if(sign == 0){
          return this.compareTime(a.doAt, b.doAt);
        }else{
          return sign;
        }
      })
    },
    compareTime(a: Date, b: Date): number{
      let sign: number;

      if(this.isSortedByDateAsc){
        sign = 1;
      }else{
        sign = -1;
      }
      if(a.getTime() > b.getTime()){
        return sign;
      }else if(a.getTime() == b.getTime()){
        return 0;
      } else{
        return -sign;
      }
    },
    compareTitle(a: string, b: string): number{
      let sign: number;

      if(this.isSortedByTitleAsc){
        sign = 1;
      }else{
        sign = -1;
      }

      if(a > b){
        return sign;
      }else if(a == b){
        return 0;
      } else{
        return -sign;
      }
    },
    getMax(): number {
    let max = 0;
    this.listCategory.forEach(elem => {
        const listTodo = this.currentTodo[elem.id]
        if(listTodo != null){
            const len:number = listTodo.length;
            if(max < len){
                max = len;
            }            
        }
    })
    return max;
}
  },

});  