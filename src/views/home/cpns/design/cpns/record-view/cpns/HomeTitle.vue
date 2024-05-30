<template>
    <h1 
        :class="['home-title', { 'selected': isSelect }]" 
        :style="[data.imgUrl && {backgroundImage: 'url('+ data.imgUrl+')', backgroundColor: 'rgba(0, 0, 0, 0)'}]"
        @click="setCurrentNode"
    >
        <div class="base-img" v-if="!data.imgUrl">
            <img v-if="isSelect" src="../../../../../../../assets/active.png" alt="" />
            <img v-else src="../../../../../../../assets/baseImg.png" alt="" />
            <br />
            <span>1.标题</span>
        </div>
        <el-upload
            v-show="isSelect && isEdit"
            class="upload-img"
            action="/srp/fangzhi/file/upload"
            :show-file-list="false"
            :on-success="handleUpload"
        >
            <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
    </h1>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class HomeTitle extends Vue {
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

    handleUpload(res:any) {
        this.$store.commit('record/setImgUrl', {id: this.currentNode.id, url: res.t.url});
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-button--primary {
    background-color: #2680EB;
    border-color: #2680EB;
}
.home-title {
    position: relative;
    width: 510px;
    height: 64px;
    background-color: #d9d9d9;
    font-size: 0;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    color: #a8a8a8;
    .base-img {
        display: inline-block;
        font-size: 14px;
        margin-top: 10px;
    }
    .upload-img {
        display: none;
    }
}
.selected {
    position: relative;
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
