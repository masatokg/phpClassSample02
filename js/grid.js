'use strict'
// alert('start');

if(typeof GRID_JS != "undefined"){
    // alert("Grid.jsはすでに読み込まれました");
    // console.log('Grid.jsはすでに読み込まれました');
    throw new Error('Grid.jsはすでに読み込まれました');
    // 読み込み中断
}else{
    const GRID_JS = "GRID_JS";
    var div01;
}

function remove(e){
    // イベントの要素を削除する処理関数
    let targetNode = e.currentTarget; // clickした要素を取得
    targetNode.parentElement.removeChild(targetNode); // 要素を削除 
}

function userlist_setOnClick(){
    // ユーザーリスト表の各要素にonclick()処理を追加する
    let element = document.getElementById('userlist');
    let children = element.childNodes;
    let len = children.length;
    for (let i = 0; i < len; i++){
        let n_node = children.item(i);
        n_node.addEventListener("click",{name:"dummy", handleEvent:remove},false);    
    }
}
userlist_setOnClick();

// 指定の要素だけにonclick要素を追加する例(引数つき)
function div01Func(e){
    // イベントの要素を更新する処理関数
    let targetNode = e.currentTarget; // clickした要素を取得
    targetNode.innerHTML=this.message; // 要素を上書き 
}

var div01 = document.getElementById('div01');
div01.addEventListener("click",{message:'div01が読み込まれました',handleEvent:div01Func},false);
// alert("end");

