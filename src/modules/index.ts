interface Portal {
    createTime: string | null
    data: string //JSON字符串
    id: string
    name: string
    portalDraftId: string
    status: string
}

interface Draft {
    createTime: string | null
    data: string //JSON字符串
    id: string
    name: string | null
    portalId: string
}

interface BaseImg {
    id: string
    label: string
    imgUrl: string
    imgInfo: string
    picName: string
}

interface BaseText {
    id: string
    label: string
    text: string
    textInfo: string
}

interface BaseContent {
    id: string
    label: string
    content: string
    contentInfo: string
}

interface RecordImg {
    id: string
    label: string
    link: string
    children: Array<BaseImg>
}

interface CustomTheme {
    id: string
    type: string
    imgUrl: string
    imgInfo: string
    picName: string
    label: string
    detail: Array<BaseImg | BaseText | BaseContent>
}

interface State {
    version: string
    portal: Portal | null
    draft: Draft | null
    isEdit: boolean
    editingData: Array<any> // Array<BaseImg | RecordImg | CustomTheme>, 设置成any是为了解决一个报错
    currentNode: any //BaseImg | RecordImg | CustomTheme, 也是为了解决报错
    currentTheme: CustomTheme
}

export {
    Portal,
    Draft,
    BaseImg,
    BaseText,
    BaseContent,
    RecordImg,
    CustomTheme,
    State
}