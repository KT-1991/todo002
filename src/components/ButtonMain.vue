<script setup lang="ts">
import { BUTTON_TYPE, COLOR_TYPE } from '@/scripts/const';
import { useColorStore } from '@/stores/color';

const colorStore = useColorStore();

const props = defineProps({
  buttonType: String,
})
const emit = defineEmits(['click']);

const onClick = () => {
    emit("click");
}

const getClassButtonType = () => {
    switch(props.buttonType){
        case BUTTON_TYPE.PRIMARY:
            return "button_base_type_primary";
        case BUTTON_TYPE.SECONDARY:
            return "button_base_type_secondary";
        case BUTTON_TYPE.TERTIARY:
            return "button_base_type_tertiary";
    }
}

</script>

<template>
    <span class="button_base" v-bind:class="getClassButtonType()" v-on:click="onClick">
        <span class="button_content">
            <slot></slot>
        </span>
    </span>
</template>

<style scoped>
.button_base {
    display: flex;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    :hover{
        border-radius: 5px;
    }
}
.button_base_type_primary {
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondaryHeavy));
    :hover{
        background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondary));
    }
}
.button_base_type_secondary {
    border: 2px solid v-bind(colorStore.getColorBy(COLOR_TYPE.primaryHeavy));
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.background));
    :hover{
        background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primaryHeavy));
    }
}
.button_base_type_tertiary {
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.background));
    :hover{
        background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondary));
    }
}
.button_content {
    flex: 1;
    text-align: center;
}
</style>