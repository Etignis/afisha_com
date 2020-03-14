<?php
function afisha_edit_date($prefix, $item_date=NULL)
 {
 return "<input required type='date' id='".$prefix."_afisha_date' style='width:100%;' value='".$item_date."'>";
 }
 
function afisha_edit_time($prefix, $item_time=NULL)
 {
 return "<input required type='time' id='".$prefix."_afisha_time' value='18:00' style='width:100%;' value='".$item_time."'>";
 }
 
function afisha_edit_info($prefix, $item_info=NULL)
 {
 $item_info=preg_replace("/<br>/im","\n", $item_info);
 return "<textarea id='".$prefix."_afisha_info' class='textedit' style='min-height: 100px; width:96%' contenteditable=true>".$item_info."</textarea>";
 }
 
function afisha_edit_title($prefix, $item_title=NULL, $fOther=0)
 {
 return "<input required type='text' id='".$prefix."_afisha_title' data-other='".$fOther."' style='width:100%;' value='".$item_title."'>";
 }
 
function afisha_edit_kind($prefix, $item_title=NULL)
 {
 return "<p><label><input  type='checkbox' id='".$prefix."_afisha_kind''> не отображать в афише</label></p>";
 }
 
function make_play_select($prefix, $item_select=NULL)
 {
 $query="SELECT play, play_id FROM plays WHERE link_state>-1 ORDER BY date DESC";        // подключение списка спектаклей
 $result = mysql_query($query) or die("--");
 while($line=mysql_fetch_array($result))
  {
  $sel=($item_select==$line[play_id]?"selected":"");
  $select.="<option value='".$line[play_id]."' ".$sel.">".$line[play]."</option>";
  }
 $select="<select id='".$prefix."_afisha_play'>".$select."</select>"; 
  
 return $select;
 } 
 
function make_project_select($prefix, $item_select=NULL)
 {
 $query="SELECT name, id FROM projects WHERE stat>0 ORDER BY date DESC";        // подключение списка проектов
 $result = mysql_query($query) or die("--");
 while($line=mysql_fetch_array($result))
  {
  $sel=($item_select==$line[id]?"selected":"");
  $select.="<option value='".$line[id]."' ".$sel.">".$line[name]."</option>";
  }
 $select="<select id='".$prefix."_afisha_project'>".$select."</select>"; 
  
 return $select;
 }

 
