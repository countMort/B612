<template>
    <v-row>
        <v-col cols=12 md=7 lg=7 class="py-0">
            <v-card
            :loading="loading"
            class="mt-5 full-width"
            align=center
            >
            <v-img
                max-width="30rem"
                max-height="30rem"
                :src="product.photo"
            ></v-img>

            <v-card-title class="justify-center">{{product.title}}</v-card-title>
            <v-card-text>
                <v-row class="justify-center">
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

                <div class="my-4 subtitle-1 black--text">
                {{product.price}} تومان• {{product.owner.name}}, {{product.category.name}}
                </div>

                <div>{{product.description}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            </v-card>
        </v-col>
        <v-col cols=12 md=5 lg=5 class="py-0">
            <v-form ref="form">
            <v-card
            color="grey lighten-4"
            flat
            height="200px"
            tile
            class="mt-5 full-width ml-2"
            >
                <v-toolbar class="mr-0 pr-0" flat short>
                <!-- <v-app-bar-nav-icon class="mr-n4 pr-0" @click="collapse = !collapse"></v-app-bar-nav-icon> -->
                <v-icon class="ml-2">
                    mdi-comment
                </v-icon>
                <v-toolbar-title>نظر {{$store.state.auth.user.name}}</v-toolbar-title>

                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                <v-icon>mdi-comment</v-icon>
                </v-btn> -->

                <!-- <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn> -->

                <!-- <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                </v-toolbar>
                <hr>
                <br>
                <v-row class="justify-center">
                    <v-chip label>
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
                <hr>
                <br>
                <v-text-field counter="20" :rules="notEmpty" append-icon="mdi-comment" outlined label="نظر کلی" v-model="headline"></v-text-field>
                <v-textarea counter="150" :rules="limitedBody" color="info" label="لطفا در صورت تمایل توضیح دهید" outlined append-icon="mdi-comment" v-model="body">

                </v-textarea>
                <v-card-actions>
                    <v-btn color="success" @click="submit">ارسال نظر</v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>s

<script>
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
                    body : this.body ,
                    rating : this.rating
                    }

                    let response = await this.$axios.$post(`/api/reviews/${this.$route.params.id}` , data)
                    if(response.success){
                        this.$nuxt.$router.push(`/products/${this.$route.params.id}`)
                        this.$store.dispatch('notif' , {msg : response.message , type : 'success'})
                    }
                }
            } catch (error) {
                this.loading = false
                this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                console.log(error.response.data.message);
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