<template>
    <v-container fluid>
        <v-row>
            <side-bar></side-bar>
            <v-col lg="10" md=9 sm="12">
                <v-card>
                    <v-card-title>
                        سبد خرید شما&nbsp;<v-chip color="indigo" outlined>قیمت نهایی:&nbsp;{{getCartTotalPrice}} تومان</v-chip>
                    </v-card-title>
                    <v-card-text>
                        <v-banner v-for="product in getCart" :key="product.id" :value="true">
                            <v-avatar
                            size="60"
                            >
                            <v-img :src="product.photo">

                            </v-img>
                            </v-avatar>
                            <nuxt-link :to="`/products/${product._id}`" class="indigo--text font-weight-bold links">&nbsp;{{product.title}}</nuxt-link>
                            <v-chip outlined color="none">
                                تعداد سفارش:&nbsp;{{product.quantity}}
                            </v-chip>
                            <v-chip outlined color="none">
                                قیمت:&nbsp;{{product.price}} تومان
                            </v-chip>
                            <v-chip outlined color="none">
                                قیمت کل:&nbsp;{{product.totalPrice}} تومان
                            </v-chip>
                            <!-- <v-textarea shaped outlined dense rows=1 class="ml-6" auto-grow readonly :value="product.body"></v-textarea> -->
                            <template v-slot:actions>
                                <v-rating
                                class="pl-10"
                                :value="Number(product.averageRating)"
                                color="amber"
                                half-increments
                                dense
                                size="15"
                                readonly
                                v-if="product.averageRating"
                                ></v-rating>
                                </template>
                                <v-row class="mt-1">
                                    <v-btn @click="$store.commit('removeProduct' , product)" text color="red accent-4"><v-icon>mdi-trash-can-outline</v-icon>&nbsp;حذف از سبد</v-btn>
                                <overlay :product="product" :change="true" />
                                </v-row>
                        </v-banner>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn nuxt to="/placeorder" outlined text color="success"><v-icon>mdi-truck-delivery-outline</v-icon>&nbsp;پرداخت و ارسال</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import overlay from "~/components/overlay"
import sideBar from "~/components/side-bar"
    export default {
        components: {
            overlay,
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