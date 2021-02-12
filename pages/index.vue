<template>
    <v-container fluid>
        <parallax />
        <v-row>
            <side-bar />
            <v-col class="pt-0" lg="10" md=9 sm="12">
                <v-row>
                    <v-col class="pt-0 px-1" xs="12" sm="6" lg=4 v-for="product in products" :key="product._id">
                        <card @addDialog="
                        addDialog = true
                        selected = product
                        " :product="product" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <overlay @on-add-dialog="addDialog = false" :addDialog="addDialog" :product="selected" />
    </v-container>
</template>

<script>
import parallax from "~/components/parallax"
import card from "~/components/card"
import sideBar from "~/components/side-bar"
import overlay from "@/components/overlay"
export default {
        components : {
            overlay,
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
        data() {
            return {
                selected: null ,
                addDialog : false
            }
        },
    }
</script>

<style scoped>
</style>
