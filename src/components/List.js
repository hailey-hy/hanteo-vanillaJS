import { fetchListData } from "../api/api.js";
import Component from "../core/Component.js";
import ListItem from "./ListItem.js";

export default class List extends Component{

    setup(){
        this.state = { 
            listItemData : null,
            isLoading: true,
        }
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
}