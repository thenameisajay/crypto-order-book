import dayjs from 'dayjs';

export function getLocaleTime(timestamp: number): string {
    return dayjs.unix(timestamp).format('hh:mm:ss A');
}
