<?php session_start();	
	if($_SESSION[stat]>6){
		require_once("edit.html");
	} else {
		require_once("show.html");
	}
?>