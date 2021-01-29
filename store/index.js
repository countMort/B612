export const state = () => ({
    type : "charmi" ,
    front: {} ,
    back: {} ,
    top: {} ,
    bottom: {} ,

})

export const mutations = {
    SET_TYPE(state , type) {
        state.type = type
    },
    SET_FRONT(state , front) {
        state.front = front
    },
    SET_BACK(state , back) {
        state.back = back
    },
    SET_TOP(state , top) {
        state.top = top
    },
    SET_BOTTOM(state , bottom) {
        state.bottom = bottom
    }
}

export const actions = {
    addProductToCart({state , commit} , {product , quantity}) {
        const cartProduct = state.cart.find(prod => prod._id === product._id)
        if(!cartProduct){
            commit("pushProductToCart" , {product , quantity}) ;
        }else {
            commit("changeProductQty" , {cartProduct , quantity})
        }
        commit("incrementCartLength")
    } ,
}

export const getters = {
    getCartTotalPriceWithShipping(state) {
        let total = 0
        state.cart.map(product => {
            total =+ product.totalPrice
        })
        return total + state.shippingPrice
    } ,
    getImages (state) {
        const images = {
            front: state.front ,
            back: state.back ,
            top: state.top ,
            bottom: state.bottom
        }
        return images
    } ,
    getType (state) {
        return state.type
    }
}