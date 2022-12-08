# phpClassSample02

動作サイトURL
http://aso-kuga.watson.jp/phpClassSample02/index.html

質問があったりした点をサンプル例を作りました。大きく言うと以下の４点のサンプルです
1. 非同期で（つまり画面遷移せずに）PHPにリクエストを投げる
1. ボタンを押すと反応するようJavaScriptでコントロールする
1. 特定のdivエリアを押すと反応するようJavaScriptでコントロールする
1. JavaScriptで画面を切り替える（切り替え先に関連するjavaScriptは再読み込みする）


有効なファイル構成は以下です
```
サイトのトップ
│  .htaccess
│  cart.html
│  index.html
│  itemlist.html
│  login.html
│
├─css
│      myStyle.css
│
├─image
│      2001.png
│      2002.png
│      2003.png
│      2004.jpg
│
├─js
│      cart.js
│      common_footer.js
│      itemlist.js
│      login.js
│      post.js
│
└─php
        Cart.php
        DBconnect.php
        Item.php
        TBL_Cart.php
        TBL_Items.php
        TBL_User.php
        User.php
```
