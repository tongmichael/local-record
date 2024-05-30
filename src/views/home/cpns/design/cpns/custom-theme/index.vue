<template>
    <div class="theme-detail">
        <div class="header-bar" :style="[editingData[1].imgUrl && {backgroundImage: 'url('+ editingData[1].imgUrl+')'}]">
            <div class="header-bar-content">
                <div 
                    :class="['title', {'selected': isSelect(0)}]" 
                    :style=" currentTheme.detail[0].imgUrl && {backgroundImage:'url('+ currentTheme.detail[0].imgUrl+')'}"
                >
                    <div class="empty" v-if="currentTheme.detail[0].imgUrl === ''">
                        <img src="../../../../../../assets/baseImg.png" alt="" v-show="!isSelect(0)">
                        <img src="../../../../../../assets/active.png" alt="" v-show="isSelect(0)">
                        <br/>
                        <span>1 图片</span>
                    </div>
                </div>
                <Global-Search v-show="editingData[1].imgUrl"></Global-Search>
                <div class="empty" v-if="editingData[1].imgUrl === ''">
                    <img src="../../../../../../assets/baseImg.png" alt="">
                    <br/>
                    <span>2 图片</span>
                </div>
                <!-- 占位,调整搜索框位置 -->
                <span style="width: 100px"></span>
                <!-- <div class="user-panel">
                    <span>登录</span>
                    <span>注册</span>
                </div> -->
            </div>
        </div>

        <div class="header">
            <div :class="['title', {'selected': isSelect(1)}]" :style="{backgroundImage: 'url('+ currentTheme.detail[1].imgUrl+')'}">
                <div class="empty" v-show="currentTheme.detail[1].imgUrl === ''">
                    <img src="../../../../../../assets/baseImg.png" alt="" v-show="!isSelect(1)">
                    <img src="../../../../../../assets/active.png" alt="" v-show="isSelect(1)">
                    <br/>
                    <span> 底图 </span>
                </div>
            </div>
            <div :class="['title-info', {'selected': isSelect(2)}]">
                <div class="empty">
                    <img src="../../../../../../assets/text1.png" v-show="!isSelect(2)">
                    <img src="../../../../../../assets/text2.png" v-show="isSelect(2)">
                    <br/>
                    <span>{{currentTheme.detail[2].text !== ''?currentTheme.detail[2].text:'专题描述'}} </span>
                </div>
            </div>
        </div>

        <div :class="['content', {'selected': isSelect(3)}]">
            <div>
                <img src="../../../../../../assets/content1.png" v-show="!isSelect(3)">
                <img src="../../../../../../assets/content.png" v-show="isSelect(3)">
                <br/>
                <span>内容选择</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";

import GlobalSearch from '../../../../../../components/GlobalSearch.vue'

@Component({
    components: {
        GlobalSearch
    },
    computed: {
        ...mapState("record", [
            "editingData",
            'currentTheme',
            'currentNode'
        ]),
    },
})
export default class CustomTheme extends Vue {
    editingData!: any;
    currentNode!: any;
    currentTheme!: any;

    // get currentTheme() {
    //     let index = this.editingData.findIndex((item:any) => {
    //         return item.id === this.$route.query.themeId;
    //     })

    //     return this.editingData[index];
    // }

    isSelect(index:number) {
        return this.currentNode.id === this.currentTheme.detail[index].id
    }
}
</script>

<style lang="scss" scoped>

.empty {
    font-size: 14px;
    color: #A7A7A7;
}

.theme-detail {
    width: 100%;
    min-width: 1200px;
    .header-bar {
        height: 180px;
        font-size: 16px;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: #eee;
        .header-bar-content {
            display: flex;
            width: 1200px;
            height: 100%;
            margin-right: auto;
            margin-left: auto;
            justify-content: space-between;
            align-items: center;
        }
        .title {
            display: flex;
            width: 212px;
            height: 100%;
            background-color: #FBF9F9;
            justify-content: center;
            align-items: center;
            div {
                text-align: center;
            }
        }
        .global-search {
            margin-right: 15px;
        }
        .user-panel {
            position: relative;
            display: flex;
            width: 100px;
            justify-content: space-between;
            line-height: 20px;
            opacity: 0.8;
            span {
                display: inline-block;
                color: #fff;
                cursor: pointer;
            }
            &::before {
                content: "";
                position: absolute;
                top: 0;
                right: 50%;
                display: block;
                width: 1px;
                height: 20px;
                background-color: #fff;
                opacity: 0.8;
            }
        }
    }

    .header {
        width: 712px;
        margin: 40px auto;
        .title {
            display: flex;
            height: 166px;
            background-repeat: no-repeat;
            background-position: center center;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-color: #D9D9D9;
        }
        .title-info {
            display: flex;
            height: 100px;
            background-color: #FBF9F9;
            justify-content: center;
            align-items: center;
            color: #AEADAD;
            div {
                text-align: center;
            }
        }
        .selected {
            div {
                color: #2680eb;
            }
        }
    }

    .content {
        display: flex;
        margin: 20px auto;
        width: 712px;
        height: 363px;
        justify-content: center;
        align-items: center;
        background-color: #D9D9D9;
        color: #AEADAD;
        div {
            text-align: center;
        }
    }

    .selected {
        background-color: #e9f3ff;
        border: 1px solid #2680eb;
        color: #2680eb;
    }
}
</style>
