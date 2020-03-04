const fs = require("fs");
const xlsx = require("node-xlsx");

const teacher = {};
const pathName = "./";
fs.readdir(pathName, (err, files) => {
  for (let f = 0; f < files.length; f++) {
    if (/.xlsx/g.test(files[f])) {
      const fileName = files[f].split('.')[0];
      const ret = getData(fileName);
      Object.assign(teacher, {[fileName]: ret})
    }
  }
  writeJson(teacher)
});

const getData = (fileName) => {
  let total = [];
  // const sheets = xlsx.parse("./chuzhongshuxue.xlsx");
  const sheets = xlsx.parse(pathName+fileName+'.xlsx');
  // const sheets = xlsx.parse("./gaoyilishi.xlsx");
  sheets.forEach(sheet => {
    const { data } = sheet;
    let weekArr = [];
    let hasWeek = false;

    data.forEach((item, idx) => {
      if (item.length == 1) {
        if (/周/g.test(item)) {
          weekArr.push(idx);
          hasWeek = true;
        }
      }
    });
    weekArr = weekArr.length > 0 ? weekArr : [0];
    for (let w = 0; w < weekArr.length; w++) {
      const idxArr = [];
      let arr = [];
      let hasSchool = false;
      console.log("-----------");
      let dd = weekArr[w + 1]
        ? data.slice(weekArr[w], weekArr[w + 1] - 1)
        : data.slice(weekArr[w], data.length);
        // console.log(dd);
      dd.forEach((item, idx) => {
        if (item.length == 1) {
          idxArr.push(idx);
          hasSchool = true;
        }
      });
      !hasSchool && idxArr.push(0);
      idxArr.push(dd.length);
      // 每周的对象
      let obj = {};
      hasWeek && (obj.week = data[weekArr[w]][0]);
      // console.log(idxArr);
      for (let i = hasWeek && !hasSchool ? 1 : 0; i < idxArr.length; i++) {
        // console.log(idxArr);
        // 每个学校的对象
        let son = {};
        let temp = [];
        // console.log(i);
        // console.log(idxArr[i], idxArr[i+1])
        for (let j = idxArr[i]; j < idxArr[i + 1]; j++) {
          console.log(dd[j])
          if (!(/周/g.test(dd[j])) && dd[j].length === 1) {
            son.school = dd[j][0];
          }
          if (dd[j].length > 1) {
            temp.push({ section: dd[j][0], className: dd[j][1] });
          }
        }
        if (temp.length > 0) son.class = temp;
        if (Object.keys(son).length > 0) {
          arr.push(son);
        }
      }
      obj.course = arr;
      if (Object.keys(obj).length > 0) {
        total.push(obj);
      }
    }
  });
  return total;
};

function writeJson(teacher) {
  fs.writeFile("./teacher.json", JSON.stringify(teacher), err => {
    if (err) {
      console.log("写入失败");
      return;
    }
    console.log("写入成功");
    return;
  });
}