class afisha_item
 {
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
 
 private function edit_form($item_id, $select, $item_date, $item_time, $item_info)
  {
  $ret="";

  $date = afisha_edit_date($item_id."_row", $item_date);
  $time = afisha_edit_time($item_id."_row", $item_time);
  $info = afisha_edit_info($item_id."_row", $item_info);
  
  
  $admin="<div class='afisha_admin_panel' data-play='".$this->id."' align=right>
            <a class='afisha_edit_item_save' href=''>сохранить</a>     
            <a class='afisha_edit_item_cancel' href=''>отменить</a>      
           </div>";
		   
  $item_id=" data_item_id='".$this->id."'";		  		   
  
  $ret="<div class='afisha_row_edit' ".$item_id.">
          <div width='150'  valign='top' align='center' colspan=2>".$date.$time."</div>
          <div width='340' valign='top' align='left'>".$select."<br>".$info.$admin."</div>
        </div>";
  
  return $ret;
  } 
  
	public function add($play_id=NULL, $play_date, $play_time, $play_info, $af_title=NULL, $af_kind=NULL, $place=NULL, $coste=NULL, $age_limit=NULL, $anons=true) {
		if($play_id==NULL && $af_title==NULL) {		
		 $ret=0;
		}
		if($_SESSION[stat]>6) {
			$ret=0;
			$this->play=$play_id;
			$this->dt  =$play_date;
			$this->tm  =$play_time;
			$this->info=$play_info;
			$this->title = $af_title;
			$this->kind = $af_kind;
			
			$this->place = $place;
			$this->coste = $coste;
			$this->age_limit = $age_limit;
			$this->anons = $anons;

			$query="INSERT INTO afisha (play_id, info, af_date, af_time, stat, af_title, af_kind, place, coste, af_age_limit, anons) VALUES ('$this->play', '$this->info', '$this->dt', '$this->tm', '1', '$this->title', '$this->kind', '$this->place', '$this->coste', '$this->age_limit', '$this->anons')";        
			$result = mysql_query($query) or die("$query");
			if($result) {
				$ret=1;   
			} else {
				$ret=$result;
			}
		 }
		return $ret; 
  }
  
 public function del($item_id)
  {
  $ret=0;
  if($_SESSION[stat]>6)
   {
   $this->id=$item_id;
   $query="UPDATE afisha SET stat=0 WHERE id='$this->id'";       
   $result = mysql_query($query) or die("i'm dead");
   if($result)
    $ret=1;
   }
  return $ret;   
  }
	
 public function undel($item_id)
  {
  $ret=0;
  if($_SESSION[stat]>6)
   {
   $this->id=$item_id;
   $query="UPDATE afisha SET stat=1 WHERE id='$this->id'";       
   $result = mysql_query($query) or die("i'm dead");
   if($result)
    $ret=1;
   }
  return $ret;   
  }

 public function save($id, $play_id, $play_date, $play_time, $play_info, $af_title, $af_kind, $place=NULL, $coste=NULL, $age_limit=NULL, $anons=true)
  {
  $ret=0;
  if($_SESSION[stat]>6)
   {
   $this->id    = $id;
   $this->play  = $play_id;
   $this->dt    = $play_date;
   $this->tm    = $play_time;
   $this->info  = $play_info;
   $this->title = $af_title;
   $this->kind  = $af_kind;
  
	$this->place = $place;
	$this->anons = $anons;
	$this->coste = $coste;
	$this->age_limit = $age_limit;
			
   $query="UPDATE afisha SET play_id='$this->play', af_date='$this->dt', af_time='$this->tm', info='$this->info', af_title='$this->title', af_kind='$this->kind', place='$this->place', coste='$this->coste', af_age_limit='$this->age_limit', anons='$this->anons' WHERE id='$this->id'";        
   $result = mysql_query($query) or die("i'm dead [".$query."]");
   if($result)
    $ret=1;
   }	
  return $ret;  
  } 
  
 public function show($id, $play, $play_id, $date, $time, $info, $autor, $style, $link, $link_state, $img, $title, $insta, $img_meta) {
  $this->id         = $id;
  $this->play       = $play;
  $this->play_id    = $play_id;
  $this->title      = $title;
  $this->dt         = $date;
  $this->tm         = $time;
  $this->info       = $info;
  $this->author     = $author;
  $this->style      = $style;
  $this->link       = $link;
  $this->link_state = $link_state;
  $this->img        = $img;
  $this->img_meta   = $img_meta;
  $this->insta  	 = 	$insta;
  
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
	
	$title = (strlen($this->title)>0)? "<b>".$this->title."</b>" : "";
	$header = (strlen($image)>0)? $image : $title;
  
  $admin="";
  $item_id="";
  $edit="";
	 // если админ, добавляем управление
  if($_SESSION[stat]>6) {
		$insta = "";
		if($this->insta == 0) {
			$insta = "<a class='afisha_item_insta' href='#' style='float: left'>в instagram</a>";
		}
		$admin="<div class='afisha_admin_panel' data-play='".$this->id."' align=right>
						".$insta."
            <a class='afisha_edit_item' href='#'>редактировать</a> 
            <a class='afisha_del_item'  href='#'>удалить</a>
           </div>";
   $item_id=" data_item_id='".$this->id."'";
   
	 if ($this->play) {
		$afishe_item_title = make_play_select($this->id."_row", $this->play_id);
	 } else {
		$afishe_item_title = afisha_edit_title($this->id."_row", $this->title, 1);
	 }

   $edit=$this->edit_form($this->id, $afishe_item_title, $this->dt, $this->tm, $this->info);   
   }
  
  $ret.="<div class='afisha_row'".$item_id.">
					<div class='ai_datetime'>
						<div class='ai_date'><b>".$day_date."</b><br>".$day_name."</div>
						<div class='ai_time'><b>".$time."</b></div>
					</div>
          <div class='ai_play'><div align=center style='margin-top:-5px;'>".$header."<br><b>".$style."</b></div>".$more."</div>".$admin."
        </div>";
  $ret.=$edit;		
	  
  return "<div class='afisha_inner_row'>".$ret."</div>";	  
  }
 }

class afisha {
	private $month_f=0; // флаг месяца
	private $month=0;

	private function show_month($af_date) {
		$ret="";
		$this->month = substr($af_date,5,2);  // Месяц спектакля
		if($this->month!=$this->month_f){
			// печатать название месяца
			$ret="
			<div>
			<div  class='ai_month giffon1'><b>".f_month($this->month)."</b>
			</div>
			</div>
			";//<div class='afisha_table_pays'>";
			$this->month_f=$this->month;
		}
		return $ret; 
	} 
 
