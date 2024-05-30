import {BaseImg, RecordImg, CustomTheme} from '../../modules/index'

const initData: Array<BaseImg | RecordImg | CustomTheme> = [
    {
        id: "1",
        label: "1 标题",
        imgUrl: "",
        imgInfo: '这里的图片的需求说明，如尺寸',
        picName: ''
    },
    {
        id: "2",
        label: "2 底图",
        imgUrl: '',
        imgInfo: '这里的图片的需求说明，如尺寸',
        picName: ''
    },
    {
        id: "3",
        label: "3 底纹",
        imgUrl: '',
        imgInfo: '这里的图片的需求说明，如尺寸',
        picName: ''
    },
    {
        id: "4",
        label: "4 志书库",
        link: '',
        children: [
            {
                id: "4.1",
                label: "4.1 名称",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "4.2",
                label: "4.2 底图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "4.3",
                label: "4.3 底色图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
        ],
    },
    {
        id: "5",
        label: "5 年鉴库",
        link: '',
        children: [
            {
                id: "5.1",
                label: "5.1 名称",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "5.2",
                label: "5.2 底图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "5.3",
                label: "5.3 底色图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
        ],
    },
    {
        id: "6",
        label: "6 古籍库",
        link: '',
        children: [
            {
                id: "6.1",
                label: "6.1 名称",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "6.2",
                label: "6.2 底图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "6.3",
                label: "6.3 底色图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
        ],
    },
    {
        id: "7",
        label: "7 地情资料库",
        link: '',
        children: [
            {
                id: "7.1",
                label: "7.1 名称",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "7.2",
                label: "7.2 底图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "7.3",
                label: "7.3 底色图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
        ],
    },
    {
        id: "8",
        label: "8 栏目五",
        link: '',
        children: [
            {
                id: "8.1",
                label: "8.1 名称",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "8.2",
                label: "8.2 底图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
            {
                id: "8.3",
                label: "8.3 底色图",
                imgUrl: '',
                imgInfo: '这里的图片的需求说明，如尺寸',
                picName: ''
            },
        ],
    }
];

export default {
    version: '', //版本：线上版本(portal)，草稿版本(draft)
    portal: null,
    draft: null,
    isEdit: false,
    editingData: initData,
    currentNode: {
        id: '',
        label: '',
        imgUrl: ''
    },
    //当前自定义专题数据初始化，初始化detail -> id 是为了防止接口数据没有获取到时，tree组件的node-key属性报错
    currentTheme: {
        id: '',
        type: "custom",
        imgUrl: "",
        imgInfo: "",
        picName: "",
        label: "",
        detail: [
            {
                id: '1',
                label: "",
                imgUrl: "",
                imgInfo: "",
                picName: "",
            },
            {
                id: '2',
                label: "",
                imgUrl: "",
                imgInfo: "",
                picName: "",
            },
            {
                id: '3',
                label: "",
                text: "",
                textInfo: "",
            },
            {
                id: '4',
                label: "",
                content: "",
                contentInfo: "",
            },
        ],
    }
}