'use strict'

if(typeof LOGIN_JS != "undefined"){
    // alert("login.jsはすでに読み込まれました");
    // console.log('login.jsはすでに読み込まれました');
    throw new Error('login.jsはすでに読み込まれました');
    // 読み込み中断
}else{
    const LOGIN_JS = "LOGIN_JS";
    var btn_login;
}

// var btn_login = document.getElementById('btn_login');
// btn_login.addEventListener("click",{element:"chg_zone", handleEvent:btn_login_on_click},false);

function showName($name){
    // ログイン欄の代わりに、ユーザー名を表示させる
    let login_input = document.getElementById('login_input');
    login_input.innerHTML='ようこそ${name}さん'; // 要素を上書き 
}

