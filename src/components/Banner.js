import { fetchBannerData } from "../api/api.js";
import Component from "../core/Component.js";

export default class Banner extends Component{

    setup() {
        this.state = {
            currentIndex: 1,
            banners: [],
            isLoading: true,
        }
    }

    async getBannerData() {
        const data = await fetchBannerData();
        this.setState({isLoading: false, banners: data});
    }

    template() {
        if (this.state.isLoading ) return `<div>로딩 중...</div>`;
         
        return `
                <div class="banner-track">
                    ${this.state.banners
                    .map(
                        (banner) => `
                        <a href="${banner.link}" target="_blank" rel="noopener">
                            <img src="${banner.src}" alt="${banner.title}" />
                            <div>${banner.title}</div>
                            <div>${banner.detail}</div>
                        </a>
                        `
                    )
                    .join("")}
                </div>
                `;
    }

    async mounted() {
        if(!this.state.isLoading) return;
        await this.getBannerData();
    }
}