<script setup lang="ts">
import { COLOR_INFO, LOCAL_STORAGE, COLOR_TYPE } from '@/scripts/const';
import { useColorStore } from '@/stores/color';
import { Ref, ref } from 'vue';

const colorStore = useColorStore();
const selectedColor: Ref<string> = ref("test");

const changeColor = (e: Event) => {
    colorStore.changeColorFormat((e.target as any).value);
}
const initColor = () => {
    const color = localStorage.getItem(LOCAL_STORAGE.COLOR);
    if(color == null){
        colorStore.changeColorFormat("test");
        selectedColor.value = "test";
    }else{
        colorStore.changeColorFormat(color);
        selectedColor.value = color;
    }
}
initColor();

colorStore.$subscribe((mutation, state) => {
    if(state.colorFormat != selectedColor.value){
        selectedColor.value = state.colorFormat;
    }
})

</script>

<template>
    <div class="base_setting">
        <div class="title">Settings</div>
        <table class="table">
            <tbody>
                <tr>
                    <td class="items">
                        <div>color</div>
                    </td>
                    <td class="items">
                        <select v-model="selectedColor" 
                            v-on:change="changeColor" 
                            class="setting_color">
                            <option disabled value="" >テーマカラー</option>
                            <option v-for="item in COLOR_INFO" 
                                        v-bind:value="item.id">
                                {{ item.name }}
                            </option>
                        </select>      
                    </td>
                </tr>        
            </tbody>
        </table>        
    </div>

</template>

<style scoped>
.base_setting{
    margin: 10px;
}
.title {
    width: fit-content;
    border-bottom: 1px solid ;
    font-size: large;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimary));
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
}
.setting_color{
    width: fit-content;
}
.table {
    border-collapse: collapse;
    width: 80%;
}
.items{
    border-bottom: 1px solid ;
    * {
        color: v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimary));
        background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
    }
}
</style>