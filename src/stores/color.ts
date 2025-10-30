// src/stores/counter.ts
import { defineStore } from "pinia";
import { COLOR_INFO, COLOR_TYPE, LOCAL_STORAGE, SQL_TEXT, TABLE_INFO } from "@/scripts/const";
import { useSQLite } from "@/scripts/sqlite";
const { isLoading, error, executeQuery, exportDB, importDB } = useSQLite()

// カウンターストアを定義
export const useColorStore = defineStore("color", {
  // ストアの状態（state）
  state: () => ({
    colorFormat: "test" as string,
  }),
  getters: {
  },
  
  actions: {
    init(){
      const savedColor = localStorage.getItem(LOCAL_STORAGE.COLOR);
      if(savedColor == null){
        this.colorFormat = "test";
      }else{
        this.changeColorFormat(savedColor);
      }
    },  
    getColorBy(id: string): any {
        return (COLOR_INFO[this.colorFormat] as any).color[id] as string;
    },
    changeColorFormat(newId: string){
      this.colorFormat = newId;
      localStorage.setItem(LOCAL_STORAGE.COLOR, newId);
    }
  },

});  