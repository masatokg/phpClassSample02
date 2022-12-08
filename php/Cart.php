<?php
class Cart{
    public $userid;
    public $itemid;
    /* 以下はitemテーブルとの複合検索時に使用するフィールド */
    public $cartid;
    // public $itemid; テーブルのカラムと重複
    public $name;
    public $price;
    public $image;
}
?>