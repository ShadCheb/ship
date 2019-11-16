<template>
  <ul class="list__nav">
    <router-link tag="li" 
      class="list__nav__li list__nav__li--prev" 
      :class="{'list__nav__li--disabled': !prevPage}"
      :to="prevPage"
    >
      <a></a>
    </router-link>
    <li class="list__nav__li list__nav__li--current">
      <a>{{ page }}</a>
    </li>
    <router-link tag="li" 
      class="list__nav__li list__nav__li--next" 
      :class="{'list__nav__li--disabled': !nextPage}"
      :to="nextPage"
    >
      <a></a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'NavPage',
  props: ['page', 'countInPage', 'countAll', 'nameComponent'],
  computed: {
    countPages() {
      return Math.ceil(this.countAll / this.countInPage);
    },
    prevPage() {
      let prev = this.page - 1;

      return (prev > 0) 
        ? {name: this.nameComponent, query: {page: prev}}
        : '';
    },
    nextPage() {
      let next = this.page + 1;

      return (next <= this.countPages) 
        ? {name: this.nameComponent, query: {page: next}}
        : '';
    }
  }
}
</script>
