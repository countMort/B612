<template>
    <v-row>
        <v-col cols=12 sm=7 class="py-0">
            <v-card
            :loading="loading"
            class="full-width text-center"
            tile
            >
            <v-img
                max-height="30rem"
                :src="product.photo"
                class="align-end"
            >
                <v-card-title style="background-color: rgba(0, 0, 0, 0.345);" class="justify-center py-0">
                    <nuxt-link :to="`/products/${$route.params.id}`">
                        {{product.name}}
                    </nuxt-link>
                </v-card-title>
                <v-card-text class="py-0" style="background-color: rgba(0, 0, 0, 0.345);">
                    <v-row class="justify-center mx-0">
                    <v-rating
                        :value="parseInt(product.averageRating)"
                        color="amber"
                        half-increments
                        dense
                        size="14"
                        readonly
                    ></v-rating>

                    <div class="grey--text ml-4">{{parseInt(product.averageRating)}} ({{product.reviews.length}} رأی)</div>
                    </v-row>

                    <div class="pb-2 subtitle-1">
                        {{product.price}} تومان• , {{product.category.name}}
                    </div>

                    <div v-if="product.description">{{product.description}}</div>
                </v-card-text>
            </v-img>
            </v-card>
        </v-col>
        <v-col cols=12 sm=5 class="py-0">
            <v-form ref="form">
                <v-card
                flat
                tile
                class="full-width"
                >
                    <v-card-title class="py-1">
                        <v-icon class="ml-2">
                            mdi-comment
                        </v-icon>
                        نظر {{$store.state.auth.user.name}}
                    </v-card-title>
                    <v-card-text>
                        <v-row class="justify-center mx-0 my-1">
                            <v-chip label class="my-auto">
                                <v-icon left>$ratingFull</v-icon> امتیاز کلی
                            </v-chip>
                            <v-rating
                            v-model="rating"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            half-increments
                            hover
                            ></v-rating>
                            <v-text-field class="d-none" :rules="notEmpty" readonly v-model="fromRating"></v-text-field>
                        </v-row>
                        <v-text-field counter="20" :rules="notEmpty" append-icon="mdi-comment" outlined label="نظر کلی" v-model="headline"></v-text-field>
                        <v-textarea
                        rows="4"
                        auto-grow
                        counter="150"
                        :rules="limitedBody"
                        color="info"
                        label="لطفا در صورت تمایل توضیح دهید"
                        outlined
                        append-icon="mdi-comment"
                        v-model="body">
                        </v-textarea>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn class="px-5" color="success" @click="submit">ارسال نظر</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>s

<script>
import { EventBus } from "@/utils/event-bus" 
export default {
    middleware : 'auth' ,
    auth : 'user' ,
    async asyncData({$axios , params}) {
        try {
            let product = await $axios.$get(`/api/products/${params.id}`)
            return {
                product : product.product ,
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    data: () => ({
        loading: false,
        selection: 1,
        rating : null ,
        body: "" ,
        headline : "" ,
        notEmpty : [
            v => !!v || "نمی تواند خالی باشد" ,
            v => (v|| "").length <= 20
        ] ,
        limitedBody : [
            v => v.length <= 150
        ]
    }),
    methods: {
        async submit() {
            try {
                // let data = new FormData() ;
                // data.append("headline" , this.headline)
                // data.append("body" , this.body)
                // data.append("rating" , this.rating)
                this.loading = true
                if(this.$refs.form.validate()){
                    let data = {
                        headline : this.headline ,
                        body : this.body.trim() ,
                        rating : this.rating
                    }

                    let response = await this.$axios.$post(`/api/reviews/${this.$route.params.id}` , data)
                    if(response.success){
                        this.$nuxt.$router.push(`/products/${this.$route.params.id}`)
                        EventBus.$emit("setSnack" , {
                            text: response.message ,
                            color: "green"
                        })
                    }
                }
                this.loading = false
            } catch (error) {
                this.loading = false
                this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                error.response && EventBus.$emit("setSnack" , {
                    text: error.response.data.message ,
                    color: "red"
                })
                console.log(error);
            }
        }
    },
    computed: {
        fromRating() {
            return JSON.stringify(this.rating)
        }
    },

}
</script>

<style scoped>

</style>