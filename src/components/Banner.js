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
        const loopedBanner = [data[data.length - 1], ...data, data[0]];
        this.setState({isLoading: false, banners: loopedBanner});
    }

    template() {
        if (this.state.isLoading ) return `<div>로딩 중...</div>`;

        const realBanners = this.state.banners.slice(1, -1);
         
        return `
                <div class="banner-wrapper">
                    <div class="banner-track" style="transform: translateX(-100%)">
                    ${this.state.banners
                        .map(
                        (banner) => `
                        <div class="banner-slide">
                            <img src="${banner.src}" alt="${banner.title}" />
                            <div class="banner-title-wrapper">
                                <div class="banner-title">${banner.title}</div>
                                <a class="banner-link" href="${banner.link}" target="_blank" rel="noopener">투표하기</a>
                            </div>
                            <div class="banner-detail">${banner.detail}</div>
                        </div>`
                        )
                        .join("")}
                    </div>
                    <div class="dot-nav">
                    ${realBanners
                        .map(
                        (_, idx) =>
                            `<span class="dot ${idx === 0 ? "active" : ""}" data-index="${idx + 1}"></span>`
                        )
                        .join("")}
                    </div>
                </div>
                `;
    }

    async mounted() {
        if(!this.state.isLoading) return;
        await this.getBannerData();
        this.setupSlider();
    }

    setupSlider() {
        const $track = this.$root.querySelector(".banner-track");
        const $dots = this.$root.querySelectorAll(".dot");
        const AUTO_SLIDE_MS = 10000;

        const bannerCount = this.state.banners.length;
        let index = this.state.currentIndex;
        let isTransitioning = false;
    
        const moveTo = (i) => {
          if (isTransitioning) return;
          isTransitioning = true;
          $track.style.transition = "transform 0.5s ease";
          $track.style.transform = `translateX(-${i * 100}%)`;
          updateDots(i);
        };
    
        const jumpTo = (i) => {
          isTransitioning = false;
          $track.style.transition = "none";
          $track.style.transform = `translateX(-${i * 100}%)`;
          updateDots(i);
        };
    
        const updateDots = (i) => {
          const realIdx = (i - 1 + $dots.length) % $dots.length;
          $dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === realIdx);
          });
        };
    
        $track.addEventListener("transitionend", () => {
          isTransitioning = false;
          if (index === bannerCount - 1) {
            index = 1;
            jumpTo(index);
          }
          if (index === 0) {
            index = bannerCount - 2;
            jumpTo(index);
          }
        });
    
        this.interval = setInterval(() => {
          if (isTransitioning) return;
          index += 1;
          moveTo(index);
        }, AUTO_SLIDE_MS);
    
        this.$root.addEventListener("click", (e) => {
          if (!e.target.classList.contains("dot")) return;
          const targetIdx = Number(e.target.dataset.index);
          index = targetIdx;
          moveTo(index);
        });
      }
}