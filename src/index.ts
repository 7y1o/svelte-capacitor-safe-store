import { Storage } from '@capacitor/storage';
import { writable } from 'svelte/store';
import { encodeJSON, decodeJSON } from './safe-json';

// Types
import type { InitializerArgs, CustomSvelteStore } from './store-types';

/** Store holder */
let _store: CustomSvelteStore;

/** Get store */
export function store(): typeof _store {
	if (!_store) throw new Error('Store is not initialized yet');
	return _store;
}

/** Validate fields */
function validateFields(obj: any, schema: InitializerArgs['validate']): void {
	if (Object.keys(schema!).filter((key) => !schema![key](obj[key]))) throw new Error('validation failed');
}

/** Initialize store */
export async function initializeStore({ name, secret, initial, validate, autosave }: InitializerArgs): Promise<void> {
	const stored = await Storage.get({ key: name });

	// Parse data
	let data;
	try {
		data = decodeJSON(stored.value!, secret);
		if (validate) validateFields(data as Object, validate);
	} catch(_) {
		data = initial;
		await Storage.set({
			key: name,
			value: encodeJSON(data, secret)
		});
	}

	// Create Svelte store
	const _s = writable(data);

	// Subscribe store
	let _storeValue = data;
	_s.subscribe((value) => {
		_storeValue = value;

		// Save on store changed
		if (autosave || typeof autosave === 'undefined') Storage.set({
			key: name,
			value: encodeJSON(value, secret)
		});
	});

	// Finish storage init
	_store = {
		..._s,
		get value() {
			return _storeValue;
		},
		save: async () => {
			await Storage.set({
				key: name,
				value: encodeJSON(_storeValue, secret)
			});
		}
	};
}