'use strict'
// alert('start');

if(typeof COMMON_FOTTER_JS != "undefined"){
    // alert("Common_Footer.jsはすでに読み込まれました");
    // console.log('Common_Footer.jsはすでに読み込まれました');
    throw new Error('Common_Footer.jsはすでに読み込まれました');
    // 読み込み中断
}else{
    const COMMON_FOTTER_JS = "COMMON_FOTTER_JS";
    var divCartBtn;
}

function chg_main_list(e){
    // 指定部分配下を第二引数のHTMLで入れ替える
    HTML_Load(this.element, "cart.html");
}
var divCartBtn = document.getElementById('divCartBtn');
divCartBtn.addEventListener("click",{element:"chg_zone", handleEvent:chg_main_list},false);

function remove(e){
    // イベントの要素を削除する処理関数
    let targetNode = e.currentTarget; // clickした要素を取得
    targetNode.parentElement.removeChild(targetNode); // 要素を削除
}
// カート一覧に動的にJavaScriptを追加する処理
function add_cart_list_script(){
    let script = document.createElement( 'script' );

    script.type = 'text/javascript';
    script.src = "./js/cart.js";
    script.id = "cart_js";

    let cartlist_add = document.getElementById( 'javascript_footer' );
    cartlist_add.appendChild( script );
}

function HTML_Load(replace_id, _html){
//Httpリクエストを作る
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",_html,true);
    xmlhttp.onreadystatechange = function(){
        //とれた場合Idにそって指定div要素のHTML部分を入れ替え
        if(xmlhttp.readyState == 4 && xmlhttp.status==200){
                var data = xmlhttp.responseText;
                var elem = document.getElementById(replace_id);
                elem.innerHTML= data;

                // カート要素にoncclicさせるjavascriptを動的に追加
                // （動的にしないと画面切り替え時に読み込まれないため）
                add_cart_list_script();

            return data;
        }
    }
    xmlhttp.send(null);
}
