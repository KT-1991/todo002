<script setup lang="ts">
import { useColorStore } from '@/stores/color';
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';
import { BUTTON_TYPE, COLOR_TYPE, DIALOG_TYPE, RESPONSE_TYPE } from '@/scripts/const';
import ConfirmDialog from './ConfirmDialog.vue';
import ButtonMain from './ButtonMain.vue';

const colorStore = useColorStore();
const todoStore = useTodoStore();
const selectedCategory: Ref<string> = ref("");

const showDetail: Ref<boolean> = ref(false);
const openDetail = () => {
    showDetail.value = !showDetail.value;
}

const title: Ref<string> = ref("");
const detail: Ref<string> = ref("");
const doAt = ref();

const confirmDialog = ref();

const addTodo = async () => {
    if(selectedCategory.value == ""){
        const result = await confirmDialog.value.openDialog(DIALOG_TYPE.ERROR, "エラー", "カテゴリーを入力してください");
        return;
    }
    if(title.value == ""){
        const result = await confirmDialog.value.openDialog(DIALOG_TYPE.ERROR, "エラー", "タイトルを入力してください");
        return;
    }
    if(doAt.value == null){
        const result = await confirmDialog.value.openDialog(DIALOG_TYPE.ALERT, "警告", "日付が未入力なので本日の日付で登録します");
        if(result == RESPONSE_TYPE.CANCEL){
            return;
        }
    }
    todoStore.addTodo(selectedCategory.value as unknown as number, title.value, detail.value, doAt.value);
}

const getSuggestion = (word: string) => {
    title.value = word;
}

</script>

<template>
    
    <div class="base_input_form">
        <div v-on:click="openDetail" class="inputTitle">
            <div class="arrow" :class="{arrow_rotate:showDetail}"> ▼ </div>
            <span>新規作成</span>
        </div> 
        <div v-show="showDetail" class="inputContent">
            <select v-model="selectedCategory">
                <option disabled value="" >カテゴリー</option>
                <option v-for="item in todoStore.listCategory" 
                    v-bind:value="item.id" 
                    v-bind:key="item.id">
                {{ item.name }}
                </option>
            </select>
            <br>
            <input type="text" placeholder="title" v-model="title" v-on:keyup="todoStore.makeSuggestions(title)" class="textArea">
            <br>
            <div>履歴</div>
            <div class="suggestion_container">
                <span v-for="value in todoStore.suggestions">
                    <ButtonMain :button-type="BUTTON_TYPE.TERTIARY"
                                class="suggestion_button" 
                                v-on:click="getSuggestion(value)">
                        <span class="suggestion" >{{ value }}</span>
                    </ButtonMain>
                </span>                
            </div>
            <textarea class="textArea" v-model="detail" placeholder="detail" ></textarea>
            <br>
            <input class="input_do_at" type="date" placeholder="date" value="0" v-model="doAt">
            <br>
            <ButtonMain :button-type="BUTTON_TYPE.PRIMARY" 
                        v-on:click="addTodo()">追加</ButtonMain>             
        </div>            
    </div>
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
</template>

<style scoped>
.base_input_form {
    width: 100%;
    margin: 10px;
    border: 1px solid black;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondary));
}
.inputTitle {
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondaryHeavy));
}
.inputContent {
    padding: 5px;
}
.textArea {
  field-sizing: content;
  min-width: 150px;
  min-height: min-content;
}
.arrow{
    transition: 1s;
    display: inline-block;
    margin: 4px
}
.arrow_rotate{
    transform: rotate(180deg);
}
.suggestion {
    width: fit-content;
    margin: 4px;
}
.suggestion_button{
    margin: 3px;
}
.suggestion_container{
    display: flex;
    flex-wrap: wrap;
    column-gap: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid v-bind(colorStore.getColorBy(COLOR_TYPE.secondaryHeavy));;
}
.input_do_at{
    margin-bottom: 15px;
}
</style>