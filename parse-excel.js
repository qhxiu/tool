const fs = require("fs");
const xlsx = require("node-xlsx");

const sheets = xlsx.parse("./小学公益英语.xlsx");
let arr = [];
sheets.forEach(sheet => {
  const { data } = sheet;
  const idxArr = [];
  data.forEach((item, idx) => {
    if (item.length == 1) {
      idxArr.push(idx);
    }
  });
  idxArr.push(0);
  idxArr.push(data.length);
  for (let i = 0; i < idxArr.length; i++) {
    let obj = {};
    let temp = [];
    for (let j = idxArr[i]; j < idxArr[i + 1]; j++) {
      if (data[j].length === 1) {
        obj.school = data[j][0];
      }
      if (data[j].length > 1) {
        temp.push({ section: data[j][0], className: data[j][1] });
      }
    }
    if (temp.length > 0) obj.class = temp;
    if (Object.keys(obj).length > 0) {
      arr.push(obj);
    }
  }
});
fs.writeFile("./teacher.json", JSON.stringify({ data: arr }), err => {
  if (err) {
    console.log("写入失败");
    return;
  }
  console.log("写入成功");
  return;
});

