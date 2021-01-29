<template>
    <div>
        <div :style="
        `width: ${width}px;
        height: ${height}px;`" class="_scene">
            <div :style="
            `width: ${width}px;
            height: ${height}px;`"
            class="_box">
                <div :style="
                `width: ${width}px;
                height: ${height}px;`"
                class="_box__face _box__face--front">
                    <img class="_background" :width="width" :src="require(`~/static/images/${storedType}_02.png`)" alt="">
                    <img
                    v-if="getImages.front.file"
                    class="_upper"
                    :style="'transform: translateX(-'+ getImages.front.right +'px) translateY(' + getImages.front.top + 'px)'"
                    :width="getImages.front.width"
                    :src="getImages.front.file.path || getImages.front.file.url"
                    alt="عکس روی جعبه">
                </div>
                <div :style="
                `width: ${width}px;
                height: ${height}px;`"
                class="_box__face _box__face--back">
                    <img class="_background" :width="width" :src="require(`~/static/images/${storedType}_04.png`)" alt="">
                    <img
                    v-if="getImages.back.file"
                    class="_upper"
                    :style="'transform: translateX(-'+ getImages.back.right +'px) translateY(' + getImages.back.top + 'px)'"
                    :width="getImages.back.width"
                    :src="getImages.back.file.path || getImages.back.file.url"
                    alt="عکس پشت جعبه">
                </div>
                <div :style="
                `width: ${depth}px;
                height: ${height}px;
                left: ${20}px;`"
                class="_box__face _box__face--right">
                    <img class="_background" :height="height" :width="depth" :src="require(`~/static/images/${storedType}_01.png`)" alt="">
                </div>
                <div :style="
                `width: ${depth}px;
                height: ${height}px;
                left: ${118}px;`"
                class="_box__face _box__face--left">
                    <img class="_background" :height="height" :width="depth" :src="require(`~/static/images/${storedType}_03.png`)" alt="">
                </div>
                <div :style="
                `width: ${width}px;
                height: ${depth}px;`"
                class="_box__face _box__face--top">
                    <img class="_background" :width="width" :src="require(`~/static/images/kesho-${storedType}_03.png`)" alt="">
                    <img
                    class="_upper"
                    v-if="getImages.top.file"
                    :style="'transform: translateX(-'+ getImages.top.right +'px) translateY(' + getImages.top.top + 'px)'"
                    :width="getImages.top.width"
                    :src="getImages.top.file.path || getImages.top.file.url"
                    alt="عکس بالای جعبه">
                </div>
                <div :style="
                `width: ${width}px;
                height: ${depth}px;
                opacity: 0.7`"
                class="_box__face _box__face--bottom">
                    <img class="_background" :width="width" :src="require(`~/static/images/kesho-${storedType}_06.png`)" alt="">
                    <img
                    class="_upper"
                    v-if="getImages.bottom.file"
                    :style="'transform: translateX(-'+ getImages.bottom.right +'px) translateY(' + getImages.bottom.top + 'px)'"
                    :width="getImages.bottom.width"
                    :src="getImages.bottom.file.path || getImages.bottom.file.url"
                    alt="عکس پایین جعبه">
                </div>
            </div>
        </div>
        <!-- <p class="radio-group">
        <label>
            <input type="radio" name="rotate-cube-side" value="front" checked /> front
        </label>
        <label>
            <input type="radio" name="rotate-cube-side" value="right" /> right
        </label>
        <label>
            <input type="radio" name="rotate-cube-side" value="back" /> back
        </label>
        <label>
            <input type="radio" name="rotate-cube-side" value="left" /> left
        </label>
        <label>
            <input type="radio" name="rotate-cube-side" value="top" /> top
        </label>
        <label>
            <input type="radio" name="rotate-cube-side" value="bottom" /> bottom
        </label>
        </p> -->
    </div>
</template>

<script>
import { mapGetters } from "vuex"
    export default {
        props: {
            mini: {
                type: Boolean,
                default: false
            },
            storedType: {
                type: String
            }
        },
        data() {
            return {
                box: null ,
                radioGroup : null ,
                currentClass : null ,
                checkedRadio : null ,
                showClass: null ,
                height: 561.5 ,
                width: 200 ,
                depth: 63.58
            }
        },
        watch: {
            "$store.getters.getImages"(newValue, oldValue) {
                console.log(newValue);
            }
        },
        mounted () {
            // this.box = document.querySelector('.box');
            // this.radioGroup = document.querySelector('.radio-group');
            // this.currentClass = '';
            // this.radioGroup.addEventListener( 'change', this.changeSide );
            // this.changeSide();
        },
        computed: {
            ...mapGetters(["getImages"])
        },
        methods: {
            // changeSide() {
            //     this.checkedRadio = this.radioGroup.querySelector(':checked');
            //     this.showClass = 'show-' + this.checkedRadio.value;
            //     if ( this.currentClass ) {
            //         this.box.classList.remove( this.currentClass );
            //     }
            //     this.box.classList.add( this.showClass );
            //     this.currentClass = this.showClass;
            // }
        },
    }
</script>

<style>
body { font-family: sans-serif; }

._scene {
    /* width: 300px; */
    /* height: 450px; */
    margin: 0 auto;
    padding-top: 100px;
    margin-bottom: 150px;
    perspective: 1000px;
    perspective-origin: 50% -70%;
}

._box {
    /* width: 300px; */
    /* height: 450px; */
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-50px);
    transition: transform 1s;
    animation-name: rotate;
    animation-duration: 14s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

._box.show-front  { transform: translateZ( -50px) rotateY(   0deg); }
._box.show-back   { transform: translateZ( -50px) rotateY(-180deg); }
._box.show-right  { transform: translateZ(-150px) rotateY( -90deg); }
._box.show-left   { transform: translateZ(-150px) rotateY(  90deg); }
._box.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
._box.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }


._box__face {
    position: absolute;
    border: 2px solid black;
    /* font-size: 40px;
    font-weight: bold;
    color: white;
    text-align: center; */
}

/* ._box__face--front,
._box__face--back {
    width: 300px;
    height: 450px;
    line-height: 200px;
} */

/* ._box__face--right,
._box__face--left {
    width: 100px;
    height: 450px;
    left: 100px;
    line-height: 200px;
} */

/* ._box__face--top,
._box__face--bottom {
    width: 300px;
    height: 100px;
    line-height: 100px;
} */
._box__face--top {
    top: 70px;
}
._box__face--bottom {
    top: 480px;
}

/* ._box__face--front  { background: hsla(  0, 100%, 50%, 0.7); }
._box__face--right  { background: hsla( 60, 100%, 50%, 0.7); }
._box__face--back   { background: hsla(120, 100%, 50%, 0.7); }
._box__face--left   { background: hsla(180, 100%, 50%, 0.7); }
._box__face--top    { background: hsla(240, 100%, 50%, 0.7); }
._box__face--bottom { background: hsla(300, 100%, 50%, 0.7); } */

._box__face--front  { transform: rotateY(  0deg) translateZ( 32px); }
._box__face--back   { transform: rotateY(180deg) translateZ( 32px); }

._box__face--right  { transform: rotateY( 90deg) translateZ(150px); }
._box__face--left   { transform: rotateY(-90deg) translateZ(150px); }

._box__face--top    { transform: rotateX( 90deg) translateZ(100px); }
._box__face--bottom { transform: rotateX(-90deg) translateZ(100px); }

label { margin-right: 10px; }

@keyframes rotate {
    0% {
        transform: translateZ( -100px) rotateY(   0deg);
    }
    100% {
        transform: translateZ( -100px) rotateY(   -360deg);
    }
}
</style>