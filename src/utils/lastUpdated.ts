import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getLastUpdatedTime(timestamp: number): string {
    return dayjs.unix(timestamp).fromNow();
}
