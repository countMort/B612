<template>
<v-container class="pr-2" fluid>
    <v-card class="full-width" elevation=20>
        <v-card-title primary-title>
            <v-icon>
                mdi-comment
            </v-icon>
            &nbsp; &nbsp;
            نظرات کاربران
        </v-card-title>
        <v-card-actions>
            <v-btn text outlined rounded nuxt :to="`/reviews/${productID}`" color="indigo accent-4">
                افزودن نظر
            </v-btn>
        </v-card-actions>
        <v-banner v-for="review in reviews" :key="review.id" :value="true">
            <v-avatar
            slot="icon"
            color="deep-purple accent-4"
            size="40"
            >
            <v-icon
                icon="mdi-comment-account"
                color="white"
            >
                mdi-comment-account
            </v-icon>
            </v-avatar>
            <v-chip outlined color="none">
                {{review.user.name}} :
                <v-icon size="18" v-if="review.rating>3.5 && review.rating != 5" right>mdi-thumb-up-outline</v-icon>
                <v-icon size="18" v-if="review.rating === 5" right>mdi-thumb-up</v-icon>
                <v-icon size="18" v-if="review.rating <3.5" right>mdi-thumb-down-outline</v-icon>
            </v-chip>
            <v-chip outlined color="none" class="primary--text">
                {{review.headline}}
            </v-chip>
            <v-textarea shaped outlined dense rows=1 class="ml-6" auto-grow readonly :value="review.body"></v-textarea>
            <template v-slot:actions>
                <v-rating
                class="pl-10"
                :value="review.rating"
                color="amber"
                half-increments
                dense
                size="15"
                readonly
                ></v-rating>
            <v-btn v-if="$store.state.auth.user && review.user._id === $store.state.auth.user._id" @click="onDeleteReview(review._id)" text color="deep-purple accent-4">حذف نظر</v-btn>
            <!-- <v-btn text color="deep-purple accent-4">Action</v-btn> -->
            </template>
        </v-banner>
    </v-card>
</v-container>
</template>

<script>
    export default {
        props: [
            'productID' ,
            'reviews'
        ] ,
        methods: {
            async onDeleteReview(reviewID) {
                try {
                    let reviewIndex = this.reviews.indexOf({_id : reviewID})
                    let response = await this.$axios.$delete(`/api/reviews/${reviewID}`)
                    if (response.success) {
                        console.log(response.message);
                        this.reviews.splice(reviewIndex , 1)
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        },
    }
</script>

<style scoped>

</style>