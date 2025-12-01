export const REGEX = {
    PHONE: /^05\d{9}$/,
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    SAHIBINDEN: /sahibinden\.com/,
    HEPSIEMLAK: /hepsiemlak\.com/, // Simplified check based on usage
    EMLAKJET: /emlakjet\.com/, // Simplified check based on usage
};

export const DATE_FORMAT = 'YYYY-MM-DD';

export const IMAGE_UPLOAD_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

export const CURRENCY_CONFIG = {
    LOCALE: 'tr-TR',
    CURRENCY: 'TRY',
};
