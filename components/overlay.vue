<template>
  <div>
    <v-btn
      color="deep-purple accent-4"
      @click="over"
      text
    >
      <v-icon>mdi-package-variant</v-icon>&nbsp;سفارش دهید
    </v-btn>
    <!-- :max-width="maxWidth*0.8" -->
    <v-overlay :value="overlay">
      <v-card
        class="mx-auto"
        tile
        align=center
        :max-width="maxWidth*0.9"
      >
        <v-img
          max-height="30rem"
          max-width="40rem"
          src="https://i.pinimg.com/originals/73/5c/ab/735cabd7d4b6dd810dc33c3978edb756.jpg"
        >
        <v-btn
          @click="overlay = false"
          text
          color="none"
          >
          <v-icon>mdi-close</v-icon> بستن
        </v-btn>
        <v-list style='opacity: 70%;'>
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
            three-line
          >
            <v-list-item-content>
                <hr>
                <v-list-item-title>{{product.title}}</v-list-item-title>
                <br>
              <v-list-item-subtitle>سازنده: {{product.owner.name}}</v-list-item-subtitle>
              <br>
              <v-list-item-subtitle>نوع: {{product.category.type}}</v-list-item-subtitle>
              <br>
              <v-list-item-subtitle class="text-caption">{{product.description}}</v-list-item-subtitle>
              <br>
              <v-list-item-title class="font-weight-bold">قیمت هر یک عدد: {{product.price}}  تومان</v-list-item-title>
              <hr class="my-1">
              <v-flex class="success py-1">موجود در فروشگاه &nbsp;<v-icon>mdi-check</v-icon></v-flex>
            </v-list-item-content>
            <v-list-item-avatar class="mt-12" icon :size="maxWidth*0.19" color=grey>
              <v-img :src="product.photo"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
                <v-row>
                  <v-col class="py-0" cols=12 md=6>
                    <v-form ref="form">
                      <v-text-field :rules="rule" rounded solo-inverted outlined prepend-icon="mdi-cookie" class="my-auto mr-5" color="pink darken-4" label="تعداد سفارش" type="number" v-model="quantity"></v-text-field>
                    </v-form>
                  </v-col>
                  <v-col class="py-0" cols=12 md=6>
                    <v-btn color="mt-3 amber darken-2" @click="addProductToCart(product , quantity)">افزودن به جعبه &nbsp;&nbsp; <v-icon>mdi-cart-outline</v-icon> </v-btn>
                  </v-col>
                </v-row>
        </v-img>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    props: [
      "product" ,
    ]
    ,
    data: () => ({
      overlay: false,
      quantity : null ,
      maxWidth : 0 ,
      rule : [
        v => !!v || "" ,
        v => v > 0 || "" ,
      ]
    }),
    methods: {
      over() {
        this.overlay = true ;
      } ,
      addProductToCart (product , quantity) {
        if(this.$refs.form.validate()) {
          this.$store.dispatch("addProductToCart" , {product : product , quantity : quantity})
          this.overlay = false
          this.$store.commit('navigationOn')
        }
      }
    },
    computed: {
    }, 
    mounted () {
      let maxWidth = window.innerWidth
      this.maxWidth = maxWidth
    },
  }
</script>

<style scoped>

</style>