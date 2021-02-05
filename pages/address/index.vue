<template>
    <v-container fluid>
        <v-row justify=space-around>
            آدرس های شما
            <v-btn nuxt to="/address/add" text outlined>
                افزودن آدرس
            </v-btn>
        </v-row>
        <v-row justify=space-around class="text-center">
            <v-col v-if="$store.state.auth.user.address" cols=12 sm=6 md=6 lg=4>
                <v-card :loading=loading outlined>
                    <v-card-title class="justify-center">
                            آدرس پیش فرض
                    </v-card-title>
                    <v-card-text>
                            {{$store.state.auth.user.address.fullName}}
                            <br>
                            {{$store.state.auth.user.address.state}}
                            <br>
                            {{$store.state.auth.user.address.city}}
                            <br>
                            {{$store.state.auth.user.address.streetAddress}}
                            <br>
                            <span v-if="$store.state.auth.user.address.zipCode">
                                کدپستی: {{$store.state.auth.user.address.zipCode}}
                                <br>
                            </span>
                            <span v-if="$store.state.auth.user.address.deilveryIstructions">
                                <hr>
                                {{$store.state.auth.user.address.deilveryIstructions}}
                            </span>
                                تلفن:&nbsp;0{{$store.state.auth.user.address.phoneNumber}}
                            <span v-if="$store.state.auth.user.address.deliverInstructions">
                                <hr>
                                توضیحات:&nbsp;{{$store.state.auth.user.address.deliverInstructions}}
                            </span>
                        <hr>
                        <v-btn disabled text> <v-icon>mdi-home</v-icon> &nbsp;آدرس پیش فرض</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-for="(address,index) in addresses" :key="address._id" cols=12 sm=6 md=6 lg=4>
                <v-card :loading=loading>
                    <v-card-text>
                        <!-- <ul style="list-style-type:none;">
                            <li>
                                {{address.fullName}}
                            </li>
                            <li>
                                {{address.state}}
                            </li>
                            <li>
                                {{address.city}}
                            </li>
                            <li>
                                {{address.streetAddress}}
                            </li>
                            <li v-if="address.zipCode">
                                کدپستی: {{address.zipCode}}
                            </li>
                            <li v-if="address.deilveryIstructions">
                                <hr>
                                {{address.deilveryIstructions}}
                            </li>
                            <li>
                                تلفن:&nbsp;{{address.phoneNumber}}
                            </li>
                            <li v-if="address.deliverInstructions">
                                توضیحات:&nbsp;{{address.deliverInstructions}}
                            </li>
                        </ul> -->
                        {{address.fullName}}
                        <br>
                        {{address.state}}
                        <br>
                        {{address.city}}
                        <br>
                        {{address.streetAddress}}
                        <span v-if="address.zipCode">
                            <br>
                            کدپستی: {{address.zipCode}}
                        </span>
                        <br>
                        تلفن:&nbsp;0{{address.phoneNumber}}
                        <span v-if="address.deliverInstructions">
                            <hr>
                            {{address.deliverInstructions}}
                        </span>
                        <hr>
                        <v-btn :to="`/address/${address._id}`" nuxt text>ویرایش</v-btn>
                        <v-btn @click="onDeleteAddress(address._id , index)" nuxt text>حذف</v-btn>
                        <v-btn @click="onSetDefault(address._id)" nuxt text> <v-icon>mdi-home</v-icon> &nbsp;آدرس پیش فرض</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        middleware : 'auth' ,
        auth : 'user' ,
        async asyncData({$axios}) {
            try {
                let response = await $axios.$get('/api/addresses')
                if (response.success) {
                    return {
                        addresses : response.addresses
                    }
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        } ,
        data() {
            return {
                loading : false
            }
        },
        methods: {
            async onDeleteAddress(id , index) {
                try {
                    this.loading = true
                    let response = await this.$axios.$delete(`/api/addresses/${id}`) ;
                    if(response.success) {
                        this.addresses.splice(index , 1)
                        this.$store.dispatch('notif' , {msg : response.message , type : 'success'})
                        this.loading = false
                    }
                } catch (error) {
                    this.loading = false
                    this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                    console.log(error.response.data.message);
                }
            } ,
            async onSetDefault(id) {
                try {
                    this.loading = true
                    let response = await this.$axios.$put("/api/addresses/set/default" , {id : id})
                    if(response.success) {
                        let fetch = await this.$auth.fetchUser() ;
                        this.$store.dispatch('notif' , {msg : response.message , type : 'success'})
                        this.loading = false
                    }
                } catch (error) {
                    this.loading = false
                    console.log(error.response.data.message);
                    this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                }
            }
        },
    }
</script>

<style scoped>

</style>