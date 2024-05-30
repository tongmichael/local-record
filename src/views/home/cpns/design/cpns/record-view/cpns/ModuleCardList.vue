<template>
    <ul class="module-card-list">
        <li class="module-card-item" v-for="(item, index) in cardData" :key="item.id">
            <Module-Card :data="item"></Module-Card>
        </li>
    </ul>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import ModuleCard from "./ModuleCard.vue";
// import cardData from "./cardData";

@Component({
    components: {
        ModuleCard,
    },
})
export default class ModuleCardList extends Vue {
    // private cardList: any = cardData;

    @Prop() cardData!:any;
}
</script>
<style lang="scss" scoped>
.module-card-list {
    position: absolute;
    display: flex;
    justify-content: space-between;
    top: 360px;
    left: 50%;
    transform: translateX(-50%);
}
 .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    top: 0;
    right: 0;
}
</style>