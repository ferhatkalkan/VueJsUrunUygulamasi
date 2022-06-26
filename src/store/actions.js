import Vue from "vue";

export const setTradeResult = ({ state, commit }, tradeResult) => {
    commit("updateTradeResult", tradeResult);

    let tradeData = {
        purchase: state.purchase,
        sale: state.sale
    }
    Vue.http.put("https://urun-islemleri-988d0-default-rtdb.firebaseio.com/trade-result.json", tradeData)
        .then(response => {
            console.log(response);
        });
}

export const getTradeResult = ({ commit }) => {
    //DB'ye baglanacağız, verileri alıp state'i güncelleyeceğiz. Sayfa yenilendiğinde verileri ekranda güncelleyecek.

    Vue.http.get("https://urun-islemleri-988d0-default-rtdb.firebaseio.com/trade-result.json")
        .then(response => {
            commit("updateTradeResult", response.body)
        });

}
