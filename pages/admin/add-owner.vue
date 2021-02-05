<template>
    <div>
        <v-container fluid class="mt-2 mb-10">
            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                align='center'
                >
                <v-main>
                    اضافه کردن فروشنده
                </v-main>
                </v-card-title>

                <v-card-text class=" mt-5 px-md-10">
                        <v-form ref="form" class="px-md-10 mx-10">
                            <v-row justify="center">
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="نام"
                                    textarea
                                    v-model="name"
                                    ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="تلفن"
                                    type="number"
                                    v-model="phone"
                                    ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="توضیحات"
                                    textarea
                                    v-model="description"
                                    ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="آدرس عکس"
                                    textarea
                                    v-model="photo"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" class="text-center">
                                    <v-btn @click="onAddowner">
                                        ثبت
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
            <v-card
            class="mx-auto mt-10"
            max-width="400"
            tile
            >
                <v-list>
                    <v-subheader>
                        انواع فروشنده های ثبت شده
                    </v-subheader>
                    <v-list-item-group color="primary" three-line>
                        <v-list-item v-for="owner in owners" :key="owner._id" dense>
                                <v-list-item-avatar>
                                    <img :src="owner.photo">
                                </v-list-item-avatar>
                            <v-list-item-content>
                            <v-list-item-title>{{owner.name}}</v-list-item-title>
                            <v-list-item-subtitle>
                                {{owner.description}}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                {{owner.phone}}
                            </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        async asyncData({$axios}) {
            try {
                let response = await $axios.$get("/api/owners")
                return {
                    owners : response.owners
                }
            } catch (error) {
                console.log(error);
            }
        } ,
        data() {
            return {

                name: "" ,
                description : "" ,
                photo : "" ,
                phone : null
            }
        } ,
        methods : {
            async onAddowner() {
                try {
                    let data = {
                        name : this.name ,
                        photo : this.photo ,
                        phone : this.phone ,
                        description : this.description
                    } ;
                    let result = await this.$axios.$post("/api/owners" , data)
                    if(result.success) {
                        this.owners.push(data)
                    }
                } catch (error) {
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