<template>
    <v-container
    :loading="loading"
    fluid
    align=center
    >
    <v-row class="mx-1 px-1">
        <v-breadcrumbs class="mx-0 px-0" :items="breadcrumbs">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                    nuxt
                    :to="item.href"
                >
                    {{ item.text.toUpperCase() }}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
    </v-row>
    <v-row>
        <v-col cols=12 md=4 lg=3 class="mx-0 px-0 py-0">
            <v-card tile class="full-width" align=center flat>
                <v-img
                    max-width="25rem"
                    max-height="25rem"
                    :src="product.photo"
                ></v-img>
            </v-card>
        </v-col>
        <v-col cols=12 md=8 lg=9 class="mx-0 px-0 py-0">
            <v-card style="height: 100%" flat tile class="text-center">
                <v-card-title class="justify-center">{{product.name}}</v-card-title>
                <v-card-text>
                    <v-row class="mx-0 mb-1 justify-center">
                        <v-rating
                            :value="Number(product.averageRating)"
                            color="amber"
                            half-increments
                            dense
                            size="14"
                            readonly
                        >
                        </v-rating>
                        <div class="grey--text">{{product.averageRating}} ({{product.reviews.length}})</div>
                    </v-row>
                    <v-list>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-list-item-title>دسته‌بندی:&nbsp;{{product.category.name}}</v-list-item-title>
                                <v-list-item-subtitle>{{product.price}}&nbsp; تومان</v-list-item-subtitle>
                                <v-list-item-subtitle v-if="product.description">{{product.description}}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-avatar class="mt-12" icon size="100">
                                <v-tooltip top>
                                    <template v-slot:activator="{on , attrs}">
                                        <v-progress-circular
                                        v-bind="attrs"
                                        v-on="on"
                                        size="80"
                                        color="teal"
                                        width="13"
                                        :value="product.aboveMiddle"
                                        rotate="180"
                                        >
                                            {{product.aboveMiddle}}%
                                        </v-progress-circular>
                                    </template>
                                    <span class="teal--text">
                                        به این محصول بالای 3.5 از 5 داده اند
                                    </span>
                                </v-tooltip>
                            </v-list-item-avatar>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
                <v-card-actions align=end class="justify-center" >
                    <!-- <div class="align-center ml-5">
                        <v-btn nuxt :to="'/admin/products/'+product._id" color="warning">به روز رسانی</v-btn>
                        <v-btn @click="deleteProduct" color="error">حذف</v-btn>
                    </div> -->
                    <v-row class="justify-space-between mx-0">
                        <v-form ref="form">
                            <v-text-field
                            :rules="rule"
                            outlined
                            hide-details
                            prepend-icon="mdi-light-switch"
                            label="تعداد سفارش"
                            type="number"
                            v-model="quantity"></v-text-field>
                        </v-form>
                        <v-btn
                        color="success"
                        class="my-sm-auto my-2 mx-auto"
                        @click="addProductToCart(product , quantity)"
                        >
                            افزودن به جعبه &nbsp;&nbsp;
                            <v-icon>mdi-cart-outline</v-icon>
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols=12 class="px-0">
            <section id="reviews">
                <review-section :productID=product._id :reviews=reviews />
            </section>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import reviewSection from "~/components/review-section"
import { EventBus } from '~/utils/event-bus'
    export default {
        components: {
            reviewSection,
        },
    async asyncData({$axios , params , store}) {
        try {
            let singleProduct = $axios.$get(`/api/products/${params.id}`)
            let manyReviews = $axios.$get(`api/reviews/${params.id}`)
            const [productResponse , reviewsResponse] = await Promise.all([
                singleProduct , manyReviews
            ])
            store.commit("cartWatchedPush" , productResponse.product)
            return {
                product : productResponse.product ,
                reviews : reviewsResponse.reviews
            }
        } catch (error) {
            console.log(error.response && error.response.data.message);
        }
    },
    data: () => ({
        loading: false,
        selection: 1,
        quantity: 0,
        rule : [
            v => !!v || "" ,
            v => v > 0 || "" ,
        ]
    }),

    methods: {
        addProductToCart (product , quantity) {
            if(this.$refs.form.validate()) {
                this.$store.dispatch("addProductToCart" , {product : product , quantity : quantity})
                EventBus.$emit("openNav")
                this.$emit('on-add-dialog')
            }
        } ,
        reserve () {
            this.loading = true

            // setTimeout(() => (this.loading = false), 2000)
            },
        async deleteProduct() {
            try {
                let result = await this.$axios.$delete(`/api/products/${this.$route.params.id}`)
                result.success ? this.$nuxt.$router.push('/') : ''
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        scrollOptions() {
            return {
                easing : "linear",
                duration : 1000 ,
                offset : 1
            }
        } ,
        breadcrumbs() {
            return [
                {
                    text : "صفحه اصلی" ,
                    href : "/" ,
                    nuxt : true
                } ,
                {
                    text : this.product.category.name
                },
                {
                    text : this.product.name
                }
            ]
        }
    },
    }
</script>