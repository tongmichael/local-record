<template>
    <div class="left-bar">
        <div class="btns" :style="isEdit && { backgroundColor: '#262626' }">
            <div v-if="isEdit" class="edit">
                <span>编辑中版本</span>
            </div>
            <div v-else>
                <span :class="{'active': version === 'portal'}" @click="setVersion('portal')">线上版本</span>
                <span :class="{'active': version === 'draft'}" v-show="hasDraft" @click="setVersion('draft')">草稿版本</span>
            </div>
        </div>
        <div class="back" v-if="themeId" @click="goBack">
            <i class="el-icon-arrow-left"></i>
            <span>返回</span>
        </div>
        <div class="bar">
            <i class="el-icon-document"></i>
            <span>{{themeId? currentTheme.label:'首页'}} </span>
        </div>
        <el-tree
            ref="tree"
            :data="themeId? currentTheme.detail : editingData"
            node-key="id"
            highlight-current
            :expand-on-click-node="false"
            @node-click="getCurrentNode"
        >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }} </span>
                <img class="img-view" v-if="data.imgUrl" :src="data.imgUrl" alt="" />
                <img v-else-if="data.text && data.text !== ''" src="../../../assets/text3.png" alt="">
                <span v-else-if="!data.imgUrl && !data.children">待添加</span>
                <span v-else>{{ uploadedImgCount(data) }} / 3</span>
            </span>
        </el-tree>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {mapState, mapMutations} from 'vuex'

@Component({
    computed: {
        ...mapState('record', [
            'version',
            'editingData',
            'currentNode',
            'isEdit',
            'portal',
            'currentTheme'
        ])
    },
    methods: {
        ...mapMutations('record', [
            'setVersion',
            'setCurrentNode'
        ])
    }
})
export default class TopNav extends Vue {
    $refs!: {
        tree: HTMLFormElement;
    };

    version!: string;
    editingData!: any;
    currentNode!: any;
    isEdit!: boolean;
    portal!: any;
    currentTheme!: any;
    setCurrentNode!: Function;

    get hasDraft() {
        if(this.portal) {
            return this.portal.portalDraftId?true:false;
        }
    }
    
    get themeId() {
        return this.$route.query.themeId;
    }

    @Watch("currentNode", {deep: true, immediate: true})
    onCurrentNodeChanged(val: any, oldVal: any) {     
        this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(val.id);
        })  
    }

    uploadedImgCount(data: any) {
        let uploadedImg = data.children.filter((item: any) => {
            return item.imgUrl !== "";
        });

        return uploadedImg.length;
    }

    getCurrentNode(data: any, node:any) {
        
        // 禁止选中志书库子节点时，默认选中父节点
        if(node.parent.parent) {
            this.setCurrentNode(node.parent.data);
        } else {
            this.setCurrentNode(data);
        }
    
    }

    goBack() {
        this.$router.go(-1);
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tree-node__content {
    height: 40px;
}
/deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #e0f0fa;
}
/deep/ .el-tree-node__children {
    background-color: #e9e9e9;
}
.left-bar {
    position: absolute;
    left: 0;
    width: 240px;
    height: 100%;
    background-color: #f0f2f5;
    border-right: 2px dashed #EBEEF5;
    .btns {
        display: inline-block;
        height: 48px;
        background-color: #e7e9ec;
        width: 240px;
        padding: 0 20px;
        line-height: 60px;
        .edit {
            span {
                color: #fff;
                font-size: 16px;
                padding: 0;
            }
        }
        span {
            font-size: 14px;
            color: #333333;
            padding: 10px 20px;
            cursor: pointer;
        }
        .active {
            background-color: #f0f2f5;
            border: 1px solid #dcdfe9;
            border-bottom: 0 solid #000;
        }
    }
    .back {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        padding-left: 10px;
        cursor: pointer;
        i {
            font-size: 18px;
            vertical-align: text-top;
        }
    }
    .bar {
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        border-top: 1px solid #e9ecf0;
        border-bottom: 1px solid #e9ecf0;
        padding-left: 20px;
        font-size: 14px;
        i {
            padding-right: 6px;
        }
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 14px;
        .img-view {
            width: 22px;
            height: 16px;
        }
        span {
            &:nth-child(2) {
                font-size: 12px;
                color: #333;
            }
        }
    }
}
</style>
