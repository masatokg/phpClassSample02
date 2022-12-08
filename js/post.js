'use strict'

if(typeof POST_JS != "undefined"){
    // alert("Post.jsはすでに読み込まれました");
    // console.log('Post.jsはすでに読み込まれました');
    throw new Error('Post.jsはすでに読み込まれました');
    // 読み込み中断
}else{
    const POST_JS = "POST_JS";
    var divCartBtn;
}

/**
 * 非同期でデータをPOST送信する
 * @param action アクション（送信先URL）
 * @param Object POSTデータ連想配列用オブジェクト
 * @param element レスポンスを表示するdiv要素
 */
function execPostAsync(action, dataObject, element){
    // (1)XMLHttpRequestオブジェクトを作成
    let xmlHttpRequest = new XMLHttpRequest();
    // (2)HTTPのPOSTメソッドとアクセスする場所を指定
    xmlHttpRequest.open('POST',action,true);
    // (3)送信する内容の形式を設定
    xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlHttpRequest.onload = function () {
		//ここに完了時の処理を書く
		//サーバーサイドからの返り値はthis.responseTextとかでもらう
        // alert(this.response+":レス");
        if(element!=null){
            element.value = this.response;
        }
	}
    // 第2パラメタがあれば、設定
    let paramString = '';
    if (dataObject !== undefined) {
        // オブジェクトの中につまった連想配列をすべてパラメータとして設定
        let lastkey = Object.keys(dataObject).pop(); // ラストキーの時だけ末尾に&をつけずに連結ループ
        for (let paramName in dataObject) {
            paramString = paramString.concat(paramName);
            paramString = paramString.concat("=");
            paramString = paramString.concat(dataObject[paramName]+(lastkey !== paramName ? '&' : ''));
        }
    }
    // alert(paramString);
    // (4)HTTPリクエストを送信
    xmlHttpRequest.send(paramString);
}

/**
 * フォームを動的に組み立ててデータをPOST送信する（画面遷移版）
 * @param String アクション（送信先URL）
 * @param Object POSTデータ連想配列用オブジェクト
 */
function execPost(action, dataObject) {
    // HTMLフォームオブジェクトの生成
    let form = document.createElement("form");
    form.setAttribute("action", action);    // 送信先指定
    form.setAttribute("method", "post");    // メソッド指定
    form.style.display = "none";
    document.body.appendChild(form);    // HTMLドキュメントへ追加
    // 第2パラメタがあれば、設定
    if (dataObject !== undefined) {
        // オブジェクトの中につまった連想配列をすべてinput hidden パラメータとして設定
        for (let paramName in dataObject) {
            let input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', paramName);
            input.setAttribute('value', dataObject[paramName]);
            form.appendChild(input);    // FORMへインプットパラメータとして追加
        }
    }
    // submit送信する
    form.submit();
}