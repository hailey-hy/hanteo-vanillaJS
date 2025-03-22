import data from '../data/mockData.js'

export const fetchData = async (category) => {
    const WAIT_MS = 2000;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data[category]);
        }, WAIT_MS);
    })
}