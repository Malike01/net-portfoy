import { CURRENCY_CONFIG } from '@/constant/General';

export const truncateText = (text: string, maxLength: number): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const formatCurrency = (val: number) => {
    if (val >= 1000000) return `₺${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `₺${(val / 1000).toFixed(1)}K`;
    return new Intl.NumberFormat(CURRENCY_CONFIG.LOCALE, { style: 'currency', currency: CURRENCY_CONFIG.CURRENCY, maximumFractionDigits: 0 }).format(val);
};