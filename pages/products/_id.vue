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
        <v-col cols=12 md=4 lg=3 class="mx-0 px-0">
            <v-card class="full-width" align=center flat>
                <v-img
                    max-width="25rem"
                    max-height="25rem"
                    :src="product.photo"
                ></v-img>
            </v-card>
        </v-col>
        <v-col cols=12 md=8 lg=5 class="mx-0 px-0">
            <v-card flat class="text-center">
                <v-card-title class="justify-center">{{product.title}}</v-card-title>
                <v-card-text>
                    <v-row class="justify-center" v-if="product.averageRating">
                    <v-rating
                        :value="Number(product.averageRating)"
                        color="amber"
                        half-increments
                        dense
                        size="14"
                        readonly
                    ></v-rating>

                    <div class="grey--text ml-4">{{product.averageRating}} ({{product.reviews.length}})</div>
                    </v-row>

                    <div class="my-4 subtitle-1 black--text">
                    {{product.price}} تومان • {{product.owner.name}} 
                    </div>

                    <div>{{product.description}}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
                <v-card-actions align=end class="justify-center" >
                    <!-- <div class="align-center ml-5">
                        <v-btn nuxt :to="'/admin/products/'+product._id" color="warning">به روز رسانی</v-btn>
                        <v-btn @click="deleteProduct" color="error">حذف</v-btn>
                    </div> -->
                    <overlay :product=product />
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols=12 lg=4>
            <v-card v-if="product.aboveMiddle" class="full-width" align=center justify=center flat>
                    <v-flex class="teal--text">
                        درصد افرادی که به این محصول بالای 3.5 از 5 داده اند
                    </v-flex>
                    <v-progress-circular
                    size="80"
                    color="teal"
                    width="13"
                    :value="product.aboveMiddle"
                    rotate="180"
                    >
                    {{product.aboveMiddle}}
                    </v-progress-circular>
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
import overlay from "~/components/overlay"
import reviewSection from "~/components/review-section"
    export default {
        components: {
        overlay,
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
            console.log(error.response.data.message);
        }
    },
    data: () => ({
        loading: false,
        selection: 1,
    }),

    methods: {
        reserve () {
            this.loading = true

            // setTimeout(() => (this.loading = false), 2000)
            },
        async deleteProduct() {
            try {
                let result = await this.$axios.$delete(`/api/products/${this.$route.params.id}`)
                result.success ? this.$nuxt.$router.push('/home') : ''
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
            href : "/home" ,
            nuxt : true
        } ,
        {
            text : this.product.owner.name
        },
        {
            text : this.product.category.type
        },
        {
            text : this.product.title
        }
        ]
        }
    },
    }
</script>