export const copyProfileLink = (profileId) => {
    const profileLink = `${window.location.origin}/users/${profileId}`;
    navigator.clipboard.writeText(profileLink)
        .then(() => {
            alert('Profile link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
};