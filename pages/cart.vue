<template>
    <v-container fluid>
        <v-row>
            <side-bar></side-bar>
            <v-col lg="10" md=9 sm="12">
                <v-card>
                    <v-card-title class="px-2 px-sm-4">
                        <div :class="$vuetify.breakpoint.xsOnly && 'subtitle-2'">
                            سبد خرید شما
                        </div>
                        <v-spacer></v-spacer>
                        <v-chip :small="$vuetify.breakpoint.xsOnly" color="success" label>قیمت نهایی:&nbsp;{{getCartTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} تومان</v-chip>
                    </v-card-title>
                    <v-card-text class="px-2 px-sm-4">
                        <v-list class="px-0">
                            <v-list-item class="px-0" v-for="product in getCart" :key="product.id">
                                <v-list-item-avatar tile size="80">
                                    <v-img :src="product.photo">
                                    </v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <nuxt-link :to="`/products/${product._id}`" class="font-weight-bold links">&nbsp;{{product.name}}</nuxt-link>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        <v-row class="mx-0 justify-space-around">
                                            <div class="mt-1">
                                                تعداد سفارش:&nbsp;{{product.quantity}}
                                            </div>
                                            <div class="mt-1">
                                                قیمت:&nbsp;{{product.price}} تومان
                                            </div>
                                        </v-row>
                                    </v-list-item-subtitle>
                                    <v-chip label small class="my-1">
                                        قیمت کل:&nbsp;{{product.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} تومان
                                    </v-chip>
                                    <v-list-item-action>
                                        <v-row class="mx-0 justify-space-around">
                                            <v-rating
                                            small
                                            :value="Number(product.averageRating)"
                                            color="amber"
                                            half-increments
                                            dense
                                            size="15"
                                            readonly
                                            v-if="product.averageRating"
                                            ></v-rating>
                                            <v-btn :small="$vuetify.breakpoint.xsOnly" outlined @click="$store.commit('removeProduct' , product)" color="red accent-4">
                                                <v-icon>mdi-trash-can-outline</v-icon>
                                                &nbsp;حذف از سبد
                                            </v-btn>
                                        </v-row>
                                    </v-list-item-action>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="px-7" nuxt to="/placeorder" color="success"><v-icon>mdi-truck-delivery-outline</v-icon>&nbsp;پرداخت و ارسال</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
// import overlay from "~/components/overlay"
import sideBar from "~/components/side-bar"
    export default {
        components: {
            // overlay,
            sideBar
        },
        computed: {
            ...mapGetters(["getCart" ,"getCartTotalPrice"])
        },
    }
</script>

<style scoped>
.links {
    text-decoration: none;
}
</style>