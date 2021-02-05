<template>
  <v-card
    :loading="loading"
    class="mx-auto mt-2"
    max-width="374"
    height=450
    light
  >
    <v-img
      height="250"
      :src="product.photo"
      class="align-end"
    >
      <v-card-title style="background-color: rgba(0, 0, 0, 0.345);" class="py-1">
        {{product.title}}
      </v-card-title>
    </v-img>
    <v-card-text>
      <v-row>
        <v-rating
          :value="Number(product.averageRating) || 0"
          half-increments
          dense
          size="14"
          readonly
        ></v-rating>
        <div class="ml-4">{{product.averageRating}} ({{product.reviews.length}})</div>
      </v-row>
      <div class="my-2 subtitle-1">
        {{product.price}} تومان• {{product.category.name}} 
        <!-- , {{product.owner.name}} -->
      </div>
      <div>{{product.description || "&nbsp;"}}</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
        <v-row class="mx-0">
          <v-btn class="mb-1" block small outlined nuxt :to="'/products/'+product._id">مشاهده جزییات</v-btn>          
          <v-btn
            color="deep-purple accent-4"
            @click="
            addDialog = true
            selected = product
            "
            text
            small
            outlined
            block
          >
            <v-icon>mdi-package-variant</v-icon>&nbsp;سفارش دهید
          </v-btn>
        </v-row>
    </v-card-actions>
    <overlay @on-add-dialog="addDialog = false" :addDialog="addDialog" :product="selected" />
  </v-card>
</template>

<script>
import overlay from "@/components/overlay"
  export default {
      components: {
        overlay,
      }, 
      props: {
        product: Object
      } ,
    data: () => ({
      loading: false,
      selection: 1,
      addDialog : false ,
      selected: null
    }),

    methods: {
      reserve () {
        this.loading = true

        // setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
<style scoped>
</style>