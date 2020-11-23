<template>
  <v-container id="my-node" fluid>
    <no-ssr>
      <gallery />
    </no-ssr>
    <div light id="mydiv">
      <div id="mydivheader">Click here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>
    </div>
    <v-btn @click="domToImage"></v-btn>
    <h1 class="display-1">Rich-Text editor integration By Anamol Soman</h1>
    <!-- <Editor v-model="info"/> -->
    <div v-html="info"></div>
  </v-container>
</template>
<script>
if (process.client) {
  var  domToImage = require('dom-to-image');

}
import gallery from '@/components/Upload'
// import Editor from "@/components/Editor";
export default {
  components: {
    gallery,
  },
  data() {
    return {
      pos1: 0 ,
      pos2: 0 ,
      pos3: 0 ,
      pos4: 0 ,
      file: null ,
      info: "My Default Content"
    }
  },
  watch: {
    file(nv) {
      console.log(nv);
    }
  } ,
  mounted () {
    this.dragElement(document.getElementById("mydiv"));
    this.$vuetify.theme = 'light'
  },
  methods: {
    domToImage() {
      var node = document.getElementById('my-node');
      domToImage.toPng(node)
      .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          document.body.appendChild(img);
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
      domToImage.toJpeg(document.getElementById('my-node'))
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          console.log(link);
          link.click();
      });
      // domToImage.toBlob(document.getElementById('my-node'))
      // .then(function (blob) {
      //     window.saveAs(blob, 'my-node.png');
      // });
    } ,
    dragElement(elmnt) {
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = this.dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = this.dragMouseDown;
      }
    } ,

    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
      } ,

    elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // set the element's new position:
      let elmnt = document.getElementById("mydiv")
      elmnt.style.top = (elmnt.offsetTop - this.pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - this.pos1) + "px";
    } ,

    closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
}
</script>

<style scoped>
#mydiv {
  position: absolute;
  z-index: 1;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
}

#mydivheader {
  padding: 10px;
  cursor: move;
  z-index: 2;
  background-color: #2196F3;
  color: #fff;
}
</style>