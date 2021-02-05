<template>
    <div>
        <v-container fluid class="mt-2 mb-10">
            <v-card>
                <v-card-title
                class="title justify-center"
                >
                    به روز رسانی {{product.name}}
                </v-card-title>
                <v-card-text class=" mt-5">
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
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="تیتر"
                                    textarea
                                    v-model="name"
                                    :placeholder="product.name"
                                ></v-text-field>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="قیمت"
                                    type="number"
                                    v-model="price"
                                    :placeholder="product.price.toString()"
                                >
                                </v-text-field>
                                </v-col>
                                <v-col cols=12>
                                    <v-list dense>
                                        <v-list-item-group>
                                            <v-list-item inactive>
                                                <v-list-item-avatar>
                                                    <img :src="photo" alt="">
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-text-field
                                                    label="آدرس عکس"
                                                    textarea
                                                    v-model="photo"
                                                >
                                                </v-text-field>
                                                <v-list-item-subtitle>
                                                    {{product.photo}}
                                                </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-col>
                                <v-col lg="6" cols="12">
                                    <v-text-field
                                    label="تعداد موجود"
                                    type="number"
                                    v-model="stockQuantity"
                                    :placeholder="product.stockQuantity.toString()"
                                ></v-text-field>
                                </v-col>
                                <v-col lg=6 cols=12>
                                    <v-textarea label="توضیحات" v-model="description" :placeholder="product.description">
                                        
                                    </v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" class="text-center">
                                    <v-btn @click="onUpdateProduct">
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
        async asyncData({$axios , params}) {
            try {
                let categories = $axios.$get("/api/categories")
                let owners = $axios.$get("/api/owners")
                let product = $axios.$get(`/api/products/${params.id}`)
                const [catResponse , ownerResponse , productResponse] = await Promise.all([
                    categories ,
                    owners ,
                    product
                ])
                return {
                    categories : catResponse.categories ,
                    owners : ownerResponse.owners ,
                    product : productResponse.product
                }
            } catch (error) {
                console.log(error);
            }
        } ,
        data() {
            return {
                categoryID: null ,
                name: "" ,
                price: null ,
                description : "" ,
                photo : "" ,
                stockQuantity : null
            }
        } ,
        methods : {
            async onUpdateProduct() {
                let data = {
                    name : this.name ,
                    price : this.price ,
                    description : this.description ,
                    stockQuantity : this.stockQuantity ,
                    photo : this.photo ,
                    categoryID : this.categoryID ,
                    ownerID : this.ownerID
                } ;
                // let data = new FormData()
                // data.append("title" , this.title)
                // data.append("price" , this.price)
                // data.append("description" , this.description)
                // data.append("ownerID" , this.ownerID)
                // data.append("categoryID" , this.categoryID)
                // data.append("photo" , this.photo)
                // data.append("stockQuantity" , this.stockQuantity)

                let result = await this.$axios.$put(`/api/products/${this.$route.params.id}` , data)
                this.$router.push("/")
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