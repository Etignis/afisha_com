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
		info: {
			type: String,
			default: ""
		},		
		place: {
			type: String,
			default: ""
		},
		age_limit: {
			type: String,
			default: ""
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
			localDate: "",
			localTime: "18:00:00",
			localPlace: "",
			localAge: "",
			localInfo: ""
		};
	},
	methods: {
		
		placeChanged: function(sText) {
			this.innerPlace = sText;
		},
		ageChanged: function(sText) {
			this.innerAge = sText.replace(/\D+/g, "")+"+";
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
				age: this.innerAge,
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
			return this.infoText? this.infoText.split(/[\r\n]+/).length+1 : 2;
		},
		
		isEdit: function() {
			return this.mode == "edit";
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
				return this.localInfo || this.info.replace(/\|\|/g, "\n");
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
				return this.localAge || this.age_limit;
			},
			set: function(sVal) {
				this.localAge = sVal;
			}
		},
		innerPlayId: {
			get: function() {
				let oPlay = this.plays.find(el => el.name == this.name);
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
					{{item.name}}
					</option>
				</select>
			</td>
		</tr>
		<tr v-show="addEventMode">
			<td width="1">
				Событие
			</td>
			<td>
				<input type="text" v-model="innerName">
			</td>
		</tr>
		<tr>
			<td>
				Дата
			</td>
			<td>
				<input type="date" v-model="innerDate">
			</td>
		</tr>
		<tr>
			<td>
				Время
			</td>
			<td>
				<input type="time" v-model="innerTime">
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
			type: Number
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
		age_limit: {
			type: String,
			default: ""
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
		formattedInfo: function(){
			return this.info.replace(/\|\|/g, "<br>");
		},
	shown: function(){
		return !this.editMode;
	}
	},
	created: function(){
		
	},
	template: `<div class='af_row'>
	<div class='af_row_viewer' v-show="shown">
		<div class='af_row_content'>		
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
				<div class='af_row_body_min'>
					<a :href='url'>{{name}}</a>
				</div>
				<div class='af_row_body_max'>
					<a :href='url'> 
						<img :src="mainImage" :alt="name"/>
					</a>
				</div>
				<div class='af_row_body_autor_type'>
					<div class='af_row_body_autor'>
						{{autor}}
					</div>
					<div class='af_row_body_type'>
						{{kind}}
					</div>
				</div>
				<div class='af_row_body_info' v-html='formattedInfo'>
			
				</div>
				<div class='af_row_body_place'>
					{{place}}
				</div>
				<div class='af_row_body_age_limit'>
					{{age_limit}}
				</div>
			</div>
		</div>
		<div class='af_row_panel'>
			<a href="" @click.stop.prevent="edit">Редактировать</a>
			<a href="">Скрыть</a>
			<a href="">Удалить</a>
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
</div>`
});

	
var app = new Vue({
	el: '#app',
	data: {
		aAfishaItems: [
			{
				id: 0,
				name: "Жёны артистов",
				info: "\u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0432\u0430\u043d\u0438\u044f ''\u041d\u0430\u0440\u043e\u0434\u043d\u043e\u0433\u043e \u0442\u0435\u0430\u0442\u0440\u0430''||\u0412\u043e\u0437\u0440\u0430\u0441\u0442\u043d\u043e\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u0435 14+||\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0430\u0435\u043c \u0432\u0441\u0435\u0445!",
				autor: "Антон Чехов",
				style: "Пьеса",
				link: "Artists_Wives",
				img: "imgs\/plays\/ArtistWifes.jpg",
				day_date: "7 апреля",
				day_name: "суббота",
				time: "16:00",
				place: "малый зал дк яуза",
				age_limit: "14+",
				dt: "2019-04-07",
				tm: "16:00:00"
			},
			{
				id: 1,
				name: "Принцесса",
				info: "Инфрмация",
				autor: "Антон Чехов",
				style: "Пьеса",
				link: "www",
				img: "img",
				day_date: "17 апреля",
				day_name: "суббота",
				time: "18:00",
				place: "малый зал дк яуза",
				age_limit: "14+",
				dt: "2019-04-17",
				tm: "18:00:00"
			},
			{
				id: 2,
				name: "Жёны артистов",
				info: "Инфрмация",
				autor: "Антон Чехов",
				style: "Пьеса",
				link: "www",
				img: "img",
				day_date: "7 мая",
				day_name: "суббота",
				time: "16:00",
				place: "малый зал дк яуза",
				age_limit: "14+",
				dt: "2019-05-07",
				tm: "16:00:00"
			},
		],
		
		editor: {
			data: {
				id: "99",
				name: "99",
				info: "99",
				place: "99",
				age_limit: "99",
				dt: "2019-05-07",
				tm: "16:00:00"
			},
			mode: "add"
		},
		aPlays: [
			{
				id: 1,
				name: "Жёны артистов"
			},
			{
				id: 2,
				name: "Принцесса"
			}
		],
		aPlaces: [
			{
				name: "Малый зал Дк \"Яуза\"",
				url: ""
			},			
			{
				name: "Большой зал Дк \"Яуза\"",
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
		aAfisha: function(){
			var oDict={
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
			};
			var sMonth="";
			var aRet = [];
			var oRet = {};
			this.aAfishaItems.sort(function(a, b){
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
	methods: {
		showEditor: function(){
		//	this.$refs.af_editor.init();
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
		
		editItem: function(nItemId){
			this._clearEditor();
			var oItem = this.aAfishaItems.find(el => el.id==nItemId);
			if(oItem) {
				for( let key in this.editor.data) {
					this.editor.data[key] = String(oItem[key]);
				}
				this.editor.mode="edit";
				this.showEditor();
			}
		},
		
		_sendData: function(sMode, oData) {
			var aParams = [];
			for(let key in oData) {
				aParams.push(key +"="+ encodeURIComponent(oData[key]))
			}
			var sRequest = aParams.join("&");
		},
		
		saveEdited: function(oData) {
			this._sendData("save", oData);
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