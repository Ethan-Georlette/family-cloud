export const getPhotos = (userData) => {
    const photoItems = [];
    for (const file of userData) {
        console.log("User Data in getPhotos:", file);
        if (file.contentType&& file.contentType.startsWith("image/")) {
            photoItems.push({
                title: file.name,
                url: file.url,
            });
        }
    }
    return photoItems;
};