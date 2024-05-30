<template>
    <div class="home">
        <div class="record-wrap">
            <!-- 底图 -->
            <base-img :data="editingData[1]" />
            <!-- 标题 -->
            <home-title :data="editingData[0]" />
            <!-- 搜索框 ( 当上传底图后才出现 )  -->
            <Global-Search v-if="editingData[1].imgUrl" button-split></Global-Search>
            <!-- 志书库 -->
            <Module-Card-List :cardData="editingData.slice(3, 8)"></Module-Card-List>
            <!-- 底纹 -->
            <shading :data="editingData[2]" />
        </div>
        <div class="custom">
            <div
                v-for="(item, index) in customThemes"
                :key="item.id"
                :class="['custom-theme', { active: !isPreview && item.id === currentNode.id }]"
                :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
                @click="editTheme(item)"
            >
                <span class="delete" v-show="isEdit" @click.stop="deleteCustomTheme(item)">
                    <i class="el-icon-delete"></i>
                </span>
                <div v-show="item.imgUrl === ''">
                    <img v-if="item.id === currentNode.id" src="../../../../../../assets/active.png" alt="" />
                    <img v-else src="../../../../../../assets/baseImg.png" alt="" />
                    <br />
                    <span>自定义专题 {{ index + 1 }} </span>
                </div>
            </div>
            <div class="add-theme-btn" v-show="isEdit" @click="addCustomTheme">
                <i class="el-icon-plus"></i>
                添加自定义专题
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

import { GlobalSearch } from "../../../../../../components/";
import ModuleCardList from "./cpns/ModuleCardList.vue";

import BaseImg from "./cpns/BaseImg.vue";
import Shading from "./cpns/Shading.vue";
import HomeTitle from "./cpns/HomeTitle.vue";

@Component({
    components: {
        GlobalSearch,
        ModuleCardList,
        BaseImg,
        Shading,
        HomeTitle,
    },
    computed: {
        ...mapState("record", ["version", "editingData", "currentNode", "isEdit"]),
    },
})
export default class index extends Vue {
    editingData!: any;
    isEdit!: boolean;
    currentNode!: any;
    version!: string;

    get isPreview() {
        return this.$route.query.preview;
    }
    get customThemes() {
        return this.editingData.filter((item: any) => {
            return item.type && item.type === "custom";
        });
    }

    //跳转到自定义专题编辑页面
    editTheme(item: any) {
        // 非编辑和非预览状态下不能跳转
        if (!this.isEdit && !this.isPreview) return;

        this.$store.commit("record/setCurrentNode", item);
        this.$store.commit("record/setCurrentTheme", item);

        if (this.isPreview) {
            this.$router.push({
                name: "CustomTheme",
                query: {
                    preview: "true",
                    themeId: item.id,
                    version: this.version,
                },
            });
        } else {
            this.$router.push({
                name: "CustomTheme",
                query: {
                    themeId: item.id,
                    version: this.version,
                },
            });
        }
    }

    addCustomTheme() {
        let id = new Date().getTime().toString();
        let length = this.customThemes.length + 1;

        let custom: any = {
            id: id,
            type: "custom",
            imgUrl: "",
            imgInfo: "这里的图片的需求说明，如尺寸",
            picName: "",
            label: " 自定义专题" + length,
            detail: [
                {
                    id: id + 1,
                    label: "1 标题",
                    imgUrl: "",
                    imgInfo: "这里的图片的需求说明，如尺寸",
                    picName: "",
                },
                {
                    id: id + 2,
                    label: "2 底图",
                    imgUrl: "",
                    imgInfo: "这里的图片的需求说明，如尺寸",
                    picName: "",
                },
                {
                    id: id + 3,
                    label: "3 专题描述",
                    text: "专题描述",
                    textInfo: "这里是需求说明，如内容",
                },
                {
                    id: id + 4,
                    label: "4 内容选择",
                    content: "",
                    contentInfo: "这里是内容描述说明",
                },
            ],
        };

        this.$store.commit("record/addTheme", custom);
    }

    deleteCustomTheme(item: any) {
        let index = this.editingData.findIndex((node: any) => {
            return node.id === item.id;
        });

        this.$store.commit('record/deleteNode', index);
    }
}
</script>
<style lang="scss" scoped>
@import "../../../../../../styles/_mixin.scss";

.home {
    // position: relative;
    width: 100%;
    // min-width: 1200px;
    // height: 100%;
    // padding-top: 96px;
    // overflow: hidden;
    // min-height: 720px;

    .record-wrap {
        position: relative;
        width: 100%;
        min-width: 1200px;
        height: calc(100vh - 46px);
        padding-top: 96px;
        overflow: hidden;
        min-height: 720px;
    }

    .home-title,
    .global-search,
    .module-card-list {
        margin-left: auto;
        margin-right: auto;
    }
    .global-search {
        margin-bottom: 86px;
    }
    .module-card-list {
        width: $content-width;
        list-style: none;
    }

    .custom {
        min-width: 1200px;

        .custom-theme {
            position: relative;
            display: flex;
            height: 200px;
            background-color: #eeeeee;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
            .delete {
                display: none;
                position: absolute;
                top: 0;
                right: 0;
                background-color: #2680eb;
                color: #fff;
                width: 30px;
                height: 30px;
                text-align: right;
                border-radius: 0 0 0 27px;
                i {
                    padding: 5px 5px 0 0;
                }
            }
            div {
                text-align: center;
            }
        }
        .active {
            border: 1px solid #5b9ff0;
            background-color: #e9f3ff;
            color: #2680eb;
            .delete {
                display: block;
            }
        }
        .add-theme-btn {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px dashed #d5d9de;
            color: #595959;
            &:hover {
                border-color: #5b9ff0;
                background-color: #e9f3ff;
                color: #2680eb;
            }
        }
    }
}
</style>
