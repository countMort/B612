<template>
    <div>
        <v-container fluid class="mt-2 mb-10">
            <v-card light max-width="500" class="mx-auto">
                <v-card-title
                class="title justify-center"
                >
                    اضافه کردن محصول
                </v-card-title>
                <v-card-text class="mt-5">
                        <v-form ref="form">
                            <v-row justify="center">
                                <v-col lg="6" cols="12">
                                    <v-select
                                    dense
                                    outlined
                                    label="دسته‌بندی"
                                    v-model="categoryID"
                                    item-text="name"
                                    item-value="_id"
                                    hide-details
                                    :rules="notEmpty"
                                    :items="categories">
                                    </v-select>
                                </v-col>
                                <!-- <v-col lg="6" sm="12">
                                    <select class="select py-1 px-10 mx-10" v-model="ownerID">
                                        <option v-for="owner in owners" :key="owner._id" :value="owner._id">{{owner.name}}</option>
                                    </select>
                                </v-col> -->
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    dense
                                    outlined
                                    hide-details
                                    :rules="notEmpty"
                                    label="تیتر"
                                    v-model="name"
                                ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    dense
                                    outlined
                                    hide-details
                                    label="قیمت"
                                    type="number"
                                    v-model="price"
                                ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    dense
                                    outlined
                                    hide-details
                                    label="آدرس عکس"
                                    v-model="photo"
                                ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    dense
                                    outlined
                                    label="تعداد موجود"
                                    type="number"
                                    v-model="stockQuantity"
                                    hide-details
                                ></v-text-field>
                                </v-col>
                                <v-col lg=6 cols=12>
                                    <v-textarea rows="2" auto-grow dense outlined label="توضیحات" v-model="description">
                                        
                                    </v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" class="text-center">
                                    <v-btn @click="onAddProduct">
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
        </v-container>
    </div>
</template>

<script>
    export default {
        async asyncData({$axios}) {
            try {
                let {categories} = await $axios.$get("/api/categories")
                // let owners = $axios.$get("/api/owners")
                // const [catResponse , ownerResponse] = await Promise.all([
                //     categories ,
                //     owners
                // ])
                return {
                    categories
                    // categories : catResponse.categories ,
                    // owners : ownerResponse.owners
                }
            } catch (error) {
                console.log(error);
            }
        } ,
        data() {
            return {
                categoryID: null ,
                ownerID: null ,
                name: "" ,
                price: 0 ,
                description : "" ,
                photo : "" ,
                stockQuantity : 1 ,
                notEmpty: [
                    v => !!v || "نمی‌تواند خالی باشد"
                ] ,
                loading : false ,
            }
        } ,
        methods : {
            async onAddProduct() {
                try {
                    if(this.$refs.form.validate()) {
                        this.loading = true
                        let data = {
                            name : this.name ,
                            price : this.price ,
                            description : this.description ,
                            stockQuantity : this.stockQuantity ,
                            photo : this.photo ,
                            categoryID : this.categoryID ,
                            // ownerID : this.ownerID
                        } ;
                        // let data = new FormData()
                        // data.append("title" , this.title)
                        // data.append("price" , this.price)
                        // data.append("description" , this.description)
                        // data.append("ownerID" , this.ownerID)
                        // data.append("categoryID" , this.categoryID)
                        // data.append("photo" , this.photo)
                        // data.append("stockQuantity" , this.stockQuantity)

                        let result = await this.$axios.$post("/api/products" , data)
                        this.loading = false
                    }
                } catch (error) {
                    console.log(error);
                    this.loading = true
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