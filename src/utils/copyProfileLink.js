export const copyProfileLink = (profileId) => {
    const profileLink = `${window.location.origin}/users/${profileId}`;
    navigator.clipboard.writeText(profileLink)
        .then(() => {
            console.log('copied');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
};