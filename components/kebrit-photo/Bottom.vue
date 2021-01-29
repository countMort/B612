<template>
    <div>
        <v-row class="text-center justify-center subtitle-2">
            پایین جعبه
        </v-row>
        <v-row v-if="file" justify="center">
            <v-col cols="9">
                <v-card class="px-0 py-0 mx-auto" :width="backWidth" flat>
                    <img
                    ref="backImage"
                    :width="backWidth"
                    class="_background"
                    :src="require(`~/static/images/kesho-${storedType}_06.png`)">
                    <img
                    :width="frontWidth"
                    :height="frontHeight"
                    class="_upper mx-auto"
                    :style="'transform: translateX(-'+ right +'px) translateY(' + top + 'px)'"
                    ref="frontImage"
                    :src="file.path || file.url">
                </v-card>
                <v-row class="mx-10">
                    <div class="mt-10 caption text-center">
                    به صورت پیشفرض هر دو سمت کشو دارای عکس های یکسان هستند، در صورتی که برای عکس پایین، تصویر دیگری در نظر دارید 
                    <v-icon>mdi-hand-down</v-icon>
                    </div>
                    <v-btn @click="$emit('another-one')" class="mx-auto mt-1" outlined>
                        کلیک کنید
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="3" class="my-auto pl-4">
                <v-select :value="storedType" label="طرح" v-model="type" :items="types"></v-select>
                <v-slider
                v-model="frontWidth"
                :max="widthMax"
                :min="1"
                dense
                >
                    <template v-slot:label>
                        <span class="caption">
                            عرض
                        </span>
                    </template>
                </v-slider>
                <v-slider
                v-model="frontHeight"
                :max="heightMax"
                :min="1"
                dense
                >
                    <template v-slot:label>
                        <span class="caption">
                            طول
                        </span>
                    </template>
                </v-slider>
                <v-slider
                v-model="right"
                :max="rightMax"
                :min="0"
                dense
                >
                    <template v-slot:label>
                        <span class="caption">
                            فاصله از راست
                        </span>
                    </template>
                </v-slider>
                <v-slider
                v-model="top"
                :max="topMax"
                :min="0"
                dense
                >
                    <template v-slot:label>
                        <span class="caption">
                            فاصله از بالا
                        </span>
                    </template>
                </v-slider>
                <v-checkbox dense class="mt-0" :disabled="!this.backHeight" v-model="fullScreen">
                    <template v-slot:label>
                        <span class="caption">
                            تمام صفحه
                        </span>
                    </template>
                </v-checkbox>
                <v-btn @click="addToStore" small color="green">
                    ذخیره
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <client-only>
                <gallery :num="4" @on-image="file = $event[0]" />
            </client-only>
        </v-row>
    </div>
</template>

<script>
import Gallery from "@/components/Upload"
    export default {
        components: {
            Gallery,
        },
        props: {
            storedType: {
                type: String,
            },
        },
        data() {
            return {
                file: null ,
                backWidth: 200 ,
                frontWidth: 100 ,
                top: 0 ,
                right: 0 ,
                frontHeight : 200 ,
                backHeight: null ,
                topMax: 300 ,
                rightMax: 20 ,
                widthMax: 200 ,
                heightMax: 50 ,
                filledSpace: 0 ,
                aspectRatio: 1 ,
                timer: false ,
                types: [
                    {
                        text: 'چرمی' ,
                        value: 'charmi'
                        } ,
                    {
                        text: 'کاهی' ,
                        value: 'kahi'
                    } ,
                    {
                        text: 'سفید' ,
                        value: 'sefid'
                    }
                ] ,
                type: 'charmi' ,
                fullScreen: false
            }
        },
        watch: {
            frontWidth() {
                if(!this.timer) {
                    setTimeout(()=> {
                        this.setCoordinates()
                        if(!this.fullScreen) this.aspectRatio = (this.frontHeight/this.frontWidth).toFixed(3)
                        this.timer = false
                    },100)
                }
                this.timer = true
            } ,
            frontHeight() {
                if(!this.timer) {
                    setTimeout(()=> {
                        this.setCoordinates()
                        if(!this.fullScreen) this.aspectRatio = (this.frontHeight/this.frontWidth).toFixed(3)
                        this.timer = false
                    },100)
                }
                this.timer = true
            } ,
            file () {
                if(this.$refs.backImage) {
                    this.setCoordinates()
                    this.frontWidth= 100 
                    this.frontHeight = 200
                    this.top= 0 
                    this.right= 0 
                    this.backHeight= null 
                    this.topMax= 300 
                    this.rightMax= 20 
                    this.timer = false
                }
            } ,
            type(nv) {
                this.$store.commit("SET_TYPE" , nv)
            } ,
            fullScreen(nv) {
                if(nv) {
                    this.top = 0
                    this.right = 0
                    this.frontWidth = 200
                    this.frontHeight = this.backHeight
                } else {
                    this.frontWidth = 100
                    this.frontHeight = this.aspectRatio * this.frontWidth
                }
            }
        },
        computed: {
        },
        methods: {
            setCoordinates() {
                this.backHeight = this.$refs.backImage.clientHeight
                this.heightMax = this.backHeight - this.filledSpace
                this.rightMax = this.backWidth - this.frontWidth
                this.topMax = this.backHeight - this.frontHeight - this.filledSpace
            } ,
            addToStore() {
                let bottom = {
                    width: this.frontWidth ,
                    height: this.frontHeight ,
                    top: this.top ,
                    right: this.right ,
                    file: this.file
                }
                this.$store.commit("SET_BOTTOM" , bottom)
            }
        },
    }
</script>

<style>

</style>