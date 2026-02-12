import {IntegrityService} from "../../domain/integrity/IntegrityService";

export class WebCryptoIntegrityService implements IntegrityService {

    async generate(content: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(content);

        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        return this.bufferToHex(hashBuffer);
    }

    async verify (content: string, hash: string): Promise<boolean> {
        const generateHash = await this.generate(content);
        return generateHash === hash;
    }

    private bufferToHex(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);

        return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
    }
}