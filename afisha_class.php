<?php

class afisha_item {
 public $id;
 public $play;
 public $type;
 public $play_id;
 public $dt;
 public $tm;
 public $info;
 public $autor;
 public $style;
 public $link;
 public $link_state;
 public $img;
 public $kind; 
 public $place; 
 public $coste; 
 public $age_limit;
 public $anons;
 public $stat;
 
  
 public function show($id, $play, $play_id, $date, $time, $info, $autor, $style, $link, $link_state, $img, $title, $insta, $img_meta, $af_age_limit, $place, $coste, $stat) {
  $this->id         = $id;
  $this->play       = $play;
  $this->play_id    = $play_id;
  $this->title      = $title;
  $this->dt         = $date;
  $this->tm         = $time;
  $this->info       = $info;
  $this->autor     	= $autor;
  $this->style      = $style;
  $this->link       = $link;
  $this->link_state = $link_state;
  $this->img        = $img;
  $this->img_meta   = $img_meta;
  $this->insta  	  = $insta;
  $this->age_limit  = $af_age_limit;
  $this->place  	  = $place;
  $this->coste  	  = $coste;
  $this->stat  	  	= $stat;
  
  $l_yy  =  substr($this->dt,0,4);  // Год
  $l_mm  =  substr($this->dt,5,2);  // Месяц
  $l_dd  =  substr($this->dt,8,2);  // День
  
  $day_date=f_dayMonth($l_mm, $l_dd);
  $day_name=f_dayofweek($l_yy, $l_mm, $l_dd);
  
  $time=substr($this->tm,0,5);      // Время 
  
  $alt_img = (strlen($this->play)>0)? "<span class='alt_play_name'>".$this->play."</span>" : "";
  $image=(strlen($this->img)>0)? "<img src='".$SiteURL."/".$this->img."' width=100% title='Спектакль ".$this->play."'  alt='Спектакль ".$this->play."'>".$alt_img : "";
  
  if($this->link_state==1)
   $image="<a href='".$SiteURL."/plays/".$this->link."'>".$image."</a>"; // изображение [ссылка]
   
  $style=(strlen($this->style)>0)?$this->style:"";

  //$more=($this->info!=""?"<span class='podr'>подробнее...</span><div class='more'>".$this->info."</div>":""); // [дополнительная информация] 
  $more = $this->info;
	$more=($this->info!="")? ("<div class='af_row_body_info'>".$this->info."</div> ") : "";
	
	$title = (strlen($this->title)>0)? "<b>".$this->title."</b>" : "";
	$header = (strlen($image)>0)? $image : $title;
  
  $admin="";
  $item_id="";
  $edit="";
	
	$id_date = "date_".$l_yy."-".$l_mm."-".$l_dd;
	
	$line_stat = ($this->stat == 2)? " data-stat='cancelled'" : "";

  $ret.="<div class='af_row' ".$line_stat.">
					<span id='".$id_date."'></span>
					<div class='af_row_viewer'><div class='af_row_content'".$item_id.">
					<div class='af_row_datetime'>
						<div class='af_row_date'>
							<div class='af_row_date_val'>".$day_date."</div>
							<div class='af_row_date_name'>".$day_name."</div>
						</div>
						<div class='af_row_time'>
							<div class='af_row_time_val'>
							".$time."
							</div>
						</div>
					</div>
					<div class='af_row_body'>
						<h1 class='af_row_body_min'>
							<a href='https://tteatr.ru/plays/".$this->link."'>«".$this->play."»</a>
						</h1> 
						<div class='af_row_body_max'>
							<a href='https://tteatr.ru/plays/".$this->link."'>
								<img src='https://tteatr.ru/".$this->img."' alt='«".$this->play."»' class='img_border'>
							</a>
						</div> 
						<div class='af_row_body_autor_type'>
							<div class='af_row_body_author'>
								".$this->autor.", 
							</div> 
							<div class='af_row_body_type'>
								".$style."
							</div>
						</div> 
						".$more."
						<hr> 
						<div class='af_row_body_place'><i class='fas fa-map-marker-alt' style='min-width: 1.5rem'></i> ".$this->place."</div> 
						<div class='af_row_body_coste'><i class='fas fa-money-bill-alt' style='min-width: 1.5rem'></i> ".$this->coste."</div>
						<div class='af_row_body_age_limit'><i class='fas fa-user-clock' style='min-width: 1.5rem'></i> ".$this->age_limit."+</div>
						<div class='show_stat'></div>
					</div>
        </div></div></div>";
  $ret.=$edit;		
	  
  return $ret;	  
  }
 }

class afisha {
	private $month_f=0; // флаг месяца
	private $month=0;

	private function show_month($af_date, $FirstMonth) {
		$ret="";
		$this->month = substr($af_date,5,2);  // Месяц спектакля
		if($this->month!=$this->month_f){
			if(!$FirstMonth) {
				$ret.="</div></div>";
			}
			// печатать название месяца
			$ret.="<div class='af_month'>
				<div class='af_month_title'>
					<div></div>
					<div class='af_month_title_val'>".f_month($this->month)."</div>
					<div></div>
				</div>
				<div class='af_mont_content'>
				";
			$this->month_f=$this->month;
		}
		return $ret; 
	} 
 
