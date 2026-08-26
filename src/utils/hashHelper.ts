/**
 * Hashes a student/admin password securely using standard browser Web Crypto SHA-256 with a salt.
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password) return '';
  const salt = 'dudhnoi_math_secure_salt_2026_v2';
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Checks a plain-text password against a stored hashed password.
 */
export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  if (!password || !hashed) return false;
  // If the stored password isn't hashed yet (i.e. length !== 64), check plain-text for legacy profiles
  if (hashed.length !== 64) {
    return password === hashed;
  }
  const computed = await hashPassword(password);
  return computed === hashed;
}
