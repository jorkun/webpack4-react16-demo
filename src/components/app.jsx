import React from "react";
const test = async ()=>{
  let aa = await 2;
  console.log(aa);
}
const App = () => {
  var aa = Object.assign({}, {s: 1});
  test();
  return (
    <div>
      <span>成功啦！！！</span>
    </div>
  );
};
export default App;