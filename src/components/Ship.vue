<template>
  <div class="list__item" @click="showDescription" @mousedown.prevent="">
    <h2 class="list__caption">{{ dataShip.name }}</h2>

    <transition name="slide">
      <div class="ship" v-if="showItem">
        <div class="ship__heder">
          <div class="ship__img"
            :class="{'load': load}"
          >
            <img :src="imageShip" alt="">
            <a :href="imageShip" target="_blank"></a>
          </div>
          <div class="ship__header__text">
            <p>Дата создания: {{ dataShip.created | getDate }}</p>
            <p>Дата редактирования: {{ dataShip.edited | getDate }}</p>
            <div class="space"></div>
            <h3 class="ship__under-caption">Модель</h3>
            <h2 class="ship__caption">{{ dataShip.model  || '-' }}</h2>
          </div>
        </div>
        <div class="ship__table">
          <div class="ship__table__row">
            <div class="ship__table__name">Класс</div>
            <div class="ship__table__value">{{ dataShip.starship_class || '-' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Производитель</div>
            <div class="ship__table__value">{{ dataShip.starship_class | getStringValue }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Стоимость</div>
            <div class="ship__table__value">{{ dataShip.cost_in_credits | getMoneyValue }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Длина, м:</div>
            <div class="ship__table__value">{{ dataShip.length || '-' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Кол. персонала: </div>
            <div class="ship__table__value">{{ dataShip.crew || '' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Кол. пассажиров: </div>
            <div class="ship__table__value">{{ dataShip.passengers || '' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Макс. скорость в атмосфере: </div>
            <div class="ship__table__value">{{ dataShip.max_atmosphering_speed || '' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Класс гипердвигателя: </div>
            <div class="ship__table__value">{{ dataShip.hyperdrive_rating || '' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">MGLT: </div>
            <div class="ship__table__value">{{ dataShip.MGLT || '' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Грузоподъемность: </div>
            <div class="ship__table__value">{{ dataShip.cargo_capacity || '' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Время жизнеобеспечения: </div>
            <div class="ship__table__value">{{ dataShip.consumables || '' }}</div>
          </div>
          <div class="ship__table__row">
            <div class="ship__table__name">Время жизнеобеспечения: </div>
            <div class="ship__table__value">{{ dataShip.consumables || '' }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const axios = require('axios').default;


export default {
  name: 'Ship',
  props: ['dataShip', 'showShip'],
  computed: {
    showItem(){
      return (this.dataShip && this.dataShip.url == this.showShip) ? true : false;
    }
  },
  data() {
    return {
      load: false, // загрузка картинки
      imageShip: ''
    };
  },
  filters: {
    getStringValue(arr) {
      if (Array.isArray(arr)) {
        return (arr.length) 
          ? arr.join(', ') 
          : '-';
      }
      else {
        return (arr) 
          ? arr 
          : '-';
      }
    },
    getMoneyValue(value) {
      return (value) 
        ? (value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        : '-';
    },
    getDate(value) {
      let v = Date.parse(value);
      let d = new Date(v);

      return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
    }
  },
  methods: {
    showDescription() {
      if (this.dataShip.url == this.showShip) {
        this.$emit('emitShowDescription', '');

        return;
      }

      let idShip = this.getIdShip(this.dataShip.url);
      
      this.$emit('emitShowDescription', this.dataShip.url);
      this.getImagesShip(idShip);
    },
    getIdShip(str) {
      let num = parseInt(str.replace(/[^\d]/g, ''));

      return num;
    },
    async getImagesShip(idShip) {
      this.load = true;

      const noPhoto = './img/nophoto.jpg';
      let url = `https://starwars-visualguide.com/assets/img/starships/${idShip}.jpg`;

      if (this.imageShip) {
        this.load = false;

        return;
      }

      axios.get(url)
        .then(response => {
          if (response.request.status != 200) throw new Error('Статус не 200');

          this.imageShip = response.config.url;
          this.load = false;
        })
        .catch(() => {
          this.imageShip = noPhoto;
          this.load = false;

          console.error('Не удалось загрузить изображение корабля');
        });
    }
  }
}
</script>
