let ret: any = [];

let nameArr = ["local-record", "yearbooks", "literature", "video", "anime"];

for (let i = 0; i < 5; i += 1) {
    let bg = require(`@/static/home/bg-${i + 1}.png`);
    let marker = require(`@/static/home/marker-${i + 1}.png`);
    let img = require(`@/static/home/img-${i + 1}.png`);
    ret.push({
        bg: bg,
        marker: marker,
        img: img,
        name: nameArr[i],
    });
}
export default ret;
