<template>
    <div class="design">
        <div class="top" :style="isEdit && { backgroundColor: '#262626' }">
            <!-- 线上版本的编辑, 有草稿时，没有此编辑按钮，只有把草稿版本删掉才会出现 -->
            <el-button v-show="!isEdit && version === 'portal' && !hasDraft" size="medium" round @click="editPortal">编辑</el-button>

            <span v-show="isEdit">
                <el-button size="small" round @click="setIsEdit(false)">取消</el-button>
                <el-button size="small" type="primary" round @click="upateDraft">保存草稿</el-button>
                <el-button size="small" type="primary" round style="margin-left: 10px" @click="publishDraft">发布</el-button>
            </span>

            <!-- 草稿版本 -->
            <span v-show="!isEdit && version === 'draft'">
                <el-button size="small" round @click="delectDraft">删除</el-button>
                <el-button size="small" type="primary" round @click="setIsEdit(true)">编辑</el-button>
            </span>
        </div>
        <div class="content">
            <div class="view">
                <!-- 预览按钮 -->
                <div class="preview-btn" v-show="!isPreview" @click="preview">
                    <i class="el-icon-full-screen"></i>
                </div>
                <router-view></router-view>
            </div>
            <setting-bar />
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {mapState, mapMutations, mapActions} from 'vuex'

import {updateDraft, publishDraft, addDraft, deleteDraft} from '../../../../api/draft'

import RecordView from './cpns/record-view/index.vue'
import SettingBar from './cpns/setting-bar/index.vue'
import CustomTheme from './cpns/custom-theme/index.vue'

@Component({
    components: {
        RecordView,
        SettingBar,
        CustomTheme
    },
    computed: {
        ...mapState('record', [
            'editingData',
            'version',
            'isEdit',
            'portal',
        ])
    },
    methods: {
        ...mapMutations('record', [
            'setDraftData',
            'setIsEdit',
            'setVersion'
        ]),
        ...mapActions('record', [
            'getPortal',
        ])
    }
})
export default class Design extends Vue {
    editingData!: any;
    version!: string;
    isEdit!: boolean;
    portal!: any;
    setDraftData!: Function;
    setIsEdit!: Function;
    getPortal!: () => Promise<void>;
    setVersion!: Function;

    get isPreview() {
        return this.$route.query.preview;
    }

    get hasDraft() {
        if(this.portal) {
            return this.portal.portalDraftId?true:false;
        }
    }

    get themeId() {
        return this.$route.query.themeId
    }

    async upateDraft() {
        await updateDraft(this.editingData, this.portal.portalDraftId);
        this.setDraftData(JSON.parse(JSON.stringify(this.editingData)));
        this.$message({
            message: '保存成功',
            type: 'success'
        });
    }

    async editPortal() {
        // 点击线上版本的编辑按钮，没有草稿版本时，会新建一个草稿版本
        await addDraft();

        this.getPortal();

        this.setIsEdit(true);
    }

    async publishDraft() {
        //发布时自动保存草稿
        await updateDraft(this.editingData, this.portal.portalDraftId);
        this.setDraftData(JSON.parse(JSON.stringify(this.editingData)));

        let res = await publishDraft(this.portal.portalDraftId);
        if(res) {
            this.$message({
                message: '发布成功',
                type: 'success'
            });
        }
        //发布成功之后退出编辑状态，跳转到线上版本。
        this.setIsEdit(false);
        // this.$store.commit('record/setVersion', 'portal');
        // this.setVersion('portal');
        this.getPortal();
    }

    async delectDraft() {
        let res = await deleteDraft(this.portal.portalDraftId);
        this.$message('删除成功');
        // this.$store.dispatch('record/getPortal');
        // this.$store.commit('record/setVersion', 'portal')
        this.getPortal();
        this.setVersion('portal');
    }

    preview() {
        if(this.themeId) {
            const { href } = this.$router.resolve({
                name: "CustomTheme",
                query: {
                    preview: 'true',
                    version: this.version,
                    themeId: this.themeId
                }
            });
            window.open(href, '_blank')

        } else {
            const { href } = this.$router.resolve({
                name: "RecordContent",
                query: {
                    preview: 'true',
                    version: this.version
                }
            });
            window.open(href, '_blank')
        }
    }
}
</script>

<style lang="scss" scoped>
    .design {
        position: absolute;
        width: calc(100% - 240px);
        height: 100%;
        top: 0;
        left: 240px;
        .top {
            height: 48px;
            line-height: 48px;
            text-align: right;
            padding-right: 20px;
            background-color: #e7e9ec;
            /deep/ .el-button--primary {
                background-color: #2680EB;
                border-color: #2680EB;
            }
        }
        .content {
            position: relative;
            height: calc(100% - 48px);
            .view {
                position: absolute;
                overflow: auto;
                width: calc(100% - 264px);
                height: 100%;
                left: 0;
                .preview-btn {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;
                    background-color: rgba(0, 0, 0, .2);
                    top: 10px;
                    left: 10px;
                    font-size: 20px;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                    z-index: 2;
                    &:hover {
                        background-color: rgba(0, 0, 0, .6);
                        color: #787C85;
                    }
                }
            }
        }
    }
</style>