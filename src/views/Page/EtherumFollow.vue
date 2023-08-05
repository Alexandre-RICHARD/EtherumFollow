<script setup>
import { ref } from "vue";

const binanceSocket = new WebSocket(
    "wss://stream.binance.com:9443/ws/etheur@trade"
);

const boughtAt = ref(0);
const howManyETH = ref(0);
const sellAt = ref(0);
const gotEur = ref(0);

let priceETH = ref(null);
let gain = ref(null);
let growth = ref(null);
let lastPrice = ref(null);
let priceClass = ref(null);
let gainClass = ref(null);
let message = ref(null);

binanceSocket.onmessage = (event) => {
    priceETH.value = parseFloat(JSON.parse(event.data).p).toFixed(2);
    priceClass.value =
        priceETH.value < lastPrice.value ? "negative" : "positive";
    if (boughtAt.value > 0 && howManyETH.value > 0) {
        gain.value = (
            priceETH.value * howManyETH.value * 0.99747 -
            boughtAt.value * howManyETH.value
        ).toFixed(2);
        growth.value = (
            (gain.value / (boughtAt.value * howManyETH.value)) *
            100
        ).toFixed(2);
        gainClass.value = gain.value < 0 ? "negative" : "positive";
        message.value =
            (gain.value < 0 ? "" : "+") +
            gain.value +
            " € | " +
            (growth.value < 0 ? "" : "+") +
            growth.value +
            "%";
    }
    if (sellAt.value > 0 && gotEur.value > 0) {
        gain.value = (
            (gotEur.value / priceETH.value) * 0.999 -
            gotEur.value / sellAt.value
        ).toFixed(5);
        growth.value = (
            (gain.value / (gotEur.value / sellAt.value)) *
            100
        ).toFixed(2);
        gainClass.value = gain.value < 0 ? "negative" : "positive";
        message.value =
            (gain.value < 0 ? "" : "+") +
            gain.value +
            " ETH | " +
            (growth.value < 0 ? "" : "+") +
            growth.value +
            "%";
    }
    document.title = message.value;
    lastPrice.value = priceETH.value;
};
</script>

<template>
    <div class="eth">
        <div class="input-data">
            <div>
                <span class="little">Achat : Acheté à...</span><input
                    :value="boughtAt"
                    class="little"
                    @input="(event) => (boughtAt = event.target.value)"
                >
            </div>
            <div>
                <span class="little">Achat : Combien d'ETH...</span><input
                    :value="howManyETH"
                    class="little"
                    @input="(event) => (howManyETH = event.target.value)"
                >
            </div>
            <div>
                <span class="little">Vente : Vendu en dernier à...</span><input
                    :value="sellAt"
                    class="little"
                    @input="(event) => (sellAt = event.target.value)"
                >
            </div>
            <div>
                <span class="little">Vente : J'ai en tout...</span><input
                    :value="gotEur"
                    class="little"
                    @input="(event) => (gotEur = event.target.value)"
                >
            </div>
        </div>
        <div class="flex">
            <span>ETH : </span>
            <span :class="priceClass">{{ priceETH }} €</span>
            <span> | </span>
            <span :class="gainClass">{{ message }}</span>
        </div>
    </div>
</template>

<style lang="scss">
@import "@styles/variables.scss";

.eth {
    .input-data {
        input {
            background-color: #2b2b2b;
        }
    }

    .little {
        font-size: 2vw;
    }

    background-color: black;
    color: #efeff0;
    position: fixed;
    font-size: 5vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    span {
        background-color: black;
    }

    .negative {
        color: #ff0000;
    }

    .positive {
        color: #008000;
    }
}
</style>
