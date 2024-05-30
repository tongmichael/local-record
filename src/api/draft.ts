import axios from 'axios'

function getDraft(id:string) {
    let url = `/srp/fangzhi/portalDraft/get?id=${id}`;
    return axios.get(url).then(res => {
        return res.data
    }).catch(e => {
        console.log(e); 
    })
}

function updateDraft(draftData:any, id: string) {
    let url = `/srp/fangzhi/portalDraft/update`;
    return axios.post(url, {
        id: id,
        portalId: '4028b2e778af83000178af8325fe0000',
        data: JSON.stringify(draftData)
    }).then(res => {
        return res.data
    }).catch(e => {
        console.log(e);
        
    })
}

function publishDraft(id:string) {
    let url = `/srp/fangzhi/portalDraft/publish?id=${id}`;
    return axios.post(url).then(res => {
        return res.data
    }).catch(e => {
        console.log(e); 
    })
}

function deleteDraft(id:string) {
    let url = `/srp/fangzhi/portalDraft/delete?id=${id}`;
    return axios.delete(url).then(res => {
        return res.data
    }).catch(e => {
        console.log(e); 
    })
}

function addDraft() {
    let url = `/srp/fangzhi/portal/addDraft?id=4028b2e778af83000178af8325fe0000`;
    return axios.post(url).then(res => {
        return res.data
    }).catch(e => {
        console.log(e); 
    })
}

export {
    getDraft,
    updateDraft,
    publishDraft,
    deleteDraft,
    addDraft
}