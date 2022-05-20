# Svelte Capacitor safe store

## What is this?
This package is designed for developing applications on the Capacitor platform using Svelte or SvelteKit.

With this package, you can create a centralized data warehouse with autosave and fields validation when loading. This package uses `@capacitor/storage` as the basis.

## Features
- [x] Data encryption and decryption with AES
- [x] Reactive store
- [x] Save on change (you can disable this feature)
- [x] Fields validation on load (if validators provided)
- [x] Store value getter for .ts or .js scripts

## Examples
### Basic example

```typescript
import { onMount } from 'svelte';
import store, { initializeStore } from '@7y1o/svelte-capacitor-safe-store';

onMount(async () => {
    await initializeStore({
        name: 'my-custom-store',    // name of the storage (required)
        secret: 'my-secret-string', // cipher secret string (required)
    });

    store().set({ hello: 'world!' })
    console.log(store().value.hello);
});
```

### Advanced example
```typescript
import { onMount } from 'svelte';
import store, { initializeStore } from '@7y1o/svelte-capacitor-safe-store';

onMount(async () => {
    await initializeStore({
        name: 'my-custom-store',
        secret: 'my-secret-string',
        initial: { some: 'data' },              // initial data if store not saved before
        validate: { some: v => v === 'data' },  // object fields validators object
        autosave: false                         // uses for disabling autosaves (enabled by default)
    });

    console.log(store().value.some);
});
```
