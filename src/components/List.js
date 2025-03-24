import { fetchListData } from "../api/api.js";
import Component from "../core/Component.js";
import ListItem from "./ListItem.js";
import { CATEGORY } from "./Category.js";

export default class List extends Component{

    setup(){
        this.state = { 
            listItemData : null,
            isLoading: true,
        }

        this._startX = 0;
        this._endX = 0;
    }


    template(){
        return `
        <section id="list-container">
        <div>${this.props.currentCategory}</div>
          ${this.state.listItemData ? "" : "로딩 중..."}
        </section>
      `;
    }

    async getCategoryData () {
        const data = await fetchListData(this.props.currentCategory);
        this.setState({ listItemData: data, isLoading: false });
    }

    createListItem () {
        const $container = this.$root.querySelector("#list-container");

        this.state.listItemData.forEach(item => {
            const $div = document.createElement("div");
            $container.appendChild($div);
            new ListItem($div, { listItemData: item });
        });
    }

    async mounted () {
        if (!this.state.isLoading || this.state.listItemData) return;

        await this.getCategoryData();
        this.createListItem();
    }

    setEvent() {
        this.addEvent("touchstart", "#list-container", (e) => {
            this._startX = e.touches[0].clientX;
          });
      
          this.addEvent("touchend", "#list-container", (e) => {
            this._endX = e.changedTouches[0].clientX;
            this.handleSlide(this._startX, this._endX);
          });
      
          this.addEvent("mousedown", "#list-container", (e) => {
            this._startX = e.clientX;
          });
      
          this.addEvent("mouseup", "#list-container", (e) => {
            this._endX = e.clientX;
            this.handleSlide(this._startX, this._endX);
          });
    }

    handleSlide(startX, endX) {
        const threshold = 50;
        const diff = endX - startX;
        if (Math.abs(diff) < threshold) return;
    
        const direction = diff < 0 ? "next" : "prev";

        const categoryKeys = Object.keys(CATEGORY);
        const currentIdx = categoryKeys.indexOf(this.props.currentCategory);

        let newIdx = direction === "next" ? currentIdx + 1 : currentIdx - 1;
        if (newIdx < 0 || newIdx >= categoryKeys.length) return;

        const newCategory = categoryKeys[newIdx];
        this.props.changeCategory?.(newCategory);
        
      }
    

}