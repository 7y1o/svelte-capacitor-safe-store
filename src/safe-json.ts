import { enc, AES } from "crypto-js";

/** Stringify and encode data */
export function encodeJSON(data: unknown, secret: string): string {
    return AES.encrypt(JSON.stringify(data), secret).toString();
}

/** Decode and parse data */
export function decodeJSON(data: string, secret: string): unknown {
    return JSON.parse(AES.decrypt(data, secret).toString(enc.Utf8));
}
