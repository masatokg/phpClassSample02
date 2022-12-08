<?php
require_once __DIR__ . "/User.php";
require_once __DIR__ . "/Item.php";
class TBL_Items{
    public static function select($pdo, $id){
        //実行したいSQLを準備する
        $sql = 'SELECT * FROM items where id=?';
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $id);
        //SQLを実行
        $stmt->execute();
        //データベースの値を取得
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // $result = $stmt->fetchall();
        $item = new Item();
        $item->id = $result['id'];
        $item->name = $result['name'];
        $item->price = $result['price'];
        $item->image = $result['image'];
        return $item;
    }
    public static function selectAll($pdo){
        //実行したいSQLを準備する
        $sql = 'SELECT * FROM items';
        $stmt = $pdo->prepare($sql);
        //SQLを実行
        $stmt->execute();
        //データベースの値を取得
        $results = $stmt->fetchall();
        $items = array();
        foreach($results as $result){
            $item = new Item();
            $item->id = $result['id'];
            $item->name = $result['name'];
            $item->price = $result['price'];
            $item->image = $result['image'];
            $items[] = $item; // リストに追加
        }
        return $items;
    }
}
?>