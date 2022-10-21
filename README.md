we have Quiz component 

-> we are passing quiz object 

![image-20221021144656729](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021144656729.png)

![image-20221021144739257](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021144739257.png)

what in case when we need to pass property really level deeper ? 

Top Level Quiz

 - pass quiz object to QuizFooter

   ![image-20221021144908558](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021144908558.png)

   - pass to QuizFooterLinks

![image-20221021145052669](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021145052669.png)

- import provide from Vue

in top level call

`provide('key', 'value')`

in bottom 

- import inject

  `let key = inject('key')`

we can only inject for components that only needed



**-> reactive** 

top level: 

```js
let name = ref('Piotrek');
provide('name', name);
```

really usefull is passing mutator 

top-level:

![image-20221021145733709](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021145733709.png)

![image-20221021145754931](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021145754931.png)

```js
let{name, changeName} = inject('name');
<button @click="changeName"> {{name}}</button>
```

## 2. Store State in an External File

stores/quizStore.js

```js
export let state = {
    name: "First Quiz",
    questions: []
}
```

HomeView:

```js
import {state} from "@/stores/quizStore"
...
<Quiz :quiz="state" />
```

in 3rd level deep file :

 ![image-20221021150353946](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021150353946.png)

change state: 

![image-20221021150441756](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021150441756.png)

to make reactive : inside quizStore:

```js
import { reactive } from "vue";

export let state = reactive({
  name: 'My Second Quiz',
  questions: []
});
```



## 3. Direct Mutation Concerns 

access counter from other part of application

-> create dedicated store : 

![image-20221021204645161](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021204645161.png)

then to mutate our counter : 

![image-20221021204800374](/home/programators/snap/typora/76/.config/Typora/typora-user-images/image-20221021204800374.png)

switch to method -> exclusive responsible for incrementing counter : 

```js
import { reactive } from "vue";

export let counter = reactive({
  // state
  count: 0,

  // action
  increment() {
    if (this.count >= 10) {
      return;
    }

    this.count++;
  }
});
```

Vue component file

```js
<script setup>
import {counter} from "@/stores/counterStore";
</script>

<template>
  <div>
    <h1>{{ counter.count }}</h1>

    <button @click="counter.increment()">Increment</button>
  </div>
</template>
```

#### 4. Pinia 

tool for dealing with global state mamangement 

we have counterStore and convert to pinia

```bash
npm install pinia 
```

main.js  -> import pinia  and regsiter as plugin 

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {createPinia} from "pinia";

app.use(createPinia());
```

1. define new store from pinia 
2. call and pass name , next object where we declare state and actions

```js
import { defineStore } from "pinia";

export let useCounterStore = defineStore('counter', {
  // data
  state() {
    return {
      count: 5
    };
  },

  // methods
  actions: {
    increment() {
      if (this.count < 10) {
        this.count++;
      }
    }
  },
  // computed
  getters: {
    remaining() {
      return 10 - this.count;
    }
  }
});
```

```js
<script setup>
import {useCounterStore} from "@/stores/CounterStore";
let counter = useCounterStore();
</script>

<template>
  <div>
    <h1>{{ counter.count }}</h1>

    <button
      @click="counter.increment()"
      :disabled="! counter.remaining"
    >Increment ({{ counter.remaining }} Remaining)</button>
  </div>
</template>
```

