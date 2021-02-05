<template>
  <div>
    <!-- :max-width="maxWidth*0.8" -->
    <v-dialog :max-width="500" v-model="addDialog" @click:outside="onAddDialog">
      <v-card
        class="full-width"
        tile
        v-if="product"
      >
        <v-img
          max-height="30rem"
          src="https://i.pinimg.com/originals/73/5c/ab/735cabd7d4b6dd810dc33c3978edb756.jpg"
        >
          <v-card-title style="background-color: rgba(0,0,0,0.3);">
            افزودن {{product.name}}
            <v-spacer></v-spacer>
            <v-btn
              @click="onAddDialog"
              icon
              >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list color="transparent">
              <v-list-item
                three-line
              >
                <v-list-item-content>
                  <v-list-item-title>{{product.name}}</v-list-item-title>
                  <v-list-item-subtitle>نوع: {{product.category.name}}</v-list-item-subtitle>
                  <v-list-item-subtitle class="caption">{{product.description}}</v-list-item-subtitle>
                  <div class="font-weight-bold">قیمت هر یک عدد: {{product.price}}  تومان</div>
                  <hr class="my-1">
                  <div class="success py-1 text-center">موجود در فروشگاه &nbsp;<v-icon>mdi-check</v-icon></div>
                </v-list-item-content>
                <v-list-item-avatar class="mt-12" icon :size="maxWidth*0.19" color=grey>
                  <v-img :src="product.photo"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-row>
            <v-col class="py-0" cols=12 md=6>
              <v-form ref="form">
                <v-text-field
                :rules="rule"
                outlined
                prepend-icon="mdi-light-switch"
                class="mr-2"
                color="black"
                label="تعداد سفارش"
                type="number"
                v-model="quantity"></v-text-field>
              </v-form>
            </v-col>
            <v-col class="py-0" cols=12 md=6>
              <v-btn color="mt-3 amber darken-2" @click="addProductToCart(product , quantity)">افزودن به جعبه &nbsp;&nbsp; <v-icon>mdi-cart-outline</v-icon> </v-btn>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: [
      "product" ,
      "addDialog"
    ]
    ,
    data: () => ({
      quantity : 1 ,
      maxWidth : 0 ,
      rule : [
        v => !!v || "" ,
        v => v > 0 || "" ,
      ]
    }),
    methods: {
      addProductToCart (product , quantity) {
        if(this.$refs.form.validate()) {
          this.$store.dispatch("addProductToCart" , {product : product , quantity : quantity})
          this.onAddDialog()
          this.$store.commit('navigationOn')
        }
      }
    },
    methods: {
      onAddDialog() {
        this.$emit('on-add-dialog')
      }
    }, 
    mounted () {
      let maxWidth = window.innerWidth
      this.maxWidth = maxWidth
    },
  }
</script>

<style scoped>

</style>