const state = {
    products: []
}

const getters = {
    getProducts(state) {
        return state.products;
    },
    getProduct(state) {

    } 
}

const mutations = {
    updateProductList(state, product) {
        state.products.push(product);
    }
}

const actions = {
    initApp({ commit }) {
        // Vue resource işlemleri
    },
    saveProduct({ commit }, payload) {
        // Vue resource işlemleri 
    },
    sellProduct({ commit }, payload) {
        // Vue resource işlemleri 
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}