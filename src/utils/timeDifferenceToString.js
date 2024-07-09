function timeDifferenceToString(createdAt) {
    const createdAtTime = new Date(createdAt);
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentTime - createdAtTime;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    let timeDiffStr = "";

    if (days > 0) {
        timeDiffStr = `${days} days`;
    } else if (hours > 0) {
        timeDiffStr = `${hours} hours`;
    } else {
        timeDiffStr = `${minutes} minutes`;
    }

    return timeDiffStr;
}

// Test the function
const createdAtTestStr = "2024-07-06T15:45:08.832Z";
const timeDifferenceStr = timeDifferenceToString(createdAtTestStr);
console.log(timeDifferenceStr);