'use strict'
// alert('start cart.js');

if(typeof CART_JS != "undefined"){
    // alert("Cart.jsはすでに読み込まれました");
    // console.log('Cart.jsはすでに読み込まれました');
    throw new Error('Cart.jsはすでに読み込まれました');
    // 読み込み中断
}else{
    const CART_JS = "CART_JS";
    var e_cartlist;
    var children;
}

function removeFromCart(e){
    // イベントの要素を削除する処理関数
    let targetNode = e.currentTarget; // clickした要素を取得

    let cartid = targetNode.dataset.cartid;
    let userid = targetNode.dataset.userid;
    // alert("cartid="+cartid+", userid="+userid);
    targetNode.parentElement.removeChild(targetNode); // 要素を削除

    // DBへ削除を非同期送信
    let action =  './php/TBL_Cart.php';
    let dataObject = { 'mode':'POST_DELETE_CART','id':cartid, 'userid':userid };
    
    // サーバへポスト送信&カート表示も更新する
    let divCartBtn = document.getElementById('divCartBtn');
    let rt = execPostAsync(action, dataObject, divCartBtn);
    
}

// カートリスト表の各要素にonclick()処理を追加する
e_cartlist = document.getElementById('cartlist');
children = e_cartlist.childNodes;
for (let i = 0; i < children.length; i++){
    let n_node = children.item(i);
    // let cartid = n_node.dataset.cartid;
    n_node.addEventListener("click",{id:"dummy", handleEvent:removeFromCart},false);    
}
// alert('end cart.js');
