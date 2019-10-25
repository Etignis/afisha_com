Vue.component('modalWin', {
	props: {
		title: {
			type: String,
			default: ""
		},
		content: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {
			
		};
	},
	methods: {
		close: function(){
			this.$emit('close');
		}
	},
	computed: {
		
	},

	template: `<div class="mod_win_wrapper" style='background: rgba(0, 0, 0, 0.7);'  @scroll.stop>
	<div class="mod_win">
		<span class="bCloseInfoWin" @click="close">×</span>
		<slot></slot>
	</div>
</div>`
});

Vue.component('combobox', {
	props: {
		id: {
			type: String,
			default: ""
		}, 
		val: {
			type: String,
			default: ""
		},
		list: {
			type: Array
		}
	},
	data: function(){
		return {
			listVisible: false,
			innerId: "",
			filteredList: [],
			innerValue: ""
		};
	},
	methods: {
		input: function(e){
			this.filterList();
			this.$emit("input", e.target.value /*this.value || arguments[0].data*/);
			//this.$emit('input', +e.target.value);
		},
		select: function(sText){
			//this.value = sText;
			this.listVisible = false;
			//this.value = sText;
			this.$emit("input", sText);
		},
		filterList: function() {
			let oRet = [];
			let oInput =  this.$refs[this.innerId];
			
			if(oInput && oInput === document.activeElement) {
				oRet = this.value.length>0? this.list.filter(el => el.trim().toUpperCase().indexOf(this.value.trim().toUpperCase())>-1) :this.list;
			}
			this.listVisible = oRet.length > 0;
			this.filteredList = oRet;
		},
		toggleList: function(){
			this.listVisible = !this.listVisible;
			if(this.listVisible) {
				let oInput =  this.$refs[this.innerId];
				oInput.focus();
			}
		},
		hideList: function() {
			setTimeout(
				function(){
					this.listVisible = false;
				}.bind(this), 
				300
			);
		}
	},
	computed: {
		value: {
			get: function(){
				return this.innerValue || this.val;
			},
			set: function(sVal){
				this.innerValue = sVal;
			}
		}
	},
	created: function(){
		//this.value = this.val;
		this.innerId = this.Id || "combobox_input_"+Date.now();
		this.filteredList = this.list;
	},

	template: `<div class="combobox">
	<div class='input_place'>
		<input 
			type="text" 
			:ref="innerId"
			:value="value" 
			@input="input"
			@blur="hideList">
		<button
			@click="toggleList"
		>▼</button>
	</div>
	<div class="combobox_list_place">
		<ul class="combobox_list" v-show="listVisible">
			<li
				v-for="item in filteredList"
				@click="select(item)"
			>
			{{item}}
			</li>
		</ul>
	</div>
</div>`
});

Vue.component('af_month', {
	props: {		
		month: {
			type: String,
			default: ""
		}
	},
	data: function(){
		return {
			
		};
	},
	methods: {
		
	},
	computed: {
		
	},
	created: function(){
		
	},
	template: `<div class='af_month'>
	<div class='af_month_title'>
		<div></div>
		<div class='af_month_title_val'>
			{{month}}
		</div>
		<div></div>
	</div>
	<div class='af_mont_content'>
		<slot></slot>
	</div>
</div>`
});

