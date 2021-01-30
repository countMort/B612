<template>
    <v-container fluid>
        <v-card max-width="500" class="mx-auto" light :loader-height="2" :loading="loading">
            <v-card-title
            class="lighten-2 justify-center"
            >
                ورود
            </v-card-title>

            <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            v-model="phone"
                            label="شماره تلفن همراه خود را وارد کنید"
                            class="mt-2 px-md-10"
                            prepend-icon="mdi-phone"
                            color="black"
                            dense
                            outlined
                            type="number"
                            dir="ltr"
                            :rules="phoneRules"
                            suffix="98+"
                            >
                        </v-text-field>
                        <v-text-field
                            dense
                            outlined
                            class="px-md-10"
                            v-model="password"
                            label="رمز خود را وارد کنید"
                            prepend-icon="mdi-lock"
                            color="black"
                            :counter="17"
                            :type="show ? 'text' : 'password'"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show = !show"
                        ></v-text-field>
                        <v-row>
                            <v-col cols=12 class="text-center my-0 py-0 black--text">
                                حساب کاربری ندارید؟
                                <v-btn nuxt to="/Signup" text class="blue--text">
                                ثبت نام کنید
                                </v-btn>
                            </v-col>
                            <v-col cols="6" class="text-center">
                                <v-btn :loading="loading" @click="submit">
                                    ورود
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
    </v-container>
</template>

<script>
    export default {
        // layout : "none" ,
        middleware : 'auth' ,
        auth : 'guest' ,
        data () {
            return {
                phone: '' ,
                password: '',
                loading : false ,
                show : false ,
                phoneRules : [
                    v => !!v || '',
                    v => !v || v.toString().startsWith("0") ? (v && v.toString().length === 11) : (v && v.toString().length === 10) || 'شماره تلفن همراه صحیح نیست'
                ] ,
            }
        } ,
        methods: {
            async submit () {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    try {
                        let data = {
                            phone : this.phone ,
                            password : this.password
                        }
                        let result = await this.$auth.loginWith("local" , {
                            data: {
                                phone : this.phone ,
                                password : this.password
                            }
                        })
                    } catch (error) {
                        this.loading = false
                        console.log(error.response);
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