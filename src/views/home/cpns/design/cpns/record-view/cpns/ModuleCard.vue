<template>
    <!-- <router-link  :to="routerLink"> -->
        <div 
            :class="['module-card', {'preview-hover': mouseHover}, { 'selected': isSelect }]" 
            @click="goRecord"
            @mouseover="setHover(true)"
            @mouseleave="setHover(false)"
        >
            <div class="decoration-wrap">
                <i class="decoration top"></i>
                <i class="decoration bottom"></i>
            </div>
            <!-- <div class="module-card-content" :style="bgStyle">
                <img class="module-card-marker" :src="marker" />
                <i class="module-card-img" :style="imgStyle"></i>
            </div> -->

            <div class="module-card-content" v-if="hasImgUrl || isSelect" :style="data.children[2].imgUrl && {backgroundImage: `url(${data.children[2].imgUrl})`}">
                <!-- 标题 -->
                <div class="module-card-marker" v-if="!data.children[0].imgUrl" style="height: 141px;">
                    <div>
                        <img src="../../../../../../../assets/baseImg.png" alt=""> <br />
                        <span>4.1 名称</span>
                    </div>
                </div>
                <img class="module-card-marker" v-else :src="data.children[0].imgUrl" />

                <!-- 底图 -->
                <div class="module-card-img" v-if="!data.children[1].imgUrl">
                    <div>
                        <img src="../../../../../../../assets/baseImg.png" alt=""> <br />
                        <span>4.2 底图</span>
                    </div>
                </div>
                <i class="module-card-img" :style="{backgroundImage: `url(${data.children[1].imgUrl})`}" v-else></i>

                <!-- 底色图 -->
                <div class="module-card-color" v-if="!data.children[2].imgUrl">
                    <div v-show="isSelect">
                        <img :src="isSelect?require('../../../../../../../assets/active.png'):require('../../../../../../../assets/baseImg.png')" alt=""> <br />
                        <span>4.3 底色图</span>
                    </div>
                </div>
            </div>

            <div class="module-card-content" v-else>
                <!-- 没有被选中时样式 -->
                <div class="base-img">
                    <img src="../../../../../../../assets/record.png" alt="" /> <br />
                    <span>志书库</span>
                </div>
            </div>
        </div>
    <!-- </router-link> -->
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface data {
    bg: string;
    marker: string;
    img: string;
    to: string;
    name: string;
}

@Component({
    components: {}
})
export default class ModuleCard extends Vue {
    @Prop() private data!: any;

    mouseHover: boolean = false; //鼠标是否覆盖

    get isEdit() {
        return this.$store.state.record.isEdit;
    }

    get currentNode() {
        return this.$store.state.record.currentNode;
    }

    get isSelect() {
        return this.data.id === this.currentNode.id ? true : false;
    }

    get isPreview() {
        return this.$route.query.preview
    }

    get routerLink() {
        return {
            path: `/main/${this.data.name}`,
        };
    }

    get hasImgUrl() {
        return this.data.children.some((item:any) => {
            return item.imgUrl !== ''
        })
    }

    goRecord() {
        this.setCurrentNode();
        if(this.isPreview && this.data.link !== '') {
            window.open(this.data.link);
        }
    }

    setCurrentNode() {
        //预览状态下，点击不能选中此节点
        if(this.isPreview) return

        this.$store.commit('record/setCurrentNode', this.data);
    }

    setHover(isHover: boolean) {
        //非预览状态下没有hover样式
        if(!this.isPreview) return;

        this.mouseHover = isHover;
    }


}
</script>
<style lang="scss" scoped>
@import "../../../../../../../styles/_mixin.scss";

.module-card {
    $animation: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    display: block;
    width: 220px;
    height: 480px;

    $square-size: 10px;

    .decoration-wrap {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: $animation;
    }

    .decoration {
        position: absolute;
        left: 0;
        width: 100%;
        height: $square-size;

        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 0;
            display: block;
            width: $square-size;
            height: $square-size;
        }
        &::before {
            left: 0;
        }
        &::after {
            right: 0;
        }
        &.top {
            top: 0;
            border-top: 1px solid rgba($color: #fff, $alpha: 0.2);
            &::before {
                top: -1px;
                border-left: 1px solid #fff;
            }
            &::after {
                top: -1px;
                border-right: 1px solid #fff;
            }
            &::before,
            &::after {
                border-top: 1px solid #fff;
            }
        }
        &.bottom {
            bottom: 0;
            border-left: 1px solid #271c19;
            border-right: 1px solid #271c19;
            border-bottom: 1px solid rgba($color: #2d2c2c, $alpha: 0.2);
            &::before,
            &::after {
                border-bottom: 1px solid #271c19;
            }
        }
    }

    .module-card-content {
        background-color: #fbf9f9;
        position: relative;
        height: 100%;
        width: 100%;
        // @include bgi-full("placeholder.png");
        .base-img {
            position: absolute;
            left: 40%;
            top: 45%;
            color: #aeadad;
        }
    }

    .module-card-marker {
        position: absolute;
        display: flex;
        top: 0;
        left: 24px;
        z-index: 1;
        width: 62px;
        background-color: #FBF9F9;
        transition: $animation;
        justify-content: center;
        align-items: center;
        div {
            img {
                padding-left: 7px;
            }
            color: #CCD0D4;
        }
    }
    .module-card-img {
        background-color: #FBF9F9;
        position: absolute;
        display: flex;
        bottom: 0;
        left: 0;
        right: 0;
        margin-right: auto;
        margin-left: auto;
        width: 132px;
        height: 288px;
        justify-content: center;
        align-items: center;
        // opacity: 0.72;
        mix-blend-mode: multiply;
        transition: $animation;
        // @include bgi-contain("placeholder.png");
        div {
            img {
                padding-left: 7px;
            }
            color: #CCD0D4;
        }
    }
    .module-card-color {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #CCD0D4;
        div {
            color: #2680EB;
        }
    }
}
.selected {
    position: relative;
    border: 1px solid #2680eb;
    .module-card-content {
        background-color: #e9f3ff;
    }
}

.preview-hover {
    box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.6);
    .module-card-marker {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .module-card-img {
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
    }
    .decoration-wrap {
        opacity: 1;
        transform: scale(1.07);
    }
}
</style>