	private function show_inner() {
		$ret="";
		$aMetaImg = [];
		if($_SESSION[stat]>666) {
			$query="SELECT id, play, play_id, af_title, af_date, af_time, info, autor, style, link, link_state, img, img2, img_ver, afisha.insta AS insta FROM afisha LEFT JOIN plays USING(play_id) WHERE (stat!=0 AND af_date<DATE_FORMAT(NOW(), '%Y-%m-%d ')) ORDER BY id DESC LIMIT 4";
		} else {
			$query="SELECT id, play, play_id, af_title, af_date, af_time, info, autor, style, link, link_state, img, img_meta, af_kind, img2, img_ver FROM afisha LEFT JOIN plays USING(play_id) WHERE (stat!=0 AND af_date>=DATE_FORMAT(NOW(), '%Y-%m-%d ') AND af_kind!=1) ORDER BY af_date, af_time";        // подключение афиши 
		}
		$result = mysql_query($query) or die("i'm dead");
		while($line=mysql_fetch_array($result)) {
			// показать месяц (если нужно)
			$ret.= $this->show_month($line[af_date]);
			// показать пункт афиши
			$img = $line[img];
			if($line[img_ver] == 2) {
				$img_path = $line[img2];
				$info_vis= "";
			}
			//  создаем объект
			$item=new afisha_item();
			//  печатаем объект
			$ret.= $item->show($line[id], $line[play], $line[play_id], $line[af_date], $line[af_time], $line[info], $line[autor], $line[style], $line[link], $line[link_state], $img, $line[af_title], $line[insta]);
			$aMetaImg[] = $line[img_meta];
		} 
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
		if($_SESSION[stat]>666) {
			$query="SELECT id, play, play_id, af_title, af_date, af_time, info, autor, style, link, link_state, img FROM afisha LEFT JOIN plays USING(play_id) WHERE (stat!=0 AND af_date<DATE_FORMAT(NOW(), '%Y-%m-%d ')) ORDER BY id DESC LIMIT 4";
		} else {
			$query="SELECT id, play, play_id, af_title, af_date, af_time, info, autor, style, link, link_state, img, af_kind FROM afisha LEFT JOIN plays USING(play_id) WHERE (stat!=0 AND af_date>=DATE_FORMAT(NOW(), '%Y-%m-%d ') AND af_kind=1) ORDER BY af_date, af_time";        // подключение афиши 
		}
		$result = mysql_query($query) or die("i'm dead");
		while($line=mysql_fetch_array($result)) {
			// показать месяц (если нужно)
			$ret.= $this->show_month($line[af_date]);
			// показать пункт афиши
			//  создаем объект
			$item=new afisha_item();
			//  печатаем объект
			$ret.= $item->show($line[id], $line[play], $line[play_id], $line[af_date], $line[af_time], $line[info], $line[autor], $line[style], $line[link], $line[link_state], $line[img], $line[af_title]);
		} 
		
		if($ret!='') {
			$ret = "<a name='other'></a><h2>Прочее</h2>".$ret;
		}
		return $ret;//."</div>";  
	}
	
 private function show_editor_play(){  
  $ret="";
  if($_SESSION[stat]>6)
   {  
   $select = make_play_select("editor"); 
   $info   = afisha_edit_info("editor");
   $date   = afisha_edit_date("editor");
   $time   = afisha_edit_time("editor");
  
   $ret="<span class='podr'>Добавить в афишу спектакль</span>
         <div class='more'>
          <div id='afisha_edit'>
           <div>
            <div>Спектакль: </div>
            <div>".$select."</div>
           </div>
           <div>
            <div>Дополнительная информация: </div>
            <div>".$info."</div>
           </div>
           <div>
            <div>Дата: </div>
            <div>".$date."</div>
           </div> 
           <div>
            <div>Время: </div>
            <div>".$time."</div>
           </div>
           <div>
            <div></div>
            <div><button id='afisha_add'>Добавить</button></div>
           </div>
          </div>
         </div>";
   }
  return $ret;
  }
 private function show_editor_project() {  
  $ret="";
  if($_SESSION[stat]>6)
   {   
   $tile   = afisha_edit_title("project_editor");
   $info   = afisha_edit_info("project_editor");
   $date   = afisha_edit_date("project_editor");
   $time   = afisha_edit_time("project_editor");
   $kind   = afisha_edit_kind("project_editor");
  
   $ret="<br><span class='podr'>Добавить в афишу другое мероприятие</span>
         <div class='more'>
          <div id='project_edit'>           
           <div>
            <div>Заголовок: </div>
            <div>".$tile."</div>
           </div>          
           <div>
            <div>Информация: </div>
            <div>".$info."</div>
           </div>
           <div>
            <div>Дата: </div>
            <div>".$date."</div>
           </div> 
           <div>
            <div>Время: </div>
            <div>".$time."</div>
           </div>
           <div>
            <div>".$kind."</div>
           </div>
           <div>
            <div></div>
            <div><button id='afisha_add_project'>Добавить</button></div>
           </div>
          </div>
         </div>";
   }
  return $ret;
  }
 
 public function show()
  {
  $ret="";
  $ret.= "<div id='afisha_table' class='afisha_table'>";
  $ret.=  $this->show_inner();
  $ret.= "</div>";
	
	//if($_SESSION[stat]>6) {
		$ret.= "<div id='afisha_table_other' class='afisha_table'>";
		$ret.=  $this->show_inner_other();
		$ret.= "</div>";
	//}
  
  if($_SESSION[stat]>6) {
   $ret.=$this->show_editor_play();
   $ret.=$this->show_editor_project();
	}
  $ret.="<hr>";
  
  return $ret;
  } 
 } 
?>