<template>
    <div class="setting-bar">
        <div v-if="currentNode.id">
            <div class="title">
                <span v-show="!editLabel">{{ currentNode.label }}</span>
                <i class="el-icon-edit-outline" v-show="isEdit && !editLabel" @click="changeLabel"></i>
                <input type="text" v-model="label" v-show="editLabel" @blur="submitChangeLabel" />
            </div>

            <div v-for="(item, index) in currentNode.children" :key="item.id">
                <div class="img-tip">
                    <div class="title1">
                        <span v-show="!item.editLabel">{{ item.label }}</span>
                        <i class="el-icon-edit-outline" v-show="isEdit && !item.editLabel" @click="changeItemLabel(item)"></i>
                        <input type="text" v-show="item.editLabel" v-model="label" @blur="submitItemChange(index)" />
                    </div>
                    <p class="tip">* {{ item.imgInfo }}</p>
                </div>

                <div class="img-upload" v-show="isEdit && item.imgUrl === ''">
                    <p class="label">图片</p>
                    <el-upload
                        action="/srp/fangzhi/file/upload"
                        :show-file-list="false"
                        :on-success="
                            res => {
                                return handleUpload(res, index);
                            }
                        "
                    >
                        <el-button size="small">
                            <i class="el-icon-upload"></i>
                            上传图片
                        </el-button>
                    </el-upload>
                </div>

                <div class="img-item" v-show="item.imgUrl !== ''">
                    <p class="label">图片</p>
                    <div class="img-show">
                        <img :src="item.imgUrl" alt="" />
                        <span> {{ item.picName }} </span> <br />
                        <a :href="item.imgUrl" download>下载</a>
                        <a href="" v-show="isEdit" @click.prevent="clearImg(index)">清除</a>
                    </div>
                </div>
            </div>

            <div class="link-edit">
                <p>跳转路径</p>
                <div>
                    <span v-show="!editLink"> {{ currentNode.link === "" ? "无跳转路径" : currentNode.link }} </span>
                    <i class="el-icon-edit-outline" v-show="isEdit && !editLink" @click="changeLink"></i>
                    <input type="text" v-model="link" v-show="editLink" @blur="submitChangeLink" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapMutations } from "vuex";

@Component({
    computed: {
        ...mapState("record", ["currentNode", "isEdit"]),
    },
    methods: {
        ...mapMutations("record", ["setImgUrl", "clearImg"]),
    },
})
export default class SettingBar extends Vue {
    currentNode!: any;
    isEdit!: boolean;
    setImgUrl!: Function;

    label: string = "";
    link: string = "";
    editLabel: boolean = false;
    editLink: boolean = false;

    created() {
        // 添加editLabel属性，用来控制修改标题的input是否显示
        this.currentNode.children.map((item: any) => {
            return Vue.set(item, "editLabel", false);
        });
    }

    changeLabel() {
        this.label = this.currentNode.label;
        this.editLabel = true;
    }

    changeLink() {
        this.link = this.currentNode.link;
        this.editLink = true;
    }

    changeItemLabel(item: any) {
        item.editLabel = true;
        this.label = item.label;
    }

    submitChangeLabel() {
        this.currentNode.label = this.label;
        this.editLabel = false;
    }

    submitChangeLink() {
        this.currentNode.link = this.link;
        this.editLink = false;
    }

    submitItemChange(index: number) {
        this.currentNode.children[index].label = this.label;
        this.currentNode.children[index].editLabel = false;
    }

    handleUpload(res: any, index: number) {
        this.setImgUrl({ id: this.currentNode.id, url: res.t.url, name: res.t.originName, childIndex: index });
    }
}
</script>

<style lang="scss" scoped>
input[type="text"] {
    height: 28px;
    background-color: rgba(0, 0, 0, 0);
    border: 0 solid #000;
    border-bottom: 1px solid #2680eb;
}
.setting-bar {
    position: absolute;
    width: 264px;
    height: 100%;
    right: 0;
    background-color: #f0f2f5;
    .title {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        font-size: 16px;
        color: #333;
        border-bottom: 2px solid #dcdfe9;
        span {
            display: inline-block;
            width: 206px;
        }
    }
    .img-tip {
        padding: 20px 20px 10px 20px;
        .title1 {
            display: flex;
            justify-content: space-between;
            height: 30px;
            font-size: 14px;
            color: #333;
            padding-right: 3px;
            input[type="text"] {
                height: 20px;
            }
        }
        .tip {
            font-size: 14px;
            color: #333;
        }
    }
    .img-upload {
        padding: 20px;
        border-bottom: 2px solid #dcdfe9;
        .label {
            margin-bottom: 10px;
        }
    }

    .img-item {
        padding: 20px;
        height: 130px;
        border-bottom: 2px solid #dcdfe9;
        .label {
            margin-bottom: 10px;
        }
        .img-show {
            margin-bottom: 80px;
            img {
                width: 30px;
                height: 20px;
                margin-right: 10px;
            }
            a {
                display: inline-block;
                margin-top: 6px;
                color: #2680eb;
                &:first-of-type {
                    line-height: 15px;
                    padding-right: 12px;
                }
                &:last-of-type {
                    padding-left: 12px;
                    border-left: 1px solid #d5d9de;
                }
            }
        }
    }
    .link-edit {
        padding: 20px 20px 10px 20px;
        p {
            margin-bottom: 10px;
        }
        div {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
