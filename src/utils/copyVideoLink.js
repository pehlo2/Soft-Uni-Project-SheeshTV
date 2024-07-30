export const copyVideoLink = (videoId) => {
    const videoLink = `${window.location.origin}/videos/${videoId}`;
    navigator.clipboard.writeText(videoLink)
        .then(() => {
            
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
};