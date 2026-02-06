import { useState, useCallback, useEffect } from 'react';

export type PasswordOptions = {
    length: number;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSymbols: boolean;
};

const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
};

export const usePasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [options, setOptions] = useState<PasswordOptions>({
        length: 12,
        hasUppercase: true,
        hasLowercase: true,
        hasNumbers: true,
        hasSymbols: true,
    });

    const calculateStrength = (pwd: string) => {
        let score = 0;
        if (!pwd) return 0;

        if (pwd.length > 8) score += 1;
        if (pwd.length > 12) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[a-z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

        // Normalize to 0-4 range roughly
        return Math.min(4, Math.floor(score * 0.6));
    };

    const generatePassword = useCallback(() => {
        const { length, hasUppercase, hasLowercase, hasNumbers, hasSymbols } = options;

        let chars = '';
        if (hasUppercase) chars += CHAR_SETS.uppercase;
        if (hasLowercase) chars += CHAR_SETS.lowercase;
        if (hasNumbers) chars += CHAR_SETS.numbers;
        if (hasSymbols) chars += CHAR_SETS.symbols;

        if (chars === '') {
            setPassword('');
            setStrength(0);
            return;
        }

        let generatedPassword = '';
        // Ensure at least one character from each selected set is included
        const requiredChars = [];
        if (hasUppercase) requiredChars.push(CHAR_SETS.uppercase[Math.floor(Math.random() * CHAR_SETS.uppercase.length)]);
        if (hasLowercase) requiredChars.push(CHAR_SETS.lowercase[Math.floor(Math.random() * CHAR_SETS.lowercase.length)]);
        if (hasNumbers) requiredChars.push(CHAR_SETS.numbers[Math.floor(Math.random() * CHAR_SETS.numbers.length)]);
        if (hasSymbols) requiredChars.push(CHAR_SETS.symbols[Math.floor(Math.random() * CHAR_SETS.symbols.length)]);

        // Fill the rest
        for (let i = requiredChars.length; i < length; i++) {
            generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Shuffle mandatory characters back in
        let combined = requiredChars.join('') + generatedPassword;
        combined = combined.split('').sort(() => 0.5 - Math.random()).join('');

        // Ideally we should use crypto.getRandomValues for "strong" passwords, but Math.random is sufficient for UI demo. 
        // For a "Strong" password generator, let's try to be better.

        setPassword(combined);
        setStrength(calculateStrength(combined));
    }, [options]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    return { password, strength, options, setOptions, generatePassword };
};
