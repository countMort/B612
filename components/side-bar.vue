<template>
    <v-col lg=2 cols=3 class="hidden-sm-and-down text-center" z-index='2'>
        <v-sheet class="overflow-y-auto" max-height="900">
            <v-card class="mb-1" tile v-for="product in watched" :key="product._id">
                <v-img
                    :src="product.photo"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    >
                    <v-card-title class="justify-center" style="font-size: 0.8rem ;">{{product.title}}</v-card-title>
                    <v-rating
                    class="pl-10"
                    :value="Number(product.averageRating)"
                    color="amber"
                    half-increments
                    dense
                    size="10"
                    readonly
                    ></v-rating>
                </v-img>
                <v-card-actions class="justify-center">
                <overlay :product=product />
                <!-- <v-btn text color="deep-purple accent-4">Action</v-btn> -->
                </v-card-actions>
            </v-card>
        </v-sheet>
    </v-col>
</template>

<script>
    import {mapGetters} from 'vuex'
    import overlay from "~/components/overlay"
    export default {
        components: {
            overlay,
        },
        async asyncData() {
            let raw
            for (let index = 0; index < 8; index++) {
                raw.push = [
                    {
                        photo: "https://irancook.ir/wp-content/uploads/2013/03/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%B4%DB%8C%D8%B1%DB%8C%D9%86%DB%8C-%DA%AF%D9%84-%D9%85%D8%AD%D9%85%D8%AF%DB%8C.jpg" ,
                        name: "کبریت بلند" ,
                        product: {
                            averageRating : 4
                        }
                    }
                ]
            }
            return {
                raw
            }
        },
        computed: {
            ...mapGetters(["getCartWatched"]) ,
            watched() {
                let watchedItems = this.getCartWatched.slice(0,6)
                if (watchedItems.length > 0) {
                    return watchedItems
                } else {
                    return this.raw
                }
            }
        },
    }
</script>

<style scoped>

</style>