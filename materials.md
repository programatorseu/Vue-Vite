
App.vue for passing links : 

```js
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
```

router/index.js

```js
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    }
```

## 2. Things

-> alias inside vite.config.js

```js
 alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
```

`# ==> v-slot`

```js
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
```

```js
<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>
```

then to use it :

```js
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener"
      >official documentation</a
    >
    provides you with all information you need to get started.
  </WelcomeItem>
```

we can create stly within vue component 

## 3. Composition Api

### 3.1 Two mental Leaps to Script Setup

HomeView.vue has got at the top

```js
<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
</script>

```

in vue we have 2 ways of writing code 

- options & composition API 

with options we export object with all methods 

```js
export default {
    data() {
        return {
            count: 0
        }
    }
}
```

`script setup` compile-time transforms code 

Composition API allow us use imported functions instead of declared options.

umbrella terma that covers : 

- Reactivity API - create reactive state & watchers
- Lifecycle Hooks (allow to hook into component lifecycle)
- Dependency Injection  - leverage Vue's injection system 



Option API

```js
<script>
import TheWelcome from "@/components/TheWelcome.vue";
export default {
  components: {TheWelcome},

  data() {
    return {
      message: 'Hello World'
    }
  },
  mounted() {
    alert('I have been mounted');
  }
}
</script>
```

to :

```js
<script>
import TheWelcome from "@/components/TheWelcome.vue";
export default {
  components: {TheWelcome},
  setup() {
    return {
      message: "Hello World"
    }
  }
</script>    
```

it works : 

```js
<main>
    <TheWelcome />
    <p>{{message}}</p>
```

```js
import TheWelcome from "@/components/TheWelcome.vue";
import {onMounted} from "vue";
export default {
  components: {TheWelcome},
  setup() {
    onMounted(() => {
        alert('Hello');
    });
    return {
      message: "Hello World"
    }
  }
```



to

```js
import {onMounted, ref} from "vue";
export default {
  components: {TheWelcome},
  setup() {
    onMounted(() => {
        alert('Hello');
    });
    let message = ref('Hello World');
    return {
      message: message
    }
  }
    ..
    
     <p>
      <input type="text" v-model="message" />
    </p>   
```

ref - change value with `value`

```js
    let message = ref('Hello World');
    setTimeout(() => {
      message.value = "I have been Changed";
    }, 2000);
```



composition :

```js
<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
import { ref } from "vue";
let message = ref("Hello World");
setTimeout(() => {
  message.value = "I have been Changed";
}, 2000);

</script>
```

add method inside cript

```js
let popup = () => {
  alert('popup message');
}
```

then to use it :

```html
    <button @click="popup">click me</button>

```



### 3.2 From mixins to Composables 

- when we click on button -> flash message 

```js
<script>
export default {
  methods: {
    flash(message) {
      alert(message);
    }
  }
}

</script>
```

```html
    <button @click="flash('Ania')">click me</button>
```

if we want to use on other page - we will need to copy & paste entire script or we can use : 

```
npm install sweetalert --save-dev
```

then to use :

(title, message,level(information, danger))

```js
import swal from 'sweetalert';
...
  methods: {
    flash(message) {
      swal('Success !', message, 'success');
    }
  }
}
```



**mixins** 

- like traits in PHP

- mixed in with componet that pull in

 

`mixins/flash.js`

to use it in component import and pass into `mixins` array 

different approach with composables : 

`composables/useFlash.js`

-  export with function named as file 

-  declare function and return what we want to share with application : 

import in component / use `setup()` - populate {flash}

```js
import swal from 'sweetalert';
export function useFlash() {
    function flash(title, message, level = 'success') {
        return swal(title, message, level);
    }
    return {flash};
}
```

then use it :

```js
    <button @click="flash('Yo !! ','Ania', 'info')">click me</button>
```



### 3.3 Composabl Example : local Storage

- listen for what user type `@input` event to call `write` function 

- use `localStorage` API -> key => value pair 

- remember on Page load - check localStorage - set then input 

  -> we want to do it for multiple inputs (key - value pass as aram - args in `@input`)

- instead of using `@input` we are going to use watcher 

```js
    <p>What is your favorite food? <input type="text" v-model="food" @input="write('food', food)"></p>
```