	private function show_inner() {
		$ret="";
		$aMetaImg = [];
		// if($_SESSION[stat]>666) {
			// $query="SELECT id, play, play_id, af_title, af_date, af_time, info, autor, style, link, link_state, img, img2, img_ver, afisha.insta AS insta FROM afisha LEFT JOIN plays USING(play_id) WHERE (stat!=0 AND af_date<DATE_FORMAT(NOW(), '%Y-%m-%d ')) ORDER BY id DESC LIMIT 4";
		// } else {
			$query="SELECT 
				id, 
				play, 
				play_id, 
				af_title, 
				af_date, 
				af_time, 
				info, 
				autor, 
				style, 
				link, 
				link_state, 
				img, 
				img_meta, 
				af_kind, 
				img2, 
				img_ver,
				af_age_limit,
				place,
				coste,
				stat
			FROM 
				afisha 
			LEFT JOIN 
				plays 
			USING(play_id) 
			WHERE (stat!=0 AND af_date>=DATE_FORMAT(NOW(), '%Y-%m-%d ') 
			AND af_kind!=1) 
			ORDER BY 
				af_date, 
				af_time";        // подключение афиши 
		// }
		$result = mysql_query($query) or die("i'm dead");
		$FirstMonth = true;
		while($line=mysql_fetch_array($result)) {
			// показать месяц (если нужно)
			$ret.= $this->show_month($line[af_date], $FirstMonth);
			$FirstMonth = false;
			// показать пункт афиши
			$img = $line[img];
			if($line[img_ver] == 2) {
				$img_path = $line[img2];
				$info_vis= "";
			}
			//  создаем объект
			$item=new afisha_item();
			//  печатаем объект
			$ret.= $item->show(
				$line[id], 
				$line[play], 
				$line[play_id], 
				$line[af_date], 
				$line[af_time], 
				$line[info], 
				$line[autor], 
				$line[style], 
				$line[link], 
				$line[link_state], 
				$img, 
				$line[af_title], 
				$line[insta], 
				null,
				$line[af_age_limit],
				$line[place],
				$line[coste],
				$line[stat]
			);
			$aMetaImg[] = $line[img_meta];
		} 
		$ret.= "</div></div>";
		$aMetaImgUnic = array_unique($aMetaImg);
		foreach($aMetaImgUnic as $val) {
			$MetaImg.= "<meta property='og:image' content='/imgs/plays/".$val."' />\n";
		}
		// $MetaImg
		if($ret=='') {
			$ret="<div class='afisha_empty'>В ближайшее время спектакли не запланированы</div>";
		}
		$HeadLines.="<!-- =^.^= -->\n";
		return $ret;//."</div>";  
	}
	
	private function show_inner_other() {
		$ret="";
		// if($_SESSION[stat]>666) {
			// $query="SELECT id, play, play_id, af_title, af_date, af_time, info, autor, style, link, link_state, img FROM afisha LEFT JOIN plays USING(play_id) WHERE (stat!=0 AND af_date<DATE_FORMAT(NOW(), '%Y-%m-%d ')) ORDER BY id DESC LIMIT 4";
		// } else {
			$query="SELECT id, play, play_id, af_title, af_date, af_time, info, autor, style, link, link_state, img, af_kind, stat FROM afisha LEFT JOIN plays USING(play_id) WHERE (stat!=0 AND af_date>=DATE_FORMAT(NOW(), '%Y-%m-%d ') AND af_kind=1) ORDER BY af_date, af_time";        // подключение афиши 
		// }
		$result = mysql_query($query) or die("i'm dead");
		while($line=mysql_fetch_array($result)) {
			// показать месяц (если нужно)
			$ret.= $this->show_month($line[af_date]);
			// показать пункт афиши
			//  создаем объект
			$item=new afisha_item();
			//  печатаем объект
			// $ret.= $item->show($line[id], $line[play], $line[play_id], $line[af_date], $line[af_time], $line[info], $line[autor], $line[style], $line[link], $line[link_state], $line[img], $line[af_title],
				// $line[stat]);
				
			$ret.= $item->show(
				$line[id], 
				$line[play], 
				$line[play_id], 
				$line[af_date], 
				$line[af_time], 
				$line[info], 
				$line[autor], 
				$line[style], 
				$line[link], 
				$line[link_state], 
				$img, 
				$line[af_title], 
				$line[insta], 
				null,
				$line[af_age_limit],
				$line[place],
				$line[coste],
				$line[stat]
			);
		} 
		
		if($ret!='') {
			$ret = "<a name='other'></a><h2>Прочее</h2>".$ret;
		}
		return $ret;//."</div>";  
	}
	 
	public function show() {
		$ret="";
		$ret.= "<div class='afisha_wrap'>";
		$ret.=  $this->show_inner();
		$ret.= "</div>";
		
		//if($_SESSION[stat]>6) {
			$ret.= "<div id='afisha_table_other' class='afisha_table'>";
			$ret.=  $this->show_inner_other();
			$ret.= "</div>";
		//}

		$ret.="<hr>";
		
		return $ret;
  } 
 } 
?>