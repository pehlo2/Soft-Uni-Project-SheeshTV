export default function timeDifferenceToString(createdAt) {
    const createdAtTime = new Date(createdAt);
    const currentTime = new Date();

    const timeDifference = currentTime - createdAtTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
 
    let timeDiffStr = "";

    if (days > 0) {
        timeDiffStr = `${days} days ago`;
    } else if (hours > 0) {
        timeDiffStr = `${hours} hours ago`;
    } else if (minutes > 0) {
        timeDiffStr = `${minutes} minutes ago`;
    } else if (isNaN(seconds)) {
        timeDiffStr = `Just now`;
    } else {
        timeDiffStr = `${seconds} second ago`;
    }

    return timeDiffStr;
}