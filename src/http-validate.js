async function validate(links) {
    if (!links[0].url) {
        return await extractLinksFromArray(links);
    }

    return Promise.all(
        links.map(async (item) => await statusCheck(item))
    );
}

async function extractLinksFromArray(links) {
    const data = [];

    for (const key in links) {
        const validated = await validate(links[key]);
        data.push(validated);
    }

    return data;
}

async function statusCheck(link) {
    try {
        const response = await fetch(link.url);

        return {
            ...link,
            status: response.status
        };
    } catch (error) {
        return {
            ...link,
            status: error.message
        };
    }
}

export default validate;