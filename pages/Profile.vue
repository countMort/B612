<template>
    <v-container fluid class="mt-2 mb-10">
        <v-card class="mx-auto" :loading="loading" flat max-width="400" light>
            <v-card-title
            class="title justify-center"
            primary-title
            >
                ویرایش اطلاعات
            </v-card-title>
            <v-card-text class=" mt-5">
                    <v-form ref="form">
                        <v-row justify="center">
                            <v-col lg="6" cols="12">
                                <v-text-field
                                label="نام"
                                dense
                                v-model="name"
                                :placeholder="$store.state.auth.user.name"
                                outlined
                                :prepend-icon="!nameChange ? 'mdi-pen' : 'mdi-circle'"
                                @click:prepend="nameChange = !nameChange"
                                :readonly="!nameChange"
                                :rules="nameChange ? nameRules : []"
                                :hint="!nameChange ? 'در صورت تمایل برای تغییر ، لطفا روی خودکار کلیک کنید.' : 'در صورت تمایل به بازگشت از تغییرات بر روی دایره کلیک کنید'"
                            ></v-text-field>
                            </v-col>
                            <v-col lg="6" cols="12">
                                <v-text-field
                                label="تلفن"
                                type="number"
                                v-model="phone"
                                suffix="98+"
                                dir="ltr"
                                :placeholder="$store.state.auth.user.phone.toString()"
                                outlined
                                :prepend-icon="!phoneChange ? 'mdi-pen' : 'mdi-circle'"
                                @click:prepend="phoneChange = !phoneChange"
                                :readonly="!phoneChange"
                                :rules="phoneChange ? phoneRules : []"
                                :hint="!phoneChange ? 'در صورت تمایل برای تغییر ، لطفا روی خودکار کلیک کنید.' : 'در صورت تمایل به بازگشت از تغییرات بر روی دایره کلیک کنید'"
                            ></v-text-field>
                            </v-col>
                            <v-col lg="6" cols="12">
                                <v-text-field
                                label="رمز"
                                textarea
                                v-model="password"
                                outlined
                                :prepend-icon="!passChange ? 'mdi-pen' : 'mdi-circle'"
                                @click:prepend="passChange = !passChange"
                                :readonly="!passChange"
                                :rules="passChange ? passRules : []"
                                :hint="!passChange ? 'در صورت تمایل برای تغییر ، لطفا روی خودکار کلیک کنید.' : 'در صورت تمایل به بازگشت از تغییرات بر روی دایره کلیک کنید'"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-row>
                        <v-col cols="12" class="text-center">
                            <v-btn :loading="loading" class="success" @click="submit">
                                ویرایش اطلاعات
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        middleware : 'auth' ,
        auth : 'user' ,
        data() {
            return {
                name: this.$store.state.auth.user.name ,
                phone : this.$store.state.auth.user.phone ,
                password : "" ,
                loading : false ,
                nameChange : false ,
                passChange : false ,
                phoneChange : false ,
                passRules : [
                    input => input ? input.length >= 9 || 'رمز حداقل 9 حرف باشد' : '',
                    input => (input || '').length <= 17 ||
                    `بیشترین تعداد کاراکتر های رمز 17 عدد میباشد`
                ] ,
                phoneRules : [
                    v => !!v || '',
                    v => !v || v.toString().startsWith("0") ? (v && v.toString().length === 11) : (v && v.toString().length === 10) || 'شماره تلفن همراه صحیح نیست'
                ] ,
                nameRules : [
                    v => !!v || ''
                ] ,
            }
        } ,
        methods: {
            async submit() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    try {
                        let data = {
                            name : this.name ,
                            phone : this.phone ,
                            password : this.password
                        }
                    let response = await this.$axios.$put('/api/auth/user' , data)
                    // if(response.success) {
                    //     this.name = "" ;
                    //     this.phone = "" ;
                    //     this.password = "" ;
                    // }
                    await this.$auth.fetchUser() ;
                    this.loading = false
                    this.$store.dispatch('notif' , {msg : response.message , type : 'success'})
                    } catch (error) {
                        console.log(error);
                        this.loading = false
                        this.$store.dispatch('notif' , {msg : error.response.data.message , type : 'error'})
                    }
                }
            } ,
        },
        watch: {
                nameChange(nv , ov) {
                    if(!nv) {
                        this.name = this.$store.state.auth.user.name
                    }
                } ,
                phoneChange(nv , ov) {
                    if(!nv) {
                        this.phone = this.$store.state.auth.user.phone
                    }
                } ,
                passChange (newValue , ov) {
                    if(!newValue) {
                        this.password = ''
                    }
                }
            },
    }
</script>

<style scoped>
.select {
    width: 100%;
    border: black 1px solid;
    border-radius: 30%;
}
</style>