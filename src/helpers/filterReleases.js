const filterReleases = (rawReleases) => {
    // don't include version 1.0-stable as there is no download link for it
    let releases = rawReleases.slice(0, rawReleases.length - 1);
    
    // filter each release to only include the version & url
    return releases.map(release => {
        // filtered release values
        let version = release.name;
        let url = release.body.slice(release.body.indexOf("[Download](") + 11, release.body.length - 1);

        return {
            version,
            url
        }
    });
};

export default filterReleases;