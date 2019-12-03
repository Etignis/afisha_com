<?php session_start();
	//define('TT_KEY', true);
	//require_once("../../db.php");
	//require_once("afisha_class.php");
	//require_once("../../funk/fff.php");
	//require('instagram_post.php');
	//$SiteURL='http://'.$_SERVER['HTTP_HOST'];
	if($_SESSION[stat]>6){
		require_once("edit.html");
	} else {
		require_once("show.html");
	}
?>