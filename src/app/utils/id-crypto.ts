// src/app/utils/id-crypto.ts
export function encryptId(id: string): string {
    return btoa(id);    // simple Base64 “encryption”
  }
  
  export function decryptId(enc: string): string {
    return atob(enc);    // decode back to the original string
  }
  