// src/stores/counter.ts
import { defineStore } from "pinia";

// カウンターストアを定義
export const useTodoStore = defineStore("todo", {
  // ストアの状態（state）
  state: () => ({
    listCategory: {} as {id: string, name: string}[],
    currentTodo: {} as {[idCategory: string]: {id: string, 
                                              createAt: Date,
                                              doAt: Date, 
                                              title: string, 
                                              detail: string}[]},
    completedTodo: {} as {[idCategory: string]: {id: string, createAt: Date, completedAt: Date, title: string, detail: string}[]},
  }),
  
  actions: {
    init(): void {
    this.listCategory = [];
    this.listCategory.push({id: "0", name:"書類作成"});
    this.listCategory.push({id: "1", name:"書類提出"});
    this.listCategory.push({id: "2", name:"その他"});
    this.listCategory.forEach(element => {
        this.currentTodo[element.id] = [];
        this.completedTodo[element.id] = [];
    });
    this.currentTodo["0"]!.push({id: "0", createAt: new Date("2025-10-01"), doAt: new Date("2025-10-01"), title: "test1", detail: "test1-1"});
    this.currentTodo["0"]!.push({id: "0", createAt: new Date("2025-10-02"), doAt: new Date("2025-10-02"), title: "test2", detail: "test2-1"});
    this.currentTodo["0"]!.push({id: "0", createAt: new Date("2025-10-03"), doAt: new Date("2025-10-03"), title: "test3", detail: "test3-1"});
    this.currentTodo["1"]!.push({id: "1", createAt: new Date("2025-10-01"), doAt: new Date("2025-10-01"), title: "test4", detail: "test4-1"});
    this.currentTodo["1"]!.push({id: "1", createAt: new Date("2025-10-02"), doAt: new Date("2025-10-03"), title: "test5", detail: "test5-1"});
    },
  },

});  