Vue.component('af_editor', {
	props: {		
		mode: {
			type: String,
			default: "addPlay"
		},
		id: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: ""
		},		
		coste: {
			type: String,
			default: ""
		},
		info: {
			type: String,
			default: ""
		},		
		place: {
			type: String,
			default: ""
		},
		age_limit: {
			type: Number,
			default: function(val){
				return Number(val) || 0;
			}
		},
		date: {
			type: String,
			default: ""
		},
		time: {
			type: String,
			default: ""
		},
		plays: {
			type: Array
		},
		places: {
			type: Array
		},
		ages: {
			type: Array
		}
	},
	data: function(){
		return {
			selectedPlayId: "",
			//infoText: "",
			localName: "",
			localCoste: "",
			localDate: "",
			localTime: "",
			localPlace: "",
			localAge: "",
			localInfo: undefined
		};
	},
	methods: {
		
		placeChanged: function(sText) {
			this.innerPlace = sText;
		},
		ageChanged: function(sText) {
			sText = sText.replace(/\D+/g, "");
			if(sText.length>0) {
				this.innerAge = sText.replace(/\D+/g, "")+"+";
			} else {
				this.innerAge = sText;
			}
			
		},
		
		cancel: function() {
			this.$emit('cancel');
		},
		submit: function() {
			var oData = {
				afisha_id: this.id,
				play_id: this.innerPlayId,
				name: this.innerName,
				date: this.innerDate,
				time: this.innerTime,
				info: this.innerInfo,
				place: this.innerPlace,
				coste: this.innerCoste,
				age_limit: this.innerAge,
				mode: this.mode
			};
			this.$emit('submit', oData);
		},
		
		infoEdited: function(sVal) {
			this.localInfo = sVal.data;
		}
	},
	computed: {
		
		ageList: function(){
			return this.ages.map(el => el.name);
		},
		placeList: function(){
			return this.places.map(el => el.name);
		},
		infoRows: function(){
			return this.infoText? this.infoText.split(/[\r\n]+/).length+1 : 5;
		},
		
		isEditPlay: function() {
			return this.mode == "editPlay";
		},
		isEditEvent: function() {
			return this.mode == "editEvent";
		},
		isEdit: function() {
			return this.isEditPlay || this.isEditEvent;
		},
		isAdd: function() {
			return !this.isEdit;
		},
		
		addPlayMode: function() {
			return this.mode == "addPlay";
		},
		addEventMode: function() {
			return this.mode == "addEvent";
		},
		
		innerInfo: {
			get: function() {
				return (this.localInfo==undefined)? this.info.replace(/\|\|/g, "\n") : this.localInfo;
			},
			set: function(sVal) {
				this.localInfo = sVal;
			}
		},
		innerName: {
			get: function() {
				return this.localName || this.name;
			},
			set: function(sVal) {
				this.localName = sVal;
			}
		},
		innerCoste: {
			get: function() {
				return this.localCoste || this.coste;
			},
			set: function(sVal) {
				this.localCoste = sVal;
			}
		},
		innerDate: {
			get: function() {
				return this.localDate || this.date;
			},
			set: function(sVal) {
				this.localDate = sVal;
			}
		},
		innerTime: {
			get: function() {
				return this.localTime || this.time;
			},
			set: function(sVal) {
				this.localTime = sVal;
			}
		},
		innerPlace: {
			get: function() {
				return this.localPlace || this.place;
			},
			set: function(sVal) {
				this.localPlace = sVal;
			}
		},
		innerAge: {
			get: function() {
				return Number(String(this.localAge || this.age_limit).replace(/\D+/g, ""));
			},
			set: function(sVal) {
				this.localAge = sVal;
			}
		},
		innerPlayId: {
			get: function() {
				let oPlay = this.plays? this.plays.find(el => el.play == this.name): null;
				return this.selectedPlayId || (oPlay? oPlay.id : "");
			},
			set: function(sVal) {
				this.selectedPlayId = sVal;
			}
		},
		
	},
	created: function(){
		
	},
	beforeUpdate: function(){
		
	},
	beforeMount: function() {
		
	},
	template: `<div class='af_editor'>
	<table class='af_editor_table'>
		<tr v-show="addPlayMode">
			<td width="1">
				Спектакль
			</td>
			<td>
				<select v-model="innerPlayId">
					<option
						v-for="item in plays"
						:value="item.id"
					>
					{{item.play}}
					</option>
				</select>
			</td>
		</tr>
		<tr v-show="isEditPlay">
			<td width="1">
				Спектакль
			</td>
			<td>
				<select v-model="innerPlayId">
					<option
						v-for="item in plays"
						:value="item.id"
					>
					{{item.play}}
					</option>
				</select>
			</td>
		</tr>
		<tr v-show="addEventMode">
			<td width="1">
				Событие
			</td>
			<td>
				<input type="text" v-model="innerName" style='width: 100%'>
			</td>
		</tr>
		<tr v-show="isEditEvent">
			<td width="1">
				Событие
			</td>
			<td>
				<input type="text" v-model="innerName" style='width: 100%'>
			</td>
		</tr>
		
		
		
		<tr>
			<td>
				Дата
			</td>
			<td>
				<input type="date" v-model="innerDate"> Время <input type="time" v-model="innerTime"> Стоимость <input type="text" v-model="innerCoste"  placeholder="200р/Вход свободный">
			</td>
		</tr>
		
		
		<tr>
			<td>
				Информация
			</td>
			<td>
				<textarea class='af_row_body_info'  v-model="innerInfo" :rows="infoRows" style="width: 100%">
				
				</textarea>
			</td>
		</tr>
		<tr>
			<td>
				Место проведения
			</td>
			<td>
				<combobox
					:val="innerPlace"
					:list="placeList"
					@input="placeChanged($event)"
				>
				</combobox>
			</td>
		</tr>
		<tr>
			<td>
				Возрастное ограничение
			</td>
			<td>
				<combobox
					:val="innerAge"
					:list="ageList"
					@input="ageChanged($event)"
				>
				</combobox>
			</td>
		</tr>
	</table>
	<div class='af_editor_footer'>
		<button class="btn_cancel" @click="cancel">
			Отменить
		</button>
		<button class="btn_submit" @click="submit" v-show="isEdit">
			Сохранить
		</button>
		<button class="btn_submit" @click="submit" v-show="isAdd">
			Добавить
		</button>
	</div>
</div>`
});

