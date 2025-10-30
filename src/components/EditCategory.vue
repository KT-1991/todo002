<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';
import { COLOR_TYPE, DIALOG_TYPE, RESPONSE_TYPE } from '@/scripts/const';
import { useColorStore } from '@/stores/color';
import ConfirmDialog from './ConfirmDialog.vue';

const colorStore = useColorStore();
const todoStore = useTodoStore();
todoStore.init();

const confirmDialog = ref();

const newName: Ref<string> = ref("");

const addCategory = () => {
    todoStore.addCategory(newName.value);
}
const deleteCategory = async (id: number) => {
    const result = await confirmDialog.value.openDialog(DIALOG_TYPE.ALERT, "警告", "削除すると復元できません。関連するすべてのTODOも削除されます。よろしいですか？");
    if(result == RESPONSE_TYPE.CANCEL){
        return;
    }
    todoStore.deleteCategory(id);
    todoStore.initListCategory();
}

</script>

<template>
    <div class="base_edit_category">
        <div class="add_category">
            <div class="title_add_category">カテゴリー追加</div>
            <div class="content_add_category">
                <input type="text" placeholder="new category" v-model="newName">
                <button v-on:click="addCategory">add</button>
            </div>
            
        </div> 
        <div class="table_category">
            <div class="title_table_category">category list</div>       
            <table class="content_table_category">
                <tr v-for="item in todoStore.listCategory">
                    <td>{{ item.name }}</td>
                    <td>[非表示]</td>
                    <td>
                        <button v-on:click="deleteCategory(item.id)">delete</button>
                    </td>
                </tr>
            </table>            
        </div>
    </div>
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
</template>

<style scoped>
.base_edit_category {
    margin: 10px;
}
.add_category {
    margin: 0 0 10px;
    border: 1px solid black
}
.table_category {
    margin: 0 0 10px;
    border: 1px solid black;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
}
.title_add_category {
    padding: 5px;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondaryHeavy));
}
.content_add_category {
    padding: 5px;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondary));
}

.title_table_category {
    padding: 5px;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primaryHeavy));
}
.content_table_category {
    padding: 5px;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
}
</style>