<template>
            <v-col lg=2 cols=3 class="hidden-sm-and-down text-center" z-index='2'>
                <v-sheet class="overflow-y-auto" max-height="900">
                    <v-card v-for="product in watched" :key="product._id" :value="true">
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
                    <template v-if="!watched.length">
                        <v-card class="mb-1" v-for="(product , i) in 8" :key="i">
                            <v-img
                            src="https://irancook.ir/wp-content/uploads/2013/03/%D8%B7%D8%B1%D8%B2-%D8%AA%D9%87%DB%8C%D9%87-%D8%B4%DB%8C%D8%B1%DB%8C%D9%86%DB%8C-%DA%AF%D9%84-%D9%85%D8%AD%D9%85%D8%AF%DB%8C.jpg"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                            <v-card-title class="justify-center" style="font-size: 0.8rem ;">شیرینی دانمارکی کوکاریوم</v-card-title>
                            <v-rating
                            class="pl-10"
                            :value="4.3"
                            color="amber"
                            half-increments
                            dense
                            size="10"
                            readonly
                            ></v-rating>
                            </v-img>
                        </v-card>
                    </template>
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
        computed: {
            ...mapGetters(["getCartWatched"]) ,
            watched() {
                let watched = this.getCartWatched.slice(0,6)
                return watched
            }
        },
    }
</script>

<style scoped>

</style>