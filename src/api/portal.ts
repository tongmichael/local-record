import axios from 'axios'

function getPortal() {
    let url = `/srp/fangzhi/portal/get?id=4028b2e778af83000178af8325fe0000`;
    return axios.get(url).then(res => {
        return res.data
    }).catch(e => {
        console.log(e); 
    })
}

export {
    getPortal
}