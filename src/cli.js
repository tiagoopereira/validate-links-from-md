import getLinksFromMd from "./links-from-md.js";
import validate from "./http-validate.js";

const path = process.argv[2];

async function handle(path) {
    getLinks(path)
        .then(async (links) => {
            console.log(await validate(links));
        });
}

async function getLinks(path) {
    try {
        return await getLinksFromMd(path);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('file or directory not found.');
        }
    }
}

await handle(path);