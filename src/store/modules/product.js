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
        return key => state.products.filter(element => {
            return element.key == key;
        })
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
        Vue.http.get("https://urun-islemleri-988d0-default-rtdb.firebaseio.com/products.json")
            .then((response) => {
                let data = response.body;
                for (let key in data) {
                    data[key].key = key;
                    commit("updateProductList", data[key]);
                }
            })

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
    sellProduct({ state, commit, dispatch }, payload) {
        // Vue resource işlemleri 
        let product = state.products.filter(element => {
            return element.key == payload.key;
        })

        if (product) {

            let totalCount = product[0].count - payload.count;
            Vue.http.patch("https://urun-islemleri-988d0-default-rtdb.firebaseio.com/products/" + payload.key + ".json", { count: totalCount })
                .then((response) => {
                    product[0].count = totalCount;

                    /* Alış, Satış, Bakiye bilgilerinin güncellenmesi */
                    let tradeResult = {
                        purchase: 0,
                        sale: product[0].price,
                        count: payload.count
                    }
                    dispatch("setTradeResult", tradeResult)
                    router.replace("/"); // ürün listesi ekranına yönlendirdik. "replace" ilgili route'daki yerini al. Replace ederek yönlendirdik.

                })
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}