<template>
    <v-container fluid>
        <v-form ref="form">
            <v-card max-width="400" class="mx-auto" :loading=loading loader-height="2" light>
                <v-card-title class="justify-center title">
                    اضافه کردن آدرس جدید
                </v-card-title>
                <v-card-text>
                    <v-text-field dense label="نام کامل" outlined v-model="fullName" :rules="rule" />
                    <v-select dense label="استان" outlined v-model="state" :items=states :rules="rule" />
                    <v-select dense  outlined v-model="city" label="شهر" :items=cities :rules="rule" />
                    <v-textarea auto-grow rows="2" dense label="آدرس کافی" outlined v-model="streetAddress" :rules="rule" />
                    <!-- <v-text-field dense label="پلاک - واحد - زنگ" outlined v-model="streetAddress2" :rules="rule" /> -->
                    <v-text-field dir="ltr" dense label="کد پستی" persistent-hint hint="اختیاری" outlined type="number" v-model="zipCode" />
                    <v-text-field suffix="98+" dir="ltr" dense label="تلفن" type="number" outlined v-model="phoneNumber" :rules="phoneRules" />
                    <v-divider class="mb-4"></v-divider>
                    <v-expansion-panels flat popout hover tile>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                آیا ما اطلاعات بیشتری برای یافتن این آدرس نیاز داریم؟
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-textarea v-model="deliverInstructions" dense outlined label="افزودن توضیحات ارسال" />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
                <v-card-actions>
                    <v-row justify=space-around>
                        <v-btn :loading="loading" @click="submit" dark class="success px-7 mb-2">
                            ثبت آدرس
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
        data() {
            return {
                city : "" ,
                fullName : "" ,
                zipCode : "" ,
                state : "" ,
                phoneNumber : "" ,
                deliverInstructions : "" ,
                streetAddress : "" ,
                // streetAddress2 : "" ,
                cities : ["مشهد"] ,
                states : ["خراسان رضوی"] ,
                rule : [
                    (v) => !!v || "این فیلد نمیتواند خالی باشد"
                ] ,
                phoneRules : [
                    v => !!v || '',
                    v => !v || v.toString().startsWith("0") ? (v && v.toString().length === 11) : (v && v.toString().length === 10) || 'شماره تلفن همراه صحیح نیست'
                ] ,
                loading : false
            }
        } ,
        methods: {
            async submit() {
                try {
                    if(this.$refs.form.validate()) {
                        let data = {
                        city : this.city ,
                        fullName : this.fullName ,
                        zipCode : this.zipCode ,
                        state : this.state ,
                        phoneNumber : this.phoneNumber ,
                        deliverInstructions : this.deliverInstructions ,
                        streetAddress : this.streetAddress
                        }
                        this.loading = true
                        let response = await this.$axios.$post("/api/addresses" , data)
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