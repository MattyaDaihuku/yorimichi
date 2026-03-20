import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

const getMasterKey = () => {
    const key = process.env.ENCRYPTION_MASTER_KEY;
    if (!key) {
        throw new Error('ENCRYPTION_MASTER_KEY is not defined in environment variables.');
    }
    // 32 bytes required for AES-256 (64 hex characters)
    if (key.length !== 64) {
        throw new Error('ENCRYPTION_MASTER_KEY must be a 64-character hex string.');
    }
    return Buffer.from(key, 'hex');
};

export function encryptApiKey(text: string): { encrypted_key: string; iv: string; auth_tag: string } {
    // 16 bytes IV (Initialization Vector) - recommended for AES-GCM
    const iv = crypto.randomBytes(16); 
    const key = getMasterKey();
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const auth_tag = cipher.getAuthTag().toString('hex');
    
    return {
        encrypted_key: encrypted,
        iv: iv.toString('hex'),
        auth_tag,
    };
}

export function decryptApiKey(encrypted_key: string, ivHex: string, authTagHex: string): string {
    const iv = Buffer.from(ivHex, 'hex');
    const auth_tag = Buffer.from(authTagHex, 'hex');
    const key = getMasterKey();
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(auth_tag);
    
    let decrypted = decipher.update(encrypted_key, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}
