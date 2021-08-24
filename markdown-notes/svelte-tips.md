# Svelte Tips

Allow this page to serve as a shared knowledge repository for helpful svelte features

## Components

each `.svelte` file in `/src/routes` can serve as the template for a html page in our svelte application. `src/components` contians `.svelte` files that aren't full pages, but rather modules that can either be though of as custom elements to add to our pages or modules that can be instantiated multiple times on a single page. 

Writing a component is easy, because you can write it just like any other `.svelte` file. 

Components can be imported into other by another component with this syntax:

``` html
<script>
    import List from "./List.svelte";
```

Then, there's two ways to instantiate a component

1. 
``` html 
<List />
```
2. 
``` html
<svelte:component this={List} />
```

## Props

Props allow components to be customizable. Declare a prop in a component's `script` block with a default value like this:

``` javascript
export let myProp = ["bananas"];
```

Props can be passed to components through the `svelte:component` tag like this:

``` html
<svelte:component this={List} myProp={["item1", "item2"]} />
```

## Binding Props

Here's a basic example of a parent-child pair of svelte components

Parent.svelte:
``` html
<script>
    import Child from "./Child.svelte";
    let myNumber = 7;
</script>
My number - {myNumber}
<button on:click={() => {myNumber++}}>Increment</button>
<svelte:component this={Child} parentNumber={myNumber}/>
```

Child.svelte
``` html
<script>
    export let parentNumber = 4;
</script>
Parent number - {parentNumber}
<button on:click={() => {parentnumber--}}>Decrement</button>
```

Here's what will happen when you render Parent.svelte: if you click "Increment", both numbers will go up. However, when you click "Decrement", only Parent Number will go down! How strange. How can this be changed?

like this:
``` html
<svelte:component this={Child} bind:parentNumber={myNumber}/>
```

by adding `bind:` to prepend a prop symbol, changes to the prop inside the component will change the value passed  in to the prop as well!

## onMount()

Svelte creates an SPA (single page application), so the `window.onload` event will only fire once when a user first visits the website, not whenver the user switches between pages within the app.

`onMount` serves as a replacement for `window.onload`, allowing code to run on the event that a component is mounted. Use it like this:

``` html
<script>
    import { onMount } from 'svelte';
    onMount(() => {
        // insert your code here
    })
</script>
```

## Reactivity

Svelte reacts to changes in values to update the UI. for instance, imagine we had this element on our page:

``` html
<p> The time right now is {time} </p>
```

Where `time` is a variable that we have defined and assinged a value to in our script. If we re-assign `time`, then Svelte will detect that the paragraph element needs to be re-rendered. 
