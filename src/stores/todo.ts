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
                          {[idCategory: string]:  
                                        {id: string, 
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
                          {[idCategory: string]:  
                                        {id: string, 
                                          createAt: Date,
                                          doAt: Date, 
                                          title: string, 
                                          detail: string}[]}} = {};
    for (let date = new Date(minDate); date.getTime() <= maxDate; date.setDate(date.getDate() + 1)) {
      calendarTodo[date.toLocaleDateString()] = {};
      this.listCategory.forEach(category => {
        calendarTodo[date.toLocaleDateString()]![category.id] = [];
        if(this.currentTodo[category.id]!.length > 0){
          this.currentTodo[category.id]!.forEach(item => {
            if(item.doAt.getFullYear() == date.getFullYear() && item.doAt.getMonth() == date.getMonth() && item.doAt.getDate() == date.getDate()){
              calendarTodo[date.toLocaleDateString()]![category.id]?.push(item);
            }
          });
        }
      });
    }
    console.log(calendarTodo);
    return calendarTodo;
  }
  },
  
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
    this.currentTodo["0"]!.push({id: "1", createAt: new Date("2025-10-02"), doAt: new Date("2025-10-02"), title: "test2", detail: "test2-1"});
    this.currentTodo["0"]!.push({id: "2", createAt: new Date("2025-10-03"), doAt: new Date("2025-10-03"), title: "test3", detail: "test3-1"});
    this.currentTodo["1"]!.push({id: "3", createAt: new Date("2025-10-04"), doAt: new Date("2025-10-04"), title: "test4", detail: "test4-1"});
    this.currentTodo["1"]!.push({id: "4", createAt: new Date("2025-10-05"), doAt: new Date("2025-10-05"), title: "test5", detail: "test5-1"});
    },

    addTodo(): void {
      this.currentTodo["0"]?.push({id: "10", createAt: new Date("2025-10-05"), doAt: new Date("2025-10-05"), title: "test10", detail: "test10-1"});
    }
  },

});  