<template>
    <v-card max-width="500" class="mx-auto" light loader-height="2" :loading="loading">
        <v-card-title
        class="justify-center"
        >
            فرم ثبت نام
        </v-card-title>
        <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        dense
                        outlined
                        v-model="name"
                        label="لطفا نام خود را وارد کنید"
                        class="mt-2 px-md-10"
                        prepend-icon="mdi-account"
                        color="black"
                        :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                        dense
                        outlined
                        v-model="phone"
                        type="number"
                        label="شماره تلفن همراه خود را وارد کنید"
                        class="mt-2 px-md-10"
                        prepend-icon="mdi-phone"
                        :rules="phoneRules"
                        color="black"
                        dir="ltr"
                        suffix="98+"
                    >
                    </v-text-field>
                    <v-text-field
                        dense
                        outlined
                        class="px-md-10"
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
                        class="px-md-10"
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
                        <v-col cols="6" class="text-center">
                            <v-btn @click="submit" :loading="loading">
                                ثبت نام
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="text-center">
                            <v-btn @click="clear">
                                پاک کردن
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        // middleware : 'auth' ,
        // auth : 'guest' ,
        data () {
            return {
                name : '' ,
                phone: '' ,
                password: '',
                rePassword : '' ,
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
                terms : false ,
            }
        } ,
        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    try {
                        let data = {
                            name : this.name ,
                            phone : this.phone ,
                            password : this.password
                        }
                        console.log(data);
                    let response = await this.$axios.$post('/api/auth/signup' , data)
                    console.log(response);
                    if(response.success) {
                        await this.$auth.loginWith("local" , {
                            data: {
                                phone : this.phone ,
                                password : this.password
                            }
                        })
                        this.$store.dispatch('notif' , {msg : "خوش آمدید" , type : "success"})
                        location.reload()
                    }
                    } catch (error) {
                        this.loading = false
                        console.log(error.response.data.message);
                        if(error.response.status === 500) {
                            this.$store.dispatch('notif' , {msg : "خطایی رخ داده است، لطفا ایمیل های دیگر را امتحان کنید!" , type : "error"})
                        } else {
                            this.$store.dispatch('notif' , {msg : error.response.data.message , type : "error"})
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