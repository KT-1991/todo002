// src/stores/counter.ts
import { defineStore } from "pinia";
import { COLOR_INFO, COLOR_TYPE, SQL_TEXT, TABLE_INFO } from "@/scripts/const";
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
    getColorBy(id: string): any {
        return (COLOR_INFO[this.colorFormat] as any).color[id] as string;
    },
  },

});  