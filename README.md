# Vue Project
```bash
npm init vue@latest
cd vue-project & follow instructions
```

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