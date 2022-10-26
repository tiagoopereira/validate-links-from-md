import fs from 'fs';

async function getLinksFromMd(path) {
    try {
        if (fs.lstatSync(path).isDirectory()) {
            return await getLinksFromDirFiles(path);
        }

        const text = await getTextFromFile(path);

        return extractLinks(text);
    } catch (error) {
        throw error;
    }
}

async function getTextFromFile(path) {
    const encoding = 'utf-8';
    return await fs.promises.readFile(path, encoding);
}

async function getLinksFromDirFiles(path) {
    const files = await fs.promises.readdir(path);
    const data = [];

    for (const key in files) {
        const links = await getLinksFromMd(`${path}/${files[key]}`);
        data.push(links);
    }

    return data;
}

function extractLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const values = [...text.matchAll(regex)];

    return values.map((item) => {
        return {
            title: item[1],
            url: item[2]
        }
    });
}

export default getLinksFromMd;