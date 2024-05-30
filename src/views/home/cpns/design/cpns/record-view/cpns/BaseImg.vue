<template>
    <div 
        :class="['before', { selected: isSelect }]"
        :style="[data.imgUrl && {backgroundImage: 'url('+ data.imgUrl+')'}]"
        @click="setCurrentNode"
    >
        <div class="base-img" v-if="!data.imgUrl">
            <img v-if="isSelect" src="../../../../../../../assets/active.png" alt="" />
            <img v-else src="../../../../../../../assets/baseImg.png" alt="" />
            <br />
            <span>2.底图</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class BaseImg extends Vue {
    @Prop() data!: any;

    get isPreview() {
        return this.$route.query.preview;
    }

    get currentNode() {
        return this.$store.state.record.currentNode;
    }

    get isSelect() {
        return this.data.id === this.currentNode.id ? true : false;
    }

    get isEdit() {
        return this.$store.state.record.isEdit;
    }

    setCurrentNode() {
        //预览状态下，点击不能选中此节点
        if(this.isPreview) return

        this.$store.commit('record/setCurrentNode', this.data);
    }
}
</script>

<style lang="scss" scoped>
    .before {
        position: absolute;
        background-color: #F0F0F0;
        left: 0;
        display: block;
        width: 100%;
        top: 0;
        height: 400px;
        text-align: center;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        .base-img {
            position: absolute;
            top: 64%;
            left: 50%;
            color: #A8A8A8;
            font-size: 14px;
        }
    }
    .selected {
        background-color: #e9f3ff;
        border: 1px solid #2680eb;
        .base-img {
            color: #2680eb;
        }
    }
</style>