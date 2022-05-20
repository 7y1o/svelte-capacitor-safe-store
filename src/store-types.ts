import type { Writable } from "svelte/store";

/** Initializer function arguments ref */
export type InitializerArgs = {

    /** Initial data if store is not exists or store data is malformed */
    initial?: any,

    /** Secrect code used in encryption and decryption */
    secret: string,

    /** Name of the store */
    name: string

    /** Validation schema */
    validate?: {
        [storedKey: string]: (value: any) => boolean
    },

    /** Whether to turn off auto-save when updating a storage value */
    autosave: boolean
};

/** Custom Svelte store type */
export type CustomSvelteStore = Writable<any> & {
    
    /** Get stored data */
    get value(): any

    /** Save data */
    save(): Promise<void>
};