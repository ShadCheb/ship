<template>
  <div class="list">
    <ship
      v-for="(ship, index) in data"
      :key="index + page * 100"
      :data-ship="ship"
      :showShip="activeShip"
      @emitShowDescription="setActiveShip"
    ></ship>

    <nav-page
      :page="page"
      :count-in-page="countInPage"
      :count-all="countAll"
      name-component="ListPage"
    ></nav-page>
  </div>
</template>

<script>
import Ship from '../components/Ship.vue'
import NavPage from '../components/NavPage.vue'

const axios = require('axios').default;

export default {
  name: 'app',
  components: {
    Ship, 
    NavPage
  },
  data() {
    return {
      data: {},

      countInPage: 10, // Количество записей на странице 
      countAll: null, // Всего записей

      activeShip: null // Корабль с описанием
    };
  },
  created() {
    this.getShipsLst();
  },
  computed: {
    page() {
      let number = +this.$route.query.page;

      return (number) ? number : 1;
    }
  },
  watch: {
    page() {
      this.getShipsLst();
    }
  },
  methods: {
    async getShipsLst() {
      let url = 'https://swapi.co/api/starships/';

      if (this.page) url = `${url}?page=${this.page}`;
      this.showShip = null; // Закрываем все описания при отрисовке списка

      axios.get(url)
        .then(response => {
          if (response.request.status != 200) throw new Error('Статус не 200');

          if (!this.countAll) this.countAll = response.data.count;

          this.data = response.data.results;
        })
        .catch(error => {
          console.error(error);
          console.error('Не удалось загрузить список кораблей');
        });
    },

    setActiveShip(idShip) {
      this.activeShip = (idShip) ? idShip : null;      
    }
  }
}
</script>
