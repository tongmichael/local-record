<template>
    <div class="setting-bar">
        <div v-if="currentNode.id">
            <div class="title">
                <span v-show="!editLabel">{{ title }}</span>
                <input type="text" v-model="label" v-show="editLabel" @blur="submitChange" />
                <i class="el-icon-edit-outline" v-show="isEdit && !editLabel" @click="changeLabel"></i>
            </div>
            <!-- 自定义专题 -> 专题描述编辑 -->
            <div class="setting text-edit" v-if="currentNode.text">
                <p> {{ '*' + currentNode.textInfo}} </p>
                <div class="label">
                    文本 
                    <span>{{text.length + '/' + 400}}</span> 
                </div>
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="text"
                    maxlength="400"
                >
                </el-input>
                <div class="edit-btn">
                    <a href="" @click.prevent="submitText">导出</a>
                    <a href=""  @click.prevent="text = ''">清除</a>
                </div>
            </div>

            <!-- 自定义专题 -> 内容选择编辑 -->
            <div class="setting" v-else-if="currentNode.content !== undefined">
                <p> {{ '*' + currentNode.contentInfo}} </p>
                <p class="label">内容选择</p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <!-- 图片编辑 -->
            <div class="setting" v-else>
                <p class="tip">* {{ currentNode.imgInfo }}</p>
                <p class="label" v-show="currentNode.imgUrl || isEdit">图片</p>

                <div v-if="currentNode.imgUrl">
                    <img :src="currentNode.imgUrl" alt="" />
                    <span> {{ currentNode.picName }} </span> <br />
                    <a :href="currentNode.imgUrl" download>下载</a>
                    <a href="" v-show="isEdit" @click.prevent="clearImg()">清除</a>
                </div>
                <el-upload
                    v-else-if="isEdit && !currentNode.imgUrl"
                    class="upload-demo"
                    action="/srp/fangzhi/file/upload"
                    :show-file-list="false"
                    :on-success="handleUpload"
                    :limit="1"
                >
                    <el-button size="small">
                        <i class="el-icon-upload"></i>
                        上传图片
                    </el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mapState, mapMutations } from "vuex";

@Component({
    computed: {
        ...mapState("record", ["currentNode", "isEdit"]),
    },
    methods: {
        ...mapMutations("record", ["clearImg", "setImgUrl"]),
    },
})
export default class BaseSet extends Vue {
    @Prop() title!: string;

    text: string = '';
    label: string = "";
    editLabel: boolean = false;
    value: string = '';
     options:Array<any> = []

    currentNode!: any;
    isEdit!: boolean;
    setImgUrl!: Function;

    //给专题描述文本赋初值
    @Watch('currentNode')
    onCurrentNodeChange(val:any, oldVal:any) {
        if(val.text && val.text !== '') {
            this.text = val.text;
        }
    }

    changeLabel() {
        this.label = this.currentNode.label;
        this.editLabel = true;
    }

    submitChange() {
        this.currentNode.label = this.label;
        this.editLabel = false;
    }

    handleUpload(res: any) {
        this.setImgUrl({ id: this.currentNode.id, url: res.t.url, name: res.t.originName });
    }

    submitText() {
        this.$store.commit('record/setThemeText', this.text);
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
    border-left: 2px dashed #ebeef5;
    .title {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        font-size: 16px;
        color: #333;
        border-bottom: 2px solid #dcdfe9;
        span {
            display: inline-block;
            width: 200px;
        }
    }
    .setting {
        padding: 20px;
        img {
            width: 23px;
            height: 16px;
        }
        .tip {
            font-size: 14px;
            color: #333;
            margin-bottom: 30px;
        }
        .label {
            margin-bottom: 10px;
        }
        div {
            margin-bottom: 80px;
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
    .text-edit {
        p {
            color: #777878;
            font-size: 14px;
            height: 40px;
        }
        div {
            margin-bottom: 0;
        }
        .label {
            color: #595959;
            span {
                color: #959697;
            }
        }
        .edit-btn {
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
}
</style>
