<?php session_start();
define('TT_KEY', true);
require_once("../../db.php");
require_once("afisha_class.php");
require_once("../../funk/fff.php");
require('instagram_post.php');
$SiteURL='http://'.$_SERVER['HTTP_HOST'];

// добавить спектакль в афишу
if($_POST[stat]=='add'){
 $out=0;
 
 $title=$_POST[a_title];
 $id=$_POST[a_play];
 $date=$_POST[a_date];
 $time=$_POST[a_time];
 $kind= ($_POST[a_kind]==TRUE || strtolower ($_POST[a_kind])=='true')? 1 : 0;
 $text=$_POST[a_text];
  $text = preg_replace("~(\r\n|\n|\r)~", '<br>', $text);	 
  //$text = str_replace(' ', '&nbsp;', $text);
 
 $place = $_POST[a_place];
 $coste = $_POST[a_coste];
 $anons = $_POST[a_anons]? 1: 0;;
 $age_limit = $_POST[a_age_limit];
 
 $new_ai= new afisha_item(); 
  
 $out=$new_ai->add($id, $date, $time, $text, $title, $kind, $place, $coste, $age_limit, $anons);
  
 echo $out;
 }

// удалить спектакль из афиши 
if($_POST[stat]=='del') {
 $out=0;
 
 $item_id=$_POST[item_id];
 
 $del_ai= new afisha_item(); 
  
 $out=$del_ai->del($item_id);
  
 echo $out;
}

// скрыть/показать 
if($_POST[stat]=='show') {
 $out=0;
 
 $item_id=$_POST[item_id];
 
 $del_ai= new afisha_item(); 
  
 $out=$del_ai->undel($item_id);
  
 echo $out;
}
 
// сохранение редактирования
if($_POST[stat]=='save_edit') {
 $out=0;
 
 $id      = $_POST[a_id];
 $play_id = $_POST[a_play];
 $date    = $_POST[a_date];
 $time    = $_POST[a_time];
 $text    = $_POST[a_text];
  $text = preg_replace("~(\r\n|\n|\r)~", '<br>', $text);	  
	
	$kind = 	$_POST[a_kind];
	$title = 	$_POST[a_title];
 // $text = str_replace(' ', '&nbsp;', $text); 
  
 $place = $_POST[a_place];
 $coste = $_POST[a_coste];
 $anons = $_POST[a_anons]? 1: 0;
 $age_limit = $_POST[a_age_limit];
 
 $new_ai= new afisha_item(); 
  
 $out=$new_ai->save($id, $play_id, $date, $time, $text, $title, $kind, $place, $coste, $age_limit, $anons);
  
 echo $out;
}
 
// отправить в Instagram
function insta_send($sImage="", $sText=""){
	$upload_image_filename = $sImage; // TODO; Link to your image from here
	$image_caption = $sText; // TODO; Add your image caption here
	$ig = new instagram_post();
	//return $upload_image_filename;
	/**/
	if ($ig->doPostImage($upload_image_filename, $image_caption)) {
		return 1;
	} else {
		return 0;
	}
	/**/
} 
if($_POST[stat]=='insta') {
	$out=0;
 
	$ID = $_POST['a_play'];
	
	if($_SESSION['stat']>6) {
		$query="SELECT afisha.insta AS insta, plays.insta AS img, id, play, body, af_date, af_time FROM afisha LEFT JOIN plays USING(play_id) WHERE id=$ID ORDER BY id DESC LIMIT 4";
	
		$result = mysql_query($query) or die("i'm dead");
		while($line=mysql_fetch_array($result)) {
			$l_yy  =  substr($line['af_date'],0,4);  // Год
			$l_mm  =  substr($line['af_date'],5,2);  // Месяц
			$l_dd  =  substr($line['af_date'],8,2);  // День
			
			$day_date=f_dayMonth($l_mm, $l_dd);
			//$day_name=f_dayofweek($l_yy, $l_mm, $l_dd);
			
			$time=substr($line['af_time'],0,5);      // Время 	
			
			$play = $line['play'];
			$text = $line['body'];
			$img = "../../".$line['img']; // "../../imgs/plays/insta/cinderella.jpg"
			$text = $play."\r\n".$day_date." ".$time."\r\n\r\n".$text."\r\n\r\n#Афиша #Спектакль #Театр #ТожеТеатр #ДкЯуза #Мытищи";
			$out = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . trim(str_replace($_SERVER['DOCUMENT_ROOT'], '', $img ), DIRECTORY_SEPARATOR);
			$out = $out ." - ".is_readable($img)."-";
		}	
		/**/
		if (file_exists($img)) {
				$out = 1;
				$out = insta_send($img, $text);
		} else {
				$out = 0;
		}
		/**/
	}
  
	echo $out;
}
 
// перезагрузка афиши
if($_POST[stat]=='reload') {
 $ret=new afisha();          // создаем экземпляр
 echo $ret->show();          // печатаем
} 
?>