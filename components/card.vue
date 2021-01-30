<template>
  <v-card
    :loading="loading"
    class="mx-auto mt-2"
    max-width="374"
    height=500
    color="rgb(255 , 220 ,200 , 0.7)"
  >
    <v-img
      height="250"
      :src="product.photo"
    ></v-img>
    <v-card-title>{{product.title}}</v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-rating
          :value="Number(product.averageRating) || 0"
          color="amber"
          half-increments
          dense
          size="14"
          readonly
        ></v-rating>

        <div class="grey--text ml-4">{{product.averageRating}} ({{product.reviews.length}})</div>
      </v-row>

      <div class="my-4 subtitle-1 black--text">
        {{product.price}} تومان• {{product.category.type}} , {{product.owner.name}}
      </div>

      <div>{{product.description || "&nbsp;"}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <!-- <v-card-text> -->
      <!-- <div class="title text--primary">Tonight's availability</div> -->
      <!-- <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>
        <v-chip>7:30PM</v-chip>
        <v-chip>8:00PM</v-chip>
        <v-chip>9:00PM</v-chip>
      </v-chip-group> -->
    <!-- </v-card-text> -->
    <v-card-actions class="justify-center">
        <v-btn class="ml-5" nuxt color="transparent" :to="'/products/'+product._id">مشاهده جزییات</v-btn>
        <overlay :product="product" />
    </v-card-actions>
  </v-card>
</template>

<script>
import overlay from "../components/overlay"
  export default {
      components: {
        overlay,
      }, 
      props: [
        'product'
      ],
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        // setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>