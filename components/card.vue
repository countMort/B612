<template>
  <v-card
    class="mx-auto mt-2"
    height=450
    light
  >
    <v-img
      height="250"
      :src="product.photo"
      class="align-end"
    >
      <v-card-title style="background-color: rgba(0, 0, 0, 0.345);" class="py-1 white--text">
        {{product.name}}
      </v-card-title>
    </v-img>
    <v-card-text>
      <v-row>
        <v-rating
          :value="Number(product.averageRating) || 0"
          half-increments
          dense
          color="amber"
          size="14"
          readonly
        ></v-rating>
        <div class="ml-4">{{product.averageRating}} ({{product.reviews.length}})</div>
      </v-row>
      <div class="my-2 subtitle-1">
        {{product.price}} تومان• {{product.category.name}} 
        <!-- , {{product.owner.name}} -->
      </div>
      <div v-if="product.description">{{product.description}}</div>
    </v-card-text>
    <v-card-actions>
        <v-row class="mx-0">
          <v-btn class="mb-1" block small outlined nuxt :to="'/products/'+product._id">مشاهده جزییات</v-btn>          
          <v-btn
            color="deep-purple accent-4"
            @click="
              $emit('addDialog' , product)
            "
            text
            small
            block
          >
            <v-icon>mdi-package-variant</v-icon>&nbsp;سفارش دهید
          </v-btn>
        </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
      props: {
        product: Object
      } ,
    data: () => ({
    }),
  }
</script>
<style scoped>
</style>