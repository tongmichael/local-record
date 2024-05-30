import {State, Portal, Draft, BaseImg, RecordImg, CustomTheme} from '../../modules/index'

export default {
    setVersion(state:State, version:string) {
        state.version = version;
    },
    setPortal(state:State, portal:Portal) {
        state.portal = portal
    },
    setDraft(state:State, draft:Draft) {
        state.draft = draft;
    },
    setEditingData(state:State, data:Array<BaseImg | RecordImg | CustomTheme>) {
        state.editingData = data;
    },
    // !非空断言运算符
    setDraftData(state:State, data:Draft) {
      state.draft!.data = JSON.stringify(data);
    },
    setCurrentNode(state:State, node: BaseImg | RecordImg | CustomTheme) {
      state.currentNode = node
    },
    setHomeTitleImg(state:State, url:string) {
      state.editingData[0].imgUrl = url
    },
    setImgUrl(state: State, {id, url, name, childIndex}:any) {        
        if(childIndex !== undefined) {
            let index = state.editingData.findIndex((item:any) => {
                return item.id === id;
            })
            state.editingData[index].children[childIndex].imgUrl = url;
            state.editingData[index].children[childIndex].picName = name;
        } else {
            state.currentNode.imgUrl = url;
            state.currentNode.picName = name;
        }
    },
    setIsEdit(state:State, status:boolean) {
        state.isEdit = status;
    },
    clearImg(state:State, childIndex:number | undefined) {
        if(childIndex === undefined) {
            state.currentNode.imgUrl = ""
        } else {
            state.currentNode.children[childIndex].imgUrl = '';
        }
        
    },
    setCurrentTheme(state:State, theme:CustomTheme) {
        state.currentTheme = theme;
    },
    addTheme(state:State, theme:CustomTheme) {
        state.editingData.push(theme);
    },
    setThemeText(state:State, text: string) {
        state.currentNode.text = text;
    },
    deleteNode(state:State, index:number) {
        state.editingData.splice(index, 1);
    }
}