Vue.component('af_item', {
	props: {
		id: {
			type: String
		},
		name: {
			type: String,
			default: ""
		},
		info: {
			type: String,
			default: ""
		},
		autor: {
			type: String,
			default: ""
		},
		kind: {
			type: String,
			default: ""
		},
		link: {
			type: String,
			default: ""
		},
		img: {
			type: String,
			default: ""
		},
		day_date: {
			type: String,
			default: ""
		},
		day_name: {
			type: String,
			default: ""
		},
		time: {
			type: String,
			default: ""
		},
		place: {
			type: String,
			default: ""
		},
		coste: {
			type: String,
			default: ""
		},
		age_limit: {
			type: String,
			default: ""
		},
		enable_editor: {
			type: Boolean,
			default: false
		},
		stat: {
			type: Number,
			default: 1
		}
	},
	data: function(){
		return {
			rootUrl: "https://tteatr.ru/",
			editMode: false
		};
	},
	methods: {
		edit: function(){
			//this.editMode = !this.editMode;
			this.$emit('edit', this.id);
		},
		del: function(){
			this.$emit('del', this.id);
		},
		hide: function(){
			this.$emit('hide', this.id);
		},
		show: function(){
			this.$emit('show', this.id);
		},
		cancel: function(){
			this.editMode = !this.editMode;
		},
		save: function(){
			this.editMode = !this.editMode;
		}
	},
	computed: {
		url: function() {
			return this.rootUrl+"plays/"+this.link;
		},
		mainImage: function(){
			return this.rootUrl + this.img;
		},
		formattedAuthor: function(){
			return (this.autor && this.kind)?this.autor+", ": this.autor;
		},
		formattedInfo: function(){
			return this.info.replace(/\|\|/g, "<br>");
		},
		formatted_age_limit: function() {
			return this.age_limit?'<i class="fas fa-user-clock" style="min-width: 1.5rem"></i> '+this.age_limit.replace(/\D/g, "")+ "+" : "";
		},
		formatted_coste: function() {
			return this.coste? '<i class="fas fa-money-bill-alt" style="min-width: 1.5rem"></i> ' + this.coste : "";
		},
		formatted_place: function() {
			return this.place?'<i class="fas fa-map-marker-alt" style="min-width: 1.5rem"></i> '+this.place : "";
		},
		
		formatted_name: function(){
			return this.name.replace(/^['\"\`«]*(.+)['\"\`»]*$/ig, "«$1»");
		},
		
		shown: function(){
			return !this.editMode;
		},
		af_row_content_class: function() {
			let aClasses = ["af_row_content"];
			if(this.stat == 0){
				aClasses.push("invisible")
			}
			return aClasses.join(" ");
		}
	},
	created: function(){
		
	},
	template: `<article class='af_row'>
	<div class='af_row_viewer' v-show="shown">
		<div :class='af_row_content_class'>		
			<div class='af_row_datetime'>
				<div class='af_row_date'>
					<div class='af_row_date_val'>{{day_date}}</div>
					<div class='af_row_date_name'>{{day_name}}</div>
				</div>
				<div class='af_row_time'>
					<div class="af_row_time_val">
						{{time}}
					</div>
				</div>
			</div>
			
			<div class='af_row_body'>
				<h1 class='af_row_body_min'>
					<a :href='url' v-if="link">{{formatted_name}}</a>
					<span v-else>{{formatted_name}}</span>
				</h1>
				<div class='af_row_body_max'>
					<a  v-if="link" :href='url'> 
						<img v-if="img" class="img_border" :src="mainImage" :alt="formatted_name"/>
						<h1 v-else>{{formatted_name}}</h1>
					</a>
					<span  v-else> 						
						<img v-if="img" class="img_border" :src="mainImage" :alt="formatted_name"/>
						<h1 v-else>{{formatted_name}}</h1>
					</span>
				</div>
				<div class='af_row_body_autor_type'>
					<div class='af_row_body_author'>
						{{formattedAuthor}}
					</div>
					<div class='af_row_body_type'>
						{{kind}}
					</div>
				</div>
				<div class='af_row_body_info' v-html='formattedInfo'>
			
				</div>
				
				<hr>				
				
				<div class='af_row_body_place' v-html="formatted_place">
				</div>
				<div class='af_row_body_coste' v-html="formatted_coste">
				</div>
				<div class='af_row_body_age_limit' v-html="formatted_age_limit">
				</div>
			</div>
		</div>
		<div class='af_row_panel' v-if="enable_editor">
			<a href="#" @click.stop.prevent="edit">Редактировать</a>
			<a href="#" @click.stop.prevent="hide" v-show="stat">Скрыть</a>
			<a href="#" @click.stop.prevent="show" v-show="!stat">Показать</a>
			<a v-if="0" href="#" @click.stop.prevent="del">Удалить</a>
		</div>
	</div>
	<div class='af_row_editor' v-if="editMode">
		<af_editor
			:id="id"
			:name="name"
			:info="info"
			:place="place"
			:age_limit="age_limit"
		>
		</af_editor>
		<div class='af_row_panel'>
			<a href="" @click.stop.prevent="cancel">Отменить</a>
			<a href="" @click.stop.prevent="save">Сохранить</a>
		</div>
	</div>
</article>`
});

$(document).ready(function(){	
var app = new Vue({
	el: '#app',
	data: {
		aAfishaItems: [
			
		],
		scriptURL: '/coms/afisha/afisha_func.php',
		fDataLoaded: false,
		editor: {
			data: {
				id: "",
				play_id: "",
				name: "",
				info: "",
				place: "",
				age_limit: 0,
				coste: "",
				dt: "",
				tm: ""
			},
			mode: "add"
		},
		aPlays: [
			
		],
		aPlaces: [
			{
				name: "Малый зал ДК \"Яуза\"",
				url: ""
			},			
			{
				name: "Большой зал ДК \"Яуза\"",
				url: ""
			},			
			{
				name: "Историко-художественный музей",
				url: ""
			}			
		],
		aAges: [
			{
				name: "6+"
			},	
			{
				name: "14+"
			},		
		],
		
		oMonthDict: {
				"01": "Январь",
				"02": "Февраль",
				"03": "Март",
				"04": "Апрель",
				"05": "Май",
				"06": "Июнь",
				"07": "Июнь",
				"08": "Август",
				"09": "Сентябрь",
				"10": "Отктябрь",
				"11": "Ноябрь",
				"12": "Декабрь"
		},
		
		bModalWinShow: false
	},

	computed: {
		aPlaysItems: function(){
			return this.aAfishaItems.filter(el => el.isPlay);
		},
		aNonPlaysItems: function(){
			return this.aAfishaItems.filter(el => !el.isPlay);
		},
		aAfisha: function(){
			var oDict=this.oMonthDict;
			var sMonth="";
			var aRet = [];
			var oRet = {};
			this.aPlaysItems.sort(function(a, b){
				if (a.dt+a.tm < b.dt+b.tm)
					return -1;
				if (a.dt+a.tm > b.dt+b.tm)
					return 1;
				return 0;
			}).forEach(function(el){
				let sLocalMonth = el.dt.substr(5, 2);
				if(sMonth != sLocalMonth) {		
					sMonth = sLocalMonth;
					oRet[sMonth] = [];
				}
				el.money = el.coste;
				oRet[sMonth].push(el);
			});
			
			for(var key in oRet) {
				aRet.push({
					month: oDict[key],
					items: oRet[key]
				});
			}
			
			return aRet;
		},
		aOtherAfisha: function(){
			var oDict=this.oMonthDict;
			var sMonth="";
			var aRet = [];
			var oRet = {};
			this.aNonPlaysItems
				.sort(function(a, b){
				if (a.dt+a.tm < b.dt+b.tm)
					return -1;
				if (a.dt+a.tm > b.dt+b.tm)
					return 1;
				return 0;
			}).forEach(function(el){
				let sLocalMonth = el.dt.substr(5, 2);
				if(sMonth != sLocalMonth) {		
					sMonth = sLocalMonth;
					oRet[sMonth] = [];
				}
				oRet[sMonth].push(el);
			});
			
			for(var key in oRet) {
				aRet.push({
					month: oDict[key],
					items: oRet[key]
				});
			}
			
			return aRet;
		}
		
	},
	mounted: function() {
		
	},
	
	created: function(){
		this.loadData();
	},
	methods: {
		loadData: function(){
			$.ajax({
				url: "https://tteatr.ru/api/afisha/index.php?type=afisha",
				method: 'POST',
				data: {
				},
				success: function (data) {
					this.aAfishaItems = JSON.parse(data);
					this.fDataLoaded = true;
				}.bind(this),
				error: function (error) {
					
				}.bind(this)
			});
			$.ajax({
				url: "https://tteatr.ru/api/afisha/plays.php",
				method: 'POST',
				data: {
				},
				success: function (data) {
					this.aPlays = JSON.parse(data);
				}.bind(this),
				error: function (error) {
					
				}.bind(this)
			});
		},
		showEditor: function(){
			this.bModalWinShow = true;
		},
		closeModWin: function(){
			this.bModalWinShow = false;
		},
		_clearEditor: function() {
			for (let key in this.editor.data) {
				this.editor.data[key] = "";
			}
		},
		
		_editItem: function(nItemId, sMode) {
			this._clearEditor();
			var oItem = this.aAfishaItems.find(el => el.id==nItemId);
			oItem.name = oItem.play;
			if(oItem) {
				for( let key in this.editor.data) {
					this.editor.data[key] = String(oItem[key]);
				}
				this.editor.mode=sMode;
				this.showEditor();
			}
		},
		
		editPlayItem: function(nItemId){
			this._editItem(nItemId, "editPlay");
		},
		delPlayItem: function(nItemId){
			this._sendData("del", {afisha_id: nItemId});
		},
		showPlayItem: function(nItemId){
			this._sendData("show", {afisha_id: nItemId});
		},
		hidePlayItem: function(nItemId){
			this._sendData("hide", {afisha_id: nItemId});
		},
		editOtherItem: function(nItemId){
			this._editItem(nItemId, "editEvent");
		},
		delOtherItem: function(nItemId){
			this._sendData("del", {afisha_id: nItemId});
		},
		showOtherItem: function(nItemId){
			this._sendData("show", {afisha_id: nItemId});
		},
		hideOtherItem: function(nItemId){
			this._sendData("hide", {afisha_id: nItemId});
		},
		
		_sendData: function(sMode, oData) {
			var aParams = [];
			for(let key in oData) {
				aParams.push(key +"="+ encodeURIComponent(oData[key]))
			}
			var sRequest = aParams.join("&");
			
			let data ="";
			let oSendData = {}; 
			switch(sMode) {
				case "editPlay":
				case "editEvent":
				case "save": oSendData = {
					stat: "save_edit",
					a_play: oData.play_id,
					a_text: oData.info,
					a_date: oData.date,
					a_time: oData.time,
					a_id: oData.afisha_id,
					a_kind: oData.play_id? 0: 1,
					a_title: oData.name,
					
					a_place: oData.place,
					a_coste: oData.coste==0? "Вход свободный" : oData.coste,
					a_age_limit: oData.age_limit
				};
					break;
				case "addEvent": 
				case "addPlay": 
				case "add": oSendData = {
					stat: "add",
					a_play: oData.play_id,
					a_text: oData.info,
					a_date: oData.date,
					a_time: oData.time,
					a_id: oData.afisha_id,
					a_kind: oData.play_id? 0: 1,
					a_title: oData.name,
					
					a_place: oData.place,
					a_coste: oData.coste==0? "Вход свободный" : oData.coste,
					a_age_limit: oData.age_limit
				};
					break;
				case "hide": oSendData = {
					stat: "del",
					item_id: oData.afisha_id
				};
					break;
				case "show": oSendData = {
					stat: "show",
					item_id: oData.afisha_id
				};
					break;
			}
			let aData =[];
			
			for(let key in oSendData) {
				aData.push(key+"="+oSendData[key]);
			}
			data = aData.join("&");
			
			$.ajax({
				type: 'POST',		
				url: this.scriptURL,
				data: data,
				success: function(answ){
					if(answ==1) {
					 mod_alert("Успешно.", 1500, 300);
					 this.loadData();
					} else {
					 alert('ошибка ['+answ+']');
					}										 
				}.bind(this)
			});
		},
		
		saveEdited: function(oData) {
			this._sendData(oData.mode, oData);
			this.closeModWin();
		},
		
		addPlay: function() {
			this._clearEditor();
			this.editor.mode="addPlay";
			this.showEditor();
		},
		
		addEvent: function() {
			this._clearEditor();
			this.editor.mode="addEvent";
			this.showEditor();
		}
	}
});
});