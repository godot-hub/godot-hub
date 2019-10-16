// get godot releases
const getReleases = async () => {
    const url = 'https://api.github.com/repos/godotengine/godot/releases';

    try {
        const releases = await fetch(url);
        return await releases.json();
    } catch(err) {
        console.error(err);
    }
};

export default getReleases;