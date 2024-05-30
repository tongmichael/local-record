<template>
    <div 
        :class="['after', { 'selected': isSelect }]"
        :style="[data.imgUrl && {backgroundImage: 'url('+ data.imgUrl+')', backgroundColor: 'rgba(0, 0, 0, 0)'}]"
        @click="setCurrentNode"
    >
        <div class="base-img" v-if="!data.imgUrl">
            <img v-if="isSelect" src="../../../../../../../assets/active.png" alt="" />
            <img v-else src="../../../../../../../assets/baseImg.png" alt="" />
            <br/>
            <span>3.底纹</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {mapState, mapMutations} from 'vuex';

@Component({
    computed: {
        ...mapState([
            'currentNode',
            'isPreview',
            'isSelect',

        ])
    }
})
export default class Shading extends Vue {
    @Prop() data!: any;

    get currentNode() {
        return this.$store.state.record.currentNode;
    }

    get isPreview() {
        return this.$route.query.preview;
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
.after {
    position: absolute;
    background-color: #D9D9D9;
    left: 0;
    display: block;
    width: 100%;
    z-index: -2;
    top: 180px;
    height: 753px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    .base-img {
        position: absolute;
        left: 50%;
        top: 90%;
        color: #A8A8A8;
    }
}
.selected {
    background-color: #e9f3ff;
    border: 1px solid #2680eb;
    color: #2680eb;
    .upload-img {
        display: block;
        position: absolute;
        top: 0;
        right: -89px;
    }
}
</style>