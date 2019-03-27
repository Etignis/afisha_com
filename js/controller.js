function randd(min, max) {
  return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random());
};


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
		labelClick: function(oEvent){
			this.$emit('lclick', this.val);
		}
	},
	computed: {
		id: function(){
			return "ch_"+this.val;
		}
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
			this.editMode = !this.editMode;
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
	<div class='af_row_viewer' v-if="shown">
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
				<div class='af_row_body_name'>
					<a :href='url'>{{name}}</a>
				</div>
				<div class='af_row_body_img'>
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
				name: "Жёны артистов",
				info: "\u0417\u0430\u0449\u0438\u0442\u0430 \u0437\u0432\u0430\u043d\u0438\u044f ''\u041d\u0430\u0440\u043e\u0434\u043d\u043e\u0433\u043e \u0442\u0435\u0430\u0442\u0440\u0430''||\u0412\u043e\u0437\u0440\u0430\u0441\u0442\u043d\u043e\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u0435 14+||\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0430\u0435\u043c \u0432\u0441\u0435\u0445!",
				autor: "Антон Чехов",
				style: "Пьеса",
				link: "Artists_Wives",
				img: "imgs\/plays\/ArtistWifes.jpg",
				day_date: "7 апреля",
				day_name: "суббота",
				time: "18:00",
				place: "малый зал дк яуза",
				age_limit: "14+",
				dt: "2019-04-07",
				tm: "16:00:00"
			},
			{
				name: "Жёны артистов",
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
				tm: "16:00:00"
			},
			{
				name: "Жёны артистов",
				info: "Инфрмация",
				autor: "Антон Чехов",
				style: "Пьеса",
				link: "www",
				img: "img",
				day_date: "7 мая",
				day_name: "суббота",
				time: "18:00",
				place: "малый зал дк яуза",
				age_limit: "14+",
				dt: "2019-05-07",
				tm: "16:00:00"
			},
		],
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
			}
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
		
	}
});