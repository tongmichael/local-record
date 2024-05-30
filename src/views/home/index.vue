<template>
    <div class="home">
        <!-- 预览状态下只显示中间页面 -->
        <div v-if="isPreview">
            <custom-theme v-if="themeId" />
            <record-view v-else />
        </div>
        <!-- 编辑状态下页面 -->
        <div v-else>
            <left-bar />
            <design />
        </div>
    </div>
</template>

<script lang="ts">
import{Component, Watch, Vue } from "vue-property-decorator";

import {mapState, mapMutations} from 'vuex'

import { getDraft } from "../../api/draft";
import { getPortal } from "../../api/portal";

import LeftBar from "./cpns/LeftBar.vue";
import Design from "./cpns/design/index.vue";
import RecordView from "./cpns/design/cpns/record-view/index.vue";
import CustomTheme from './cpns/design/cpns/custom-theme/index.vue';

@Component({
    components: {
        LeftBar,
        Design,
        RecordView,
        CustomTheme
    },
    computed: {
        ...mapState('record', [
            'version',
            'editingData',
            'isEdit',
            'portal',
            'draft',
        ])
    },
    methods: {
        ...mapMutations('record', [
            'setPortal',
            'setEditingData',
            'setDraft',
            'setCurrentNode',
            'setVersion'
        ])
    }
})
export default class Home extends Vue {
    version!: string;
    editingData!: any;
    isEdit!: boolean;
    portal!: any;
    draft!: any;

    setPortal!: Function;
    setEditingData!: Function;
    setDraft!: Function;
    setCurrentNode!: Function;
    setVersion!: Function;

    get isPreview() {
        return this.$route.query.preview;
    }

    get themeId() {
        return this.$route.query.themeId;
    }

    //切换正在编辑的版本（portal, draft）
    @Watch("version")
    onVersionChanged(val: string, oldVal: string) {        
        if (val === "portal") {
            this.setEditingData(JSON.parse(this.portal.data));
        } else if (val === "draft") {
            this.setEditingData(JSON.parse(this.draft.data));
        }
    }

    created() {      
        this.init();
    }

    async init() {
        let portal = await getPortal();
        this.setPortal(portal);

        if(portal.portalDraftId) {
            let draft = await getDraft(portal.portalDraftId);
            this.setDraft(draft);      
        }

        //预览状态下，切换到相应的版本
        if(this.isPreview) {
            this.setVersion(this.$route.query.version);
        } else {       
            // 设置当前编辑的版本为默认的线上版本
            // this.setEditingData(JSON.parse(portal.data));
            this.setVersion('portal');
        }

        //如果是自定义专题页面，根据路由themeId获取currentTheme
        if(this.themeId) {
            let curTheme = this.editingData.filter((item:any) => {
                return item.id === this.themeId;
            })
            this.$store.commit('record/setIsEdit', true);
            this.$store.commit('record/setCurrentTheme', curTheme[0]);
            this.$store.commit('record/setCurrentNode', curTheme[0].detail[0]);

        }

    }
}
</script>

<style lang="scss" scoped>
.home {
    height: 100%;
    div {
        height: 100%;
    }
}
</style>
