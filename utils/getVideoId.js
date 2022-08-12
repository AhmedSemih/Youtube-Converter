const getVideoId = (url) => {
    // Our regex pattern to look for a youTube ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    //Match the url with the regex
    const match = url.match(regExp);
    //Return the result
    return match && match[2].length === 11 ? match[2] : undefined;
};

module.exports = getVideoId;