```js
watch(food, (val) => {
  write('food', val);
});
```

we will need to set up watcher for every input -- extract to composables and refactor our code to get : 

```js
let food = useStorage('food');
```

we keep track what is typed with `v-model`

> 1. get item from localStorage
> 2. use `ref`  to get reference
> 3. use watcher to write to local storage  - 

-  if empty string remove  /add default 

for objects and Array -> json.stringify before we put into localo storage  

- watcher deep true for object ( go deeper into child properties )



### 3.4 definedProps and definedEmits

-> html text area - > inded with tab key

textarea node listening for use press key 

-  check what is key clicked 
-  look for cursor is 

add to our text area `ref="textarea"` then : 

```js
import {onMounted, ref} from "vue"; 
let textarea = ref(null);
onMounted(() => {
  console.log(textarea.value);
    // textarea.value.value -> to get actual value 
}); 
```

-> we will call onMounted in optional API

-> `@keyDown` call to `onKeyDown` method 



```js
import {onMounted, ref} from "vue"; 
let textarea = ref(null);
function onKeyDown(e) {
  let t = textarea.value;
  if(e.keyCode === 9) {
    let val = t.value,
        start = t.selectionStart,
        end = t.selectionEnd;
    t.value = val.substring(0, start) + "\t" + val.substring(end);
    t.selectionStart = t.selectionEnd = start + 1;
    e.preventDefault();
  }
}
```

`@keydown.tab.prevent` instead of checking key.code  and`preventDefault`

-> extract to component 

```js
<script setup>
function onTabPressed(e) {
  let t = e.target;
    let val = t.value,
        start = t.selectionStart,
        end = t.selectionEnd;
    t.value = val.substring(0, start) + "\t" + val.substring(end);
    t.selectionStart = t.selectionEnd = start + 1;
}
</script>
<template>
  <textarea  @keydown.tab.prevent="onTabPressed"></textarea>
</template>
```

then to use 

```js
<script setup>
  import TabbableTextarea from "@/components/TabbableTextarea.vue";
</script>
```

```html
    <form>
      <TabbableTextarea style="width:100%; height:300px;"></TabbableTextarea>
    </form>
```



- add `v-model` to track value 

- `definedProps` -> -- to get access to value  then use `v-text`   to keep async

- `@keyup` to udpate  with `emit` ==> `this.$emit('update:modelValue', 'asdasa')`

```js
   @keyup="emit('update:modelValue', $event.target.value)"
```
---
---

# State management

we have Quiz component 

-> we are passing quiz object  to Component view:

```js
import Quiz from "@/components/Quiz.Quiz.vue"
..
<Quiz :quizz="{name: "First question", questions: [] }"/>
```

Quiz component:

```js
<template>
    <QuizHeader />
    <QuizQuestion />
    <QuizFooter :quiz="quiz" />
</template>
<script setup>
       import QuizHeader from "@/components/Quiz/QuizHeader.vue"
		...
        
    defineProps({quiz: Object});    
</script>        
```



what in case when we need to pass property really level deeper ? 

Top Level Quiz

 - pass quiz object to QuizFooter

   ```js
   <template>
       <div>
       <h5>{{quiz.name}}</h5>
   	...
       <script setup>
           defineProps({quiz: Object});
       </script>    
   </template>    
   ```

   

   - pass to QuizFooterLinks

   ```js
   <template>
       <div>
       <h5>{{quiz.name}}</h5>
   	...
       <script setup>
           defineProps({quiz: Object});
       </script>    
   </template>    
   ```

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

```js
provide('name', {
	name,
    changeName: () => name.value = "Changed"
});
```





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

```js
<script setup>
    import {state} from "@/stores/quizStore"
</script>    
```



change state: 

```js
div
	h5{{state.name}}
	<button @click="state.name = 'A new Quiz name'">Change Quiz Name </button>
```

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

```js
import { reactive } from "vue";

export let counter = reactive({
	count: 0
});
```

then to mutate our counter : 

```js
<script setup>
    import {counter} from "@/stores/counter/counterStore";
</script>
<template>
    <div>
    	<h1>{{counter.count}}</h1>
	<button @click="counter.count++">Increment</button>
```

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


