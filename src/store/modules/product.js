import Vue from "vue"; // bu dosyada vue kullanacağımızı belirtiyoruz..
import { router } from "../../router"; // router isimli js dosyamızı import ediyoruz.

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
    saveProduct({ dispatch, commit, state }, product) {
        // Vue resource işlemleri 
        Vue.http.post("https://urun-islemleri-988d0-default-rtdb.firebaseio.com/products.json", product)
            .then((response) => {
                /* Ürün listesinin güncellenmesi */
                product.key = response.body.name;
                commit("updateProductList", product);

                /* Alış, Satış, Bakiye bilgilerinin güncellenmesi */
                let tradeResult = {
                    purchase: product.price,
                    sale: 0,
                    count: product.count
                }
                dispatch("setTradeResult", tradeResult)
                router.replace("/"); // ürün listesi ekranına yönlendirdik. "replace" ilgili route'daki yerini al. Replace ederek yönlendirdik.

            })
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