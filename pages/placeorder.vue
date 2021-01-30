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
                                <v-flex class="font-weight-bold">آدرس ارسال&nbsp;<v-btn text color="primary">تغییر</v-btn></v-flex>
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
                                <v-flex class="font-weight-bold">روش پرداخت&nbsp;<v-btn  disabled text color="primary">تغییر</v-btn></v-flex>
                                <v-divider></v-divider>
                                <v-radio-group dense v-model="paymentMethod">
                                    <v-radio
                                        label="حضوری (نقدی-کارت)"
                                        :value="1"
                                    ></v-radio>
                                    <v-radio
                                        label="اعتبار حساب"
                                        :value="2"
                                        disabled
                                    ></v-radio>
                                </v-radio-group> 
                                <v-divider class="mt-1"></v-divider>
                                <v-flex class="font-weight-bold">آدرس محل پرداخت&nbsp;<v-btn disabled text color="primary">تغییر</v-btn></v-flex>
                                همان آدرس ارسال
                            </v-col>
                            <v-col cols=12 sm=6 md=4 class="mx-auto">
                                <v-text-field
                                    name="کد تخفیف"
                                    label="کد تخفیف"
                                    outlined
                                    class="mt-2 indigo--text"
                                    dense
                                ></v-text-field>
                                <!-- در صورت وجود کد تخفیف -->
                                <v-flex v-if="off" class="font-weight-bold success--text">
                                    <v-icon>mdi-currency-usd-off</v-icon>&nbsp;مبلغ کسر شده
                                </v-flex>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card outlined class="mt-1">
                    <v-row>
                        <v-col cols=12 sm=6 class="pt-0 mt-0">
                            <v-card-title id="card-title" class="pt-1 pb-0 mt-0">
                                تخمین زمان دریافت:&nbsp;<v-flex id="estimatedDelivery">{{estimatedDelivery}}</v-flex>
                            </v-card-title>
                            <v-divider class="mt-1"></v-divider>
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
                                    <!-- <v-textarea shaped outlined dense rows=1 class="ml-6" auto-grow readonly :value="product.body"></v-textarea> -->
                                </v-banner>
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
                    <v-card-title>
                        <v-btn @click="$store.state.auth.user.address ? overlay = true : ''" color="success" width=100%><v-icon>mdi-truck-delivery-outline</v-icon>&nbsp;تایید و ثبت</v-btn>
                    </v-card-title>
                    <v-flex class="pr-2">خلاصه سفارش:</v-flex>
                    <v-divider class="mt-1"></v-divider>
                    <v-card-text class="black--text">
                        تعداد شیرینی ها: {{getCartLength}}
                        <br>
                        هزینه ارسال: {{shippingPrice}} تومان
                        <br>
                        قیمت محصولات: {{getCartTotalPrice}} تومان
                        <br>
                        قیمت نهایی: {{getCartTotalPriceWithShipping}} تومان
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-overlay :value="overlay">
            <v-card
                class="mx-auto"
                tile
                align=center
                :max-width="maxWidth*0.98"
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
                    <v-list style="opacity: 70%;">
                        <v-list-item
                            color="rgba(0, 0, 0, .4)"
                            dark
                            three-line
                        >
                            <v-list-item-content>
                                <hr>
                                <v-list-item-title class="success py-8">
                                    بسته شما <br>
                                    <span v-for="product in getCart" :key="product.id">
                                        <v-avatar size=40>
                                        <v-img :src="product.photo">
                                        </v-img>
                                        </v-avatar>
                                        {{product.quantity}}
                                    </span>
                                    <br>
                                    در روز
                                    <v-divider class="my-1 success" />
                                    {{estimatedDelivery}}
                                    <v-divider class="my-1 success" />
                                    خواهد رسید.
                                </v-list-item-title>
                                <br>
                                <v-list-item-subtitle class="my-5">از صحت اطلاعات ارسال مطمئن هستید؟</v-list-item-subtitle>
                                <!-- <v-list-item-title class="font-weight-bold">قیمت هر یک عدد: {{product.price}}  تومان</v-list-item-title> -->
                                <hr class="my-1">
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-btn min-width="50%" @click="submit" color="success" class="mx-auto my-2"><v-icon>mdi-truck-delivery-outline</v-icon>&nbsp;تایید و ارسال</v-btn>
                </v-img>
            </v-card>
        </v-overlay>
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
                paymentMethod: 1 ,
                deliveryMethod : "normal" ,
                off : null ,
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
                        this.$nuxt.$router.push("/home")
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