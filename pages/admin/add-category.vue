<template>
    <div>
        <v-container fluid class="mt-2 mb-10">
            <v-card :loading="loading">
                <v-card-title
                class="title justify-center"
                >
                    اضافه کردن دسته‌بندی محصول
                </v-card-title>

                <v-card-text class=" mt-5 px-md-10">
                        <v-form ref="form" class="px-md-10 mx-10">
                            <v-row justify="center">
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    dense
                                    outlined
                                    hide-details
                                    label="نوع"
                                    textarea
                                    v-model="name"
                                ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    dense
                                    outlined
                                    hide-details
                                    label="آدرس عکس"
                                    textarea
                                    v-model="photo"
                                ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="justify-space-around">
                                <v-btn :loading="loading" class="success" @click="onAddCategory">
                                    ثبت
                                </v-btn>
                                <v-btn @click="clear">
                                    پاک کردن
                                </v-btn>
                            </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
            <v-card
            class="mx-auto mt-10"
            max-width="400"
            tile
            >
                <v-list>
                    <v-subheader>
                        انواع دسته‌بندی‌های ثبت شده
                    </v-subheader>
                    <v-list-item v-for="category in categories" :key="category._id" dense>
                            <v-list-item-avatar>
                                <img :src="category.photo">
                            </v-list-item-avatar>
                        <v-list-item-content>
                        <v-list-item-title>{{category.name}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        async asyncData({$axios}) {
            try {
                let response = await $axios.$get("/api/categories")
                return {
                    categories : response.categories
                }
            } catch (error) {
                console.log(error);
            }
        } ,
        data() {
            return {
                name: "" ,
                photo : "" ,
                loading: false ,
            }
        } ,
        methods : {
            async onAddCategory() {
                try {
                    this.loading = true
                    let data = {
                        name : this.name ,
                        photo : this.photo ,
                    } ;
                    let result = await this.$axios.$post("/api/categories" , data)
                    this.loading = false
                    if(result.success) {
                        this.categories.push(data)
                    }
                } catch (error) {
                    this.loading = false
                    console.log(error);
                }
            } ,
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style scoped>
.select {
    width: 100%;
    border: black 1px solid;
    border-radius: 30%;
}
</style>