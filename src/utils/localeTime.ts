import dayjs from 'dayjs';

export function getLocaleTime(timestamp: number): string {
    return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}
