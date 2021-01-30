<template>
    <v-container fluid>
        <parallax />
        <v-row>
            <side-bar />
            <v-col class="pt-0" lg="10" md=9 sm="12" id="dum">
                <v-row>
                    <v-col class="pt-0" xs="12" sm="6" lg=4 v-for="product in products" :key="product._id">
                        <card :product="product" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import parallax from "~/components/parallax"
import card from "~/components/card"
import sideBar from "~/components/side-bar"
    export default {
        components : {
            parallax ,
            card ,
            sideBar
        } ,
        async asyncData({$axios}) {
            try {
                let response = await $axios.$get("/api/products")
                return {
                products : response.products
                }
            } catch (error) {
                
            }
    } ,
    }
</script>

<style scoped>
#dum {
    background: url("../static/footer-bg.jpg") no-repeat center center ;
    background-size: cover;
    width: 100%;
    height: 100%;
    /* position: absolute; */
}
</style>
