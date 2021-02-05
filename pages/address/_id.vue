<template>
    <v-container fluid>
        <v-form ref="form">
            <v-card light :loading=loading class="full-width mx-auto" max-width="400">
                <v-card-title class="justify-center">
                        به روز رسانی آدرس
                </v-card-title>
                <v-card-text>
                    <v-text-field dense label="نام کامل" outlined v-model="address.fullName" />
                    <v-select dense label="استان" outlined v-model="address.state"  :items=states />
                    <v-select dense  outlined v-model="address.city" label="شهر" :items=cities />
                    <v-text-field dense label="آدرس کافی" outlined v-model="address.streetAddress" />
                    <!-- <v-text-field dense label="پلاک - واحد - زنگ" outlined v-model="address.streetAddress2" /> -->
                    <v-text-field dense label="کد پستی" persistent-hint hint="اختیاری" outlined type="number" v-model="address.zipCode" />
                    <v-text-field dense label="تلفن" type="number" outlined v-model="address.phoneNumber" />
                    <v-divider class="mb-4"></v-divider>
                    <v-expansion-panels flat popout hover tile>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                آیا ما اطلاعات بیشتری برای یافتن این آدرس نیاز داریم؟
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-textarea v-model="address.deliverInstructions" dense outlined label="افزودن توضیحات ارسال" />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
                <v-card-actions>
                    <v-row justify=space-around>
                        <v-btn :loading="loading" @click="submit" dark class="success px-7 mb-2">
                            به روز رسانی آدرس
                        </v-btn>
                        <v-btn @click="clear">
                            پاک کردن فرم
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        async asyncData({$axios, params}) {
            try {
                let response = await $axios.$get(`/api/addresses/${params.id}`)
                return {
                    address : response.address
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        } ,
        data() {
            return {
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
                        let data = this.address
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
</style>