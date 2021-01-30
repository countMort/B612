<template>
    <v-container fluid>
        <v-row justify=center>
            <v-col cols=9>
                <v-form ref="form">
                    <v-card :loading=loading class="full-width">
                    <v-card-title id="card-title" class="text-center">
                        <v-main>
                            به روز رسانی آدرس
                        </v-main>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field dense label="نام کامل" outlined v-model="fullName" :placeholder="singleAddress.fullName" />
                        <v-select dense label="استان" outlined v-model="state" :placeholder="singleAddress.state" :items=states />
                        <v-select dense  outlined v-model="city" label="شهر" :items=cities :placeholder="singleAddress.city" />
                        <v-text-field dense label="بلوار - خیابان - کوچه" outlined :placeholder="singleAddress.streetAddress" v-model="streetAddress1" />
                        <v-text-field dense label="پلاک - واحد - زنگ" outlined v-model="streetAddress2" />
                        <v-text-field dense label="کد پستی" persistent-hint hint="اختیاری" :placeholder="singleAddress.zipCode" outlined type="number" v-model="zipCode" />
                        <v-text-field dense label="تلفن" type="number" outlined :placeholder="singleAddress.phoneNumber.toString()" v-model="phoneNumber" />
                        <hr>
                        <br>
                        <h3 class="black--text">
                            افزودن توضیحات ارسال
                        </h3>
                        <br>
                        <v-flex>
                            آیا ما اطلاعات بیشتری برای یافتن این آدرس نیاز داریم؟
                        </v-flex>
                        <v-textarea class="pt-1" :placeholder="singleAddress.deliverInstructions" v-model="deliverInstructions" dense outlined label="اطلاعات بیشتر" />
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify=center>
                            <v-btn @click="submit" class="primary">
                                به روز رسانی آدرس
                            </v-btn>
                            <v-btn @click="clear">
                                پاک کردن فرم
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        async asyncData({$axios, params}) {
            try {
                let response = await $axios.$get(`/api/addresses/${params.id}`)
                return {
                    singleAddress : response.address
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        } ,
        data() {
            return {
                city : "" ,
                fullName : "" ,
                zipCode : "" ,
                state : "" ,
                phoneNumber : "" ,
                deliverInstructions : "" ,
                streetAddress1 : "" ,
                streetAddress2 : "" ,
                cities : ["مشهد"] ,
                states : ["خراسان رضوی"] ,
                loading : false
            }
        } ,
        methods: {
            async submit() {
                try {
                    if(this.$refs.form.validate()) {
                        this.loading = true
                        let data = {
                        city : this.city ,
                        fullName : this.fullName ,
                        zipCode : this.zipCode ,
                        state : this.state ,
                        phoneNumber : this.phoneNumber ,
                        deliverInstructions : this.deliverInstructions ,
                        streetAddress : this.streetAddress1 + " " + this.streetAddress2
                        }
                        let response = await this.$axios.$put(`/api/addresses/${this.$route.params.id}` , data)
                        if(response.success) {
                            this.$store.dispatch('notif' , {msg : response.message , type : 'success'})
                            this.loading = false
                            this.$nuxt.$router.push('/address')
                        }
                    }
                } catch (error) {
                    this.loading = false
                    this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                    console.log(error.response.data.message);
                }
                
            } ,
            clear() {
                this.$refs.form.reset() ;
            }
        },
    }
</script>

<style scoped>
#card-title {
    font-size: 18px;
}
</style>