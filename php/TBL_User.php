<?php
require_once __DIR__ . "/User.php";
class TBL_User{
    public static function selectUser($pdo, $id){
        //実行したいSQLを準備する
        $sql = 'SELECT * FROM user where id=?';
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $id);
        //SQLを実行
        $stmt->execute();
        //データベースの値を取得
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // $result = $stmt->fetchall();
        $user = new User();
        $user->id = $result['id'];
        $user->name = $result['name'];
        $user->email = $result['email'];
        return $user;
    }
    public static function selectUsers($pdo){
        //実行したいSQLを準備する
        $sql = 'SELECT * FROM user';
        $stmt = $pdo->prepare($sql);
        //SQLを実行
        $stmt->execute();
        //データベースの値を取得
        $results = $stmt->fetchall();
        $users = array();
        foreach($results as $result){
            $user = new User();
            $user->id = $result['id'];
            $user->name = $result['name'];
            $user->email = $result['email'];
            $users[] = $user; // リストに追加
        }
        return $users;
    }
}
?>