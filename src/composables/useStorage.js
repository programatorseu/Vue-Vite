/* eslint-disable prettier/prettier */
import {ref, watch} from "vue";

export function useStorage(key, val=null) {
    let storedValue = read();
    if(storedValue) {
        val = ref(storedValue);
    } else {
        val = ref(val);
    }
    watch(val, write, {deep: true});
    function read() {
        return JSON.parse(localStorage.getItem(key));
    }
    function write() {
        if(val.value === "") {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(val.value));
        }
    }
    return val;
}