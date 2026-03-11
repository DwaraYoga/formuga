import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash password menggunakan bcryptjs
 * @param password - Password plain text yang akan di-hash
 * @returns Promise<string> - Password yang sudah di-hash
 */
export async function hashPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Failed to hash password');
    }
}

/**
 * Verifikasi password
 * @param plainPassword - Password plain text dari input user
 * @param hashedPassword - Password yang sudah di-hash di database
 * @returns Promise<boolean> - True jika password cocok
 */
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Failed to verify password');
    }
}
