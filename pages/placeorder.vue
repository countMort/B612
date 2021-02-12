<template>
    <v-container fluid>
        <v-row>
            <v-col cols=12 sm=8 md=9>
                <v-card outlined>
                    <v-card-title>
                        مشاهده سفارش
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols=12 sm=6 md=4>
                                <div class="font-weight-bold">آدرس ارسال&nbsp;<v-btn nuxt to="/address" text color="primary">تغییر</v-btn></div>
                                <v-divider></v-divider>
                                <template v-if="!$store.state.auth.user.address">
                                    <v-btn nuxt to="/address" color=red text>لطفا آدرس خود را ثبت کنید.</v-btn>
                                </template>
                                <template v-if="$store.state.auth.user.address">
                                    {{$store.state.auth.user.address.fullName}}
                                    <br>
                                    {{$store.state.auth.user.address.city}}
                                    <br>
                                    {{$store.state.auth.user.address.streetAddress}}
                                    <br>
                                    تلفن:&nbsp;{{$store.state.auth.user.address.phoneNumber}}
                                </template>
                            </v-col>
                            <v-col cols=12 sm=6 md=4>
                                <div class="font-weight-bold">روش پرداخت&nbsp;<v-btn  disabled text color="primary">تغییر</v-btn></div>
                                <v-divider></v-divider>
                                <v-radio-group dense v-model="paymentMethod">
                                    <v-radio
                                        label="حضوری (نقدی-کارت)"
                                        :value="1"
                                        disabled
                                    ></v-radio>
                                    <v-radio
                                        label="اعتباری"
                                        :value="2"
                                    ></v-radio>
                                </v-radio-group> 
                                <v-divider class="mt-1"></v-divider>
                                <div class="font-weight-bold">آدرس محل پرداخت&nbsp;<v-btn disabled text color="primary">تغییر</v-btn></div>
                                همان آدرس ارسال
                            </v-col>
                            <v-col v-if="off" cols=12 sm=6 md=4 class="mx-auto">
                                <v-text-field
                                    name="کد تخفیف"
                                    label="کد تخفیف"
                                    outlined
                                    class="mt-2 indigo--text"
                                    dense
                                ></v-text-field>
                                <!-- در صورت وجود کد تخفیف -->
                                <div class="font-weight-bold success--text">
                                    <v-icon>mdi-currency-usd-off</v-icon>&nbsp;مبلغ کسر شده
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card outlined class="mt-1">
                    <v-row>
                        <v-col cols=12 sm=6 class="pt-0 mt-0">
                            <v-card-title id="card-title" class="pt-1 pb-0 mt-0">
                                تخمین زمان دریافت:&nbsp;<div id="estimatedDelivery">{{estimatedDelivery}}</div>
                            </v-card-title>
                            <v-divider class="mt-1"></v-divider>
                            <v-card-text>
                                <v-list>
                                    <v-list-item v-for="product in getCart" :key="product.id" :value="true">
                                        <v-list-item-avatar
                                        size="60"
                                        >
                                        <v-img :src="product.photo">
                                        </v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <nuxt-link :to="`/products/${product._id}`" class="font-weight-bold links">&nbsp;{{product.name}}</nuxt-link>
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                تعداد سفارش:&nbsp;{{product.quantity}}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <!-- <v-textarea shaped outlined dense rows=1 class="ml-6" auto-grow readonly :value="product.body"></v-textarea> -->
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-col>
                        <v-col cols=12 sm=6>
                            <label for="delivery">نوع ارسال:</label>
                            <v-divider class="mt-1"></v-divider>
                            <v-radio-group @change="onChooseShipping" class="mt-0 pt-2" id="delivery" dense v-model="deliveryMethod">
                                <v-radio
                                    label="معمولی"
                                    value="normal"
                                ></v-radio>
                                <v-radio
                                    label="ویژه"
                                    value="fast"
                                    disabled
                                ></v-radio>
                            </v-radio-group> 
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols=12 sm=4 md=3>
                <v-card outlined>
                    <v-card-actions>
                        <v-btn block @click="$auth.user.address ? submit() : ''" color="success"><v-icon>mdi-truck-delivery-outline</v-icon>&nbsp;تایید و ثبت</v-btn>
                    </v-card-actions>
                    <v-card-title class="py-1">
                        خلاصه سفارش:
                    </v-card-title>
                    <v-card-text>
                        تعداد محصولات: {{getCartLength}}
                        <br>
                        هزینه ارسال: {{shippingPrice}} تومان
                        <br>
                        قیمت محصولات: {{getCartTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} تومان
                        <br>
                        قیمت نهایی: {{getCartTotalPriceWithShipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} تومان
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"
    export default {
        middleware : 'auth' ,
        auth : 'user' ,
        async asyncData({$axios , store}) {
            try {
                let response = await $axios.$post('/api/shipment' , {shipment : "normal"})
                return {
                    shippingPrice : response.shipment.price ,
                    estimatedDelivery : response.shipment.estimated ,
                    createdTime : response.shipment.createdTime ,
                }
            } catch (error) {
                console.log(error);
            }
        } ,
        data() {
            return {
                paymentMethod: 2 ,
                deliveryMethod : "normal" ,
                off : false ,
                overlay : false ,
                loading : false ,
                maxWidth : 0 ,
            }
        },
        computed: {
            ...mapGetters(["getCart" ,"getCartTotalPrice","getCartLength","getCartTotalPriceWithShipping","getEstimatedDelivery"]) ,
            deliverTo () {
                if(this.$auth.user.address){
                    return this.$auth.user.address._id
                }
            }
        },
        methods: {
            async onChooseShipping(shipment) {
                // not working yet
                try {
                    let response = await this.$axios.$post('/api/shipment' , {shipment : shipment})
                    this.$store.commit('setShipping' , { price : response.shipment.price , estimatedDelivery : response.shipment.estimated ,createdTime : response.shipment.createdTime , deliverTo : this.$auth.user.address._id })
                    this.shippingPrice = response.shipment.price ,
                    this.estimatedDelivery = response.shipment.estimated
                    this.createdTime = response.shipment.createdTime
                    this.deliverTo = this.$auth.user.address._id
                } catch (error) {
                    console.log(error);
                }
            } ,
            async submit() {
                try {
                    this.loading = true ;
                    let response =  await this.$axios.$post("/api/payment" , {
                        totalPrice : this.getCartTotalPriceWithShipping ,
                        cart : this.getCart ,
                        estimatedDelivery : this.getEstimatedDelivery ,
                        createdTime : this.createdTime ,
                        deliverTo : this.$store.state.auth.user.address._id
                    })
                    if (response.success) {
                        this.loading = false
                        this.$nuxt.$router.push("/orders")
                        this.$store.commit("clearCart")
                        this.$store.dispatch('notif' , {msg : response.message , type : 'success'})
                    }
                } catch (error) {
                    this.loading = false
                    console.log(error);
                    this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                }
            }
        }, mounted () {
            let maxWidth = window.innerWidth
            this.maxWidth = maxWidth
            if (this.$auth.$state.user.address) {
                this.$store.commit('setShipping' , { price : this.shippingPrice , estimatedDelivery : this.estimatedDelivery , createdTime : this.createdTime ,deliverTo : this.$auth.user.address._id})
            }
        },
    }
</script>

<style scoped>
.links {
    text-decoration: none;
}
#card-title {
    font-size: 1rem;
}
#estimatedDelivery {
    font-size: 0.95rem;
}
</style>