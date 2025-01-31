import validator from 'validator';

export const validateUrl = (url: string): boolean => {
    return validator.isURL(url, {
        protocols: ['http', 'https'], // Allowed protocols
        require_protocol: true,      // Force URLs to have protocols
    });
};
