export function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return "Just now";
}

// Example Usage
console.log(timeAgo("2024-03-07T10:00:00Z")); // e.g., "2 days ago"
console.log(timeAgo(new Date(Date.now() - 5 * 60 * 1000))); // "5 minutes ago"
console.log(timeAgo(new Date(Date.now() - 1000))); // "1 second ago"
