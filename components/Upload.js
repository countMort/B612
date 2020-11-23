<template>
    <div class="upload-file-drag">
        <v-card outlined class="legend-box" :disabled="disabled">
        <v-subheader class="legend-label"
            >لطفا عکس دلخواهتان را وارد کنید</v-subheader
        >
        <v-card-text>
            <v-row class="px-5">
            <v-col
                class="col-12 col-sm-6 col-sm-4 relative"
                v-for="(file, i) in files"
                :key="i"
            >
                <v-img
                class="pointer"
                @click="toggleMainPicture(i)"
                :src="file.url || file.path"
                aspect-ratio="1.7"
                ></v-img>
                <div
                class="d-flex align-center px-2"
                style="
                    background: white;
                    width: 100%;
                    border: 1px solid #d4d4d4;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border-top: none;
                "
                >
                <v-btn
                    color="primary"
                    rounded
                    x-small
                    depressed
                    v-if="file.is_main"
                    >عکس شاخص</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn @click="previewImage(file)" small icon color="grey">
                    <v-icon size="17">mdi-image-search-outline</v-icon>
                </v-btn>
                <v-btn @click="remove(file, i)" small icon color="red">
                    <v-icon size="17">mdi-delete</v-icon>
                </v-btn>
                </div>
            </v-col>
            <v-col class="col-12 pb-0">
                <file-upload
                extensions="gif,jpg,jpeg,png,webp"
                accept="image/png, image/gif, image/jpeg, image/webp"
                class="full-width"
                v-model="files"
                ref="upload"
                @input-file="inputFile"
                @input-filter="inputFilter"
                multiple
                >
                    <v-file-input
                        class="_text"
                        prepend-icon
                        append-icon="mdi-cloud-upload"
                        placeholder="افزودن عکس"
                    ></v-file-input>
                </file-upload>
            </v-col>
            </v-row>
        </v-card-text>
        </v-card>
        <!-- Dialog -->
        <v-dialog @click:outside="closeEditDialog()" v-model="edit" width="600" persistent>
        <v-card class="ma-0 pa-0">
            <v-card-title class="body-1">
            آپلود تصویر
            <v-spacer></v-spacer>
            <v-btn icon small @click.prevent="closeEditDialog()">
                <v-icon size="18">mdi-close</v-icon>
            </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pt-5">
            <div class="edit-image" v-if="files.length">
                <img ref="editImage" :src="files[files.length - 1].url" />
            </div>

            <div v-if="files.length">
                <v-checkbox
                hide-details
                class="_input _text"
                color="primary"
                v-model="files[files.length - 1].is_main"
                :true-value="1"
                :false-value="0"
                label="تعیین به عنوان عکس شاخص"
                ></v-checkbox>
            </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
            <v-btn
                @click.prevent="editSave"
                color="green"
                rounded
                small
                dark
                class="px-7"
            >
                <v-icon left>mdi-check</v-icon>تایید
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import "cropperjs/dist/cropper.css";
    import Cropper from "cropperjs";
    import FileUpload from "vue-upload-component";
    // import { EventBus } from "@/utils/event-bus.js";
    // import { getToken } from "@/utils/auth";
    // import axios from "axios";
    // import { addToGalleries, removeGallery } from "../api/gallery";

    export default {
    props: {
        galleries: {
        type: Array,
        },
        disabled: {
        type: Boolean,
        default: false,
        },
    },
    components: {
        FileUpload,
    },
    data() {
        return {
        files: [],
        loading: false,
        seller_barcode: null,
        index: 0,
        filesToRemove: [],
        edit: false,
        cropper: false,
        };
    },
    watch: {
        galleries: {
        handler(val) {
            this.files = val;
        },
        deep: true,
        },
        edit(value) {
        if (value) {
            this.$nextTick(function () {
            if (!this.$refs.editImage) {
                return;
            }
            let cropper = new Cropper(this.$refs.editImage, {
                viewMode: 0,
                autoCropArea: 0.8,
                background: false,
            });
            this.cropper = cropper;
            });
        } else {
            if (this.cropper) {
            this.cropper.destroy();
            this.cropper = false;
            }
        }
        },
    },
    methods: {
        previewImage(file) {
            window.open(file.path || file.url, "_blank");
        },
        closeEditDialog() {
            this.$refs.upload.remove(this.files[this.files.length - 1]);
            this.edit = false;
        },
        editSave() {
            let oldFile = this.files[this.files.length - 1];
            let binStr = atob(
                this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(",")[1]
            );
            let arr = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            let file = new File([arr], oldFile.name, { type: oldFile.type });
            this.$refs.upload.update(oldFile.id, {
                file,
                type: file.type,
                size: file.size,
                is_main: 0,
                is_new: true,
            });
            if (oldFile.is_main) this.toggleMainPicture(this.files.length - 1);
            this.edit = false;
        },
        toggleMainPicture(i) {
            this.files.forEach((file) => {
                file.is_main = 0;
            });

            this.files[i].is_main = 1;
        },
        inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
            if (!/\.(jpg|jpeg|png)$/i.test(newFile.name)) {
            this.$emit("setSnack", {
                text: "فرمت وارد شده صحیح نمیباشد",
                color: "red",
            });
            return prevent();
            }
        }
        if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
            newFile.url = "";
            // newFile.is_main = 0;
            let URL = window.URL || window.webkitURL;
            if (URL && URL.createObjectURL) {
            newFile.url = URL.createObjectURL(newFile.file);
            }
        }
        },
        inputFile(newFile, oldFile) {
        this.uploadFile(newFile, oldFile);
        if (newFile && !oldFile) {
            this.$nextTick(function () {
            this.edit = true;
            });
        }
        },
        doUpload() {
        var findIsMain = this.files.find((o) => o.is_main == 1);
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            if (!findIsMain) {
            setTimeout(() => {
                this.files[0].is_main = 1;
            }, 100);
            }
            setTimeout(() => {
            this.$refs.upload.update(file, {
                active: true,
            });
            // this.$refs.upload.active = true;
            });
            // if (this.files.length == i) {
            //   this.removeGallery();
            // }
        }
        },
        remove(file, i) {
        if (file.path) {
            this.filesToRemove.push(file);
            this.files.splice(file, 1);
            return;
        }

        this.$refs.upload.remove(file);
        },
        uploadFile(newFile, oldFile) {
        // if (newFile && !oldFile) {
        //     // Add file
        //     newFile.headers.Authorization = "Bearer " + getToken();
        //     newFile.postAction =
        //     "https://drive.frotel.com/api/v1/file/system_upload_file";
        //     newFile.data.is_secret = false;
        //     newFile.data.directoryName = "پارسیتک";
        //     newFile.data.tags = [this.seller_barcode];
        // }
        // if (newFile && oldFile) {
        //     if (newFile.error !== oldFile.error) {
        //     if (newFile.response.error && newFile.response.message) {
        //         newFile.error = newFile.response.message;
        //     } else if (newFile.error === "abort") {
        //         newFile.error = "انصراف از بارگذاری";
        //     } else {
        //         newFile.error = "در بارگذاری فایل خطایی رخ داده است.";
        //     }
        //     EventBus.$emit("setSnack", {
        //         text: newFile.error,
        //         color: "red",
        //     });
        //     }
        // }
        },
    },
};
</script>

<style lang="scss">
.upload-file-drag {
    width: 100%;
    padding: 10px;
    position: relative;
}
.upload-file-drag label.btn {
    margin-bottom: 0;
    margin-right: 1rem;
}
.__drop-active {
    border: 3px dashed #ccc;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
.line-height {
    line-height: 2;
}
.main-pic-text {
    position: absolute;
    bottom: 12px;
    right: 12px;
    background: #ffb400;
    color: white;
    padding: 0px 31px;
    font-size: 12px;
}
.upload-file-drag .edit-image img {
    max-width: 100%;
}
.edit-image {
    min-height: 250px;
    max-height: 350px;
}
</style>
