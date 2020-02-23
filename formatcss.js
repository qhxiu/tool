
function toUpper(string) {
    const idx = string.indexOf("-");
    const str = string[idx + 1];
    const b = string.replace(/\-/, "");
    var c = "";
    for (var i = 0; i < b.length; i++) {
      if (i == idx) {
        c += str.toUpperCase();
      } else {
        c += b[i];
      }
    }
    return c;
  }
  const css = `    width: 100%;
  background: #fff;
  margin-bottom: 0.25rem;`;
  function formatCss(css) {
    var arr = css.split(";");
    var obj = {};
    arr.forEach(item => {
      var a = item.split(":");
      if (/\-/.test(a[0])) {
        a[0] = toUpper(a[0]);
      }
      var s = a[0].replace(/[^a-zA-Z]/g, "");
      if (s) {
          Object.assign(obj, {[s]: String(a[1])});
      }
    });
    return obj
  }
  console.log(formatCss(css));