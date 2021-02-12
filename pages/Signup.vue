<template>
    <v-card max-width="500" class="mx-auto" light loader-height="2" :loading="loading">
        <v-card-title
        class="justify-center"
        >
            فرم ثبت نام
        </v-card-title>
        <v-card-text class="text-center">
            <v-form ref="form">
                <v-text-field
                    dense
                    outlined
                    v-model="phone"
                    type="number"
                    label="شماره تلفن همراه خود را وارد کنید"
                    class="mb-2"
                    hide-details
                    prepend-icon="mdi-phone"
                    :rules="phoneRules"
                    color="black"
                    dir="ltr"
                    suffix="98+"
                    @keydown.enter.prevent.stop="
                        $store.getters.getTimer < 1000 && recieveSMS()
                    "
                >
                </v-text-field>
                <v-btn text class="success mb-2" @click="recieveSMS" :disabled="$store.getters.getTimer >= 1000">
                    {{$store.getters.getTimer >= 1000 ? $store.getters.getTimer/1000 : 'دریافت پیامک تایید'}}
                </v-btn>
                <v-expansion-panels flat :value="panel">
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <v-text-field
                            dense
                            outlined
                            label="کد ییامک شده"
                            :rules="codeRules"
                            type="number"
                            v-model="otp"
                            :counter="6"
                            prepend-icon="mdi-message-reply-text"
                            ></v-text-field>
                            <v-text-field
                                dense
                                outlined
                                v-model="name"
                                label="لطفا نام خود را وارد کنید"
                                class="mt-2"
                                prepend-icon="mdi-account"
                                color="black"
                                :rules="nameRules"
                            ></v-text-field>
                            <v-text-field
                                dense
                                outlined
                                v-model="password"
                                label="رمز خود را انتخاب کنید"
                                prepend-icon="mdi-lock"
                                :rules="passRules"
                                color="black"
                                :counter="17"
                                :type="show1 ? 'text' : 'password'"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show1 = !show1"
                            ></v-text-field>
                            <v-text-field
                                dense
                                outlined
                                v-model="rePassword"
                                label="رمز خود را مجددا تایپ کنید"
                                prepend-icon="mdi-lock"
                                color="black"
                                :rules="rePassRules"
                                :type="show2 ? 'text' : 'password'"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show2 = !show2"
                            ></v-text-field>
                            <v-row>
                                <v-col cols=12 class="text-center my-0 py-0 black--text">
                                    حساب کاربری دارید؟
                                    <v-btn nuxt to="/Login" text class="blue--text">
                                    وارد شوید
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <v-btn class="success" text @click="submit" :loading="loading">
                                        ثبت نام
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
let interval;
import { EventBus } from "@/utils/event-bus"
    export default {
        middleware : 'auth' ,
        auth : 'guest' ,
        data () {
            return {
                panel: -1 ,
                smsDisabled: false ,
                name : '' ,
                phone: '' ,
                password: '',
                rePassword : '' ,
                otp: null,
                loading : false ,
                show1 : false ,
                show2 : false ,
                passRules : [
                    input => input ? input.length >= 9 || 'رمز حداقل 9 حرف باشد' : '',
                    input => (input || '').length <= 17 ||
                    `بیشترین تعداد کاراکتر های رمز 17 عدد میباشد`
                ] ,
                phoneRules : [
                    v => !!v || '',
                    v => !v || v.toString().startsWith("0") ? (v && v.toString().length === 11) : (v && v.toString().length === 10) || 'شماره تلفن همراه صحیح نیست'
                ] ,
                rePassRules : [
                    v => v===this.password || 'تکرار رمز صحیح نمی‌باشد'
                ] ,
                nameRules : [
                    v => !!v || ''
                ] ,
                codeRules: [
                    v => !!v || "لطفا کد تایید پیامکی را وارد کنید" ,
                    v => !v || v.toString().length < 7 || "کد مربوطه 6 رقمی است"
                ] ,
                terms : false ,
                interval : null ,
            }
        } ,
        mounted () {
            clearInterval(interval);
            let time;
            interval = setInterval(() => {
                time = this.$store.getters.getTimer
                this.$store.getters.getTimer >= 1000 && this.$store.commit("SET_TIMER" , time - 1000)
            }, 1000);
            if (this.$store.getters.getTimer >= 1000) this.panel = 0
        },
        methods: {
            async recieveSMS() {
                try {
                    if(this.phone.toString().startsWith("0") ? (this.phone && this.phone.toString().length === 11) : (this.phone && this.phone.toString().length === 10)) {
                        let data = {
                            phone: this.phone
                        }
                        if (this.phone.startsWith("0")) data.phone = data.phone.slice(1)
                        this.$store.commit("SET_TIMER" , 60 * 1000)
                        let result = await this.$axios.$post("/api/auth/generate-key" , data)
                        this.$store.commit("SET_HASH" , result.data.hash)
                        EventBus.$emit("setSnack" , {
                            text: result.message ,
                            color: "green"
                        })
                        this.panel = 0
                    }
                } catch (error) {
                    EventBus.$emit("setSnack" , {
                        text: error.response && error.response.data.message ,
                        color: "red"
                    })
                }
            } ,
            async submit () {
                if (this.$refs.form.validate()) {
                    try {
                        this.loading = true
                        let data = {
                            name : this.name ,
                            phone : this.phone ,
                            password : this.password ,
                            otp: this.otp ,
                            hash: this.$store.getters.getHash
                        }
                        if (this.phone.startsWith("0")) data.phone = data.phone.slice(1)
                        let response = await this.$axios.$post('/api/auth/signup' , data)
                        if(response.success) {
                            await this.$auth.loginWith("local" , {
                                data: {
                                    phone : this.phone ,
                                    password : this.password
                                }
                            })
                            // EventBus.$emit("setSnack" , {
                            //     text: response.message ,
                            //     color: "green"
                            // })
                        }
                        this.loading = false
                    } catch (error) {
                        this.loading = false
                        if(error.response.status == 500) {
                            EventBus.$emit("setSnack" , {
                                text: "خطایی رخ داده است،امکان دارد پیش از این شماره شما در سایت ثبت نام شده باشد!" ,
                                color: "red"
                            })
                        } else {
                            EventBus.$emit("setSnack" , {
                                text: error.response.data.message ,
                                color: "red"
                            })
                        }
                    }
                }
            },
            clear () {
                this.$refs.form.reset()
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>