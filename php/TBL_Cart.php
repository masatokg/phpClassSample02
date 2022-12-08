<?php
require_once __DIR__ . "/DBconnect.php";
require_once __DIR__ . "/Cart.php";

// リクエストデータの判定
// if(isset($_POST["mode"]) && $_POST["mode"]==TBL_Cart::POST_INSERT_CART){
if( isset($_POST["mode"]) ){
        // DBに接続処理を読み込み
    $pdo = DBconnect::connect_db();
    switch ($_POST["mode"]) {
        case TBL_Cart::POST_INSERT_CART:
            $userid = intval($_POST["userid"]);
            $itemid = intval($_POST["itemid"]);
        
            $rt = TBL_Cart::insertItem($pdo, $userid, $itemid);
            // 更新後、ユーザーごとの件数を取得（非同期に備えて）
            $cart_array = TBL_Cart::selectForUser($pdo, $userid);
            echo sprintf('カート(%d)', count($cart_array));         
            break;
        case TBL_Cart::POST_DELETE_CART:
            $userid = intval($_POST["userid"]);
            $id = intval($_POST["id"]);
        
            $rt = TBL_Cart::deletetRecord($pdo, $id);
            // 更新後、ユーザーごとの件数を取得（非同期に備えて）
            $cart_array = TBL_Cart::selectForUser($pdo, $userid);
            echo sprintf('カート(%d)', count($cart_array));         
            // echo sprintf('ユーザーid(%d)', $userid);         
          break;
      
        default:
            echo "DB操作失敗";
      }


    // カートに挿入＆カート表示更新ルート
    // // DBに接続処理を読み込み
    // $pdo = DBconnect::connect_db();
    // $userid = intval($_POST["userid"]);
    // $itemid = intval($_POST["itemid"]);

    // $rt = TBL_Cart::insertItem($pdo, $userid, $itemid);
    // // 更新後、ユーザーごとの件数を取得（非同期に備えて）
    // $cart_array = TBL_Cart::selectForUser($pdo, $userid);
    // echo sprintf('カート(%d)', count($cart_array)); 
}

// カートテーブルにまつわるクラス
class TBL_Cart{
    public const POST_INSERT_CART = "POST_INSERT_CART";
    public const POST_DELETE_CART = "POST_DELETE_CART";

    public static function selectForUser($pdo, $userid){
        //実行したいSQLを準備する
        $sql = 'SELECT cart.id as cartid, items.id as itemid, items.name, items.price, items.image FROM cart, items where items.id = cart.itemid and cart.userid=?';
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $userid);
        //SQLを実行
        $stmt->execute();
        //データベースの値を取得
        // $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $results = $stmt->fetchall();
        $carts = array();
        // $result = $stmt->fetchall();
        foreach($results as $result){
            $cart = new Cart();
            $cart->userid = $userid;
            $cart->cartid = $result['cartid'];
            $cart->itemid = $result['itemid'];
            $cart->name = $result['name'];
            $cart->price = $result['price'];
            $cart->image = $result['image'];
            $carts[] = $cart; // リストに追加
        }
        return $carts;
    }

    public static function insertItem($pdo, $userid, $itemid){
        //実行したいSQLを準備する
        $sql = "INSERT INTO `cart` (`userid`, `itemid`) values( ? , ?)";
        try{
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $userid);
            $stmt->bindValue(2, $itemid);
            //SQLを実行
            $rt = $stmt->execute();
        }
        catch(PDOException $e){
            echo "INSERT ERROR";
            exit($e->getMessage());
            // return $e->getMessage();
        }
        return $rt;
    }
    public static function deletetRecord($pdo, $id){
        //実行したいSQLを準備する
        $sql = "DELETE FROM `cart` WHERE `id` = ?";
        try{
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(1, $id);
            //SQLを実行
            $rt = $stmt->execute();
        }
        catch(PDOException $e){
            echo "DELETE ERROR";
            exit($e->getMessage());
            // return $e->getMessage();
        }
        return $rt;
    }
}
?>