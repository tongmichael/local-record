<template>
    <div class="global-search">
        <Select class="module-select" v-model="searchRange" v-if="false">
            <Option
                v-for="(item, index) in moduleOpt"
                :key="index"
                :value="item.label"
                >{{ item.label }}</Option
            >
        </Select>
        <input
            type="text"
            placeholder="检索关键字"
            v-model="searchKey"
            @keyup.enter="searchBookByName"
        />
        <template v-if="buttonSplit">
            <button @click="searchBookByName">模糊搜索</button>
            <button v-if="false">检索条目</button>
        </template>
        <Dropdown
            class="button"
            v-else
            trigger="custom"
            placement="bottom-start"
            :visible="showDropdown"
            @on-clickoutside="showDropdown = false"
        >
            <button @click.stop="searchBookByName">
                <span>模糊搜索</span>
                <Icon
                    v-if="false"
                    class="icon-arrow"
                    type="ios-arrow-down"
                    @click.native.stop="showDropdown = true"
                ></Icon>
            </button>
            <DropdownMenu slot="list" v-if="false">
                <DropdownItem @click.stop.native="searchIndex">
                    检索条目
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <router-link to="/advanced/search">高级检索</router-link>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import {
    Select,
    Option,
    Dropdown,
    Icon,
    DropdownMenu,
    DropdownItem,
    Message,
} from "view-design";
import { tansSearchOptionToString, toastError } from "../utils/common-methods";

@Component({
    components: {
        Select,
        Option,
        Dropdown,
        Icon,
        DropdownMenu,
        DropdownItem,
    },
})
export default class GlobalSearch extends Vue {
    @Prop({
        type: Boolean,
        default: false,
        required: false,
    })
    private buttonSplit!: boolean;

    private searchRange: string = "全部";

    private moduleOpt: Array<any> = [
        {
            label: "全部",
        },
        {
            label: "地方志",
        },
        {
            label: "年鉴",
        },
        {
            label: "文献",
        },
        {
            label: "影像",
        },
        {
            label: "专题库",
        },
    ];

    private showDropdown: boolean = false;

    private searchKey: string = "";

    private searchTotal() {
        (Message as any).success("检索整书");
    }

    private searchIndex() {
        (Message as any).success("检索条目");
    }

    private searchBookByName() {
        if (!this.searchKey) {
            toastError("请输入关键词");
            return;
        }
        let option = {
            info: [
                {
                    type: "name",
                    keyword: this.searchKey,
                    isExact: false,
                    operator: "OR",
                },
                {
                    type: "content",
                    keyword: this.searchKey,
                    isExact: false,
                    operator: "OR",
                },
                {
                    type: "catalogName",
                    keyword: this.searchKey,
                    isExact: false,
                    operator: "OR",
                },
            ],
        };

        this.$router.push({
            name: "AdvancedSearchResult",
            // @ts-ignore
            query: tansSearchOptionToString(option),
        });
    }
}
</script>
<style lang="scss">
.global-search {
    position: relative;
    margin-top: 68px;
    width: 710px;
    height: 42px;
    font-size: 16px;
    input,
    button,
    a {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        margin-right: 12px;
    }
    .ivu-select-selection,
    input {
        line-height: 42px - 1px - 1px;
        color: #fff;
        border: solid 1px rgba(255, 255, 255, 0.5);
    }
    .module-select {
        width: 112px;
        margin-right: 12px;
        .ivu-icon {
            color: #fff;
        }
    }
    .ivu-select-selection {
        width: 100%;
        height: 42px;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 0;
        background-color: rgba(255, 255, 255, 0.05);
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        height: 42px - 1px - 1px;
        padding-left: 0;
        line-height: 42px - 1px - 1px;
        font-size: 16px;
    }
    .ivu-select-dropdown {
        border-radius: 0;
    }
    .ivu-select-item {
        height: 40px;
        padding-top: (40px - 16px) / 2;
        padding-bottom: (40px - 16px) / 2;
        line-height: 1;
        font-size: 16px !important;
    }
    input {
        width: 470px;
        padding-left: 13px;
        padding-right: 13px;
        outline: none;
        background-color: rgba(255, 255, 255, 0.1);
        &:focus {
            border-radius: 0;
            border: solid 1px #287bf9;
        }
    }

    ::placeholder {
        color: #ffffff;
        opacity: 0.6;
    }

    button,
    a {
        line-height: 42px;
        color: #ffffff;
    }

    button {
        padding-left: 16px;
        padding-right: 16px;
        border: none;
        outline: none;
        background-color: #143f7f;
        cursor: pointer;
        &:hover {
            background-color: #22549f;
        }
    }

    .button {
        width: 124px;
        vertical-align: top;
        margin-right: 16px;
        button {
            padding-left: 0;
            padding-right: 0;
            margin-right: 0;
            span {
                position: relative;
                display: inline-block;
                padding-right: 16px;
                padding-left: 16px;
                &:before {
                    // content: "";
                    content: none;
                    display: block;
                    position: absolute;
                    top: (42px - 24px) / 2;
                    right: 0;
                    width: 1px;
                    height: 24px;
                    background-color: #ffffff;
                    opacity: 0.2;
                }
            }
        }
        .ivu-select-dropdown {
            width: 124px;
            padding: 0;
            margin: 0;
            background-color: #143f7f;
        }
        .ivu-dropdown-item {
            height: 40px;
            padding-top: (40px - 16px) / 2;
            padding-bottom: (40px - 16px) / 2;
            font-size: 16px !important;
            line-height: 1;
            color: #fff;
            &:hover {
                background-color: #33588f;
            }
        }
    }

    .icon-arrow {
        width: 28px;
    }

    a {
        margin-left: 12px;
        opacity: 0.9;
        &:hover {
            color: #5194f6;
        }
    }
}
</style>