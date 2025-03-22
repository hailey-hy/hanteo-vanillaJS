import listData from '../data/listData.js'
import bannerData from '../data/bannerData.js'

const WAIT_MS = 2000;

export const fetchListData = async (category) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(listData[category]);
        }, WAIT_MS);
    })
}

export const fetchBannerData = async() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(bannerData.banners);
        }, WAIT_MS)
    })
}