<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                سفارشات شما
            </v-card-title>
            <v-card-text>
                <v-card outlined v-for="order in orders" :key="order._id">
                    <v-card-text class="font-weight-bold">
                        <v-row class="px-1 text-center">
                            <v-col cols=7 md=2 lg=2>
                                زمان ثبت سفارش <br>
                                {{order.createdTime}}
                            </v-col>
                            <v-col cols=5 md=2 lg=2>
                                قیمت کل <br>
                                {{order.totalPrice}} تومان
                            </v-col>
                            <v-col cols=12 sm=4 md=2 lg=2>
                                ارسال به <br>
                                <v-btn nuxt to="/address" text color="blue accent-3">{{order.deliverTo.fullName}} <br> {{order.deliverTo.streetAddress}}</v-btn>
                            </v-col>
                            <v-col cols=12 sm=8 md=6 lg=6>
                                یه سری رندوم شت درباره سفارش <br>
                                Order Details || invoice
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-card outlined class="mt-1">
                                <v-card-title id="card-title" class="pt-1 pb-0 mt-0">
                                    تخمین زمان دریافت:&nbsp;<v-flex id="estimatedDelivery">{{order.estimatedDelivery}}</v-flex>
                                </v-card-title>
                                <v-divider class="mt-1"></v-divider>
                                <v-card-text>
                                    <v-banner v-for="product in order.products" :key="product.productID" :value="true">
                                        <nuxt-link :to="`/products/${product.productID}`" class="indigo--text font-weight-bold links">&nbsp;{{product.title}}</nuxt-link>
                                        <v-chip outlined color="none">
                                            تعداد سفارش:&nbsp;{{product.quantity}}
                                        </v-chip>
                                        <!-- <v-textarea shaped outlined dense rows=1 class="ml-6" auto-grow readonly :value="product.body"></v-textarea> -->
                                    </v-banner>
                                </v-card-text>
                            </v-card>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        async asyncData({$axios}) {
            try {
                let response = await $axios.$get("/api/orders")
                if(response.success) {
                    let orders = response.orders.reverse()
                    return {
                        orders
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
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