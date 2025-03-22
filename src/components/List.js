import { fetchData } from "../api/api.js";
import Component from "../core/Component.js";
import ListItem from "./ListItem.js";

export default class List extends Component{

    setup(){
        this.state = { 
            listItemData : null,
            isLoading: false,
        }
    }


    template(){
        return `
        <section id="list-container">
          ${this.state.listItemData ? "" : "로딩 중..."}
        </section>
      `;
    }

    async mounted () {
        if (this.state.isLoading || this.state.listItemData) return;

        this.setState({ isLoading: true });

        const data = await fetchData(this.props.currentCategory);
        this.setState({ listItemData: data, isLoading: false });

        const $container = this.$root.querySelector("#list-container");

        this.state.listItemData.forEach(item => {
            const $div = document.createElement("div");
            $container.appendChild($div);
            new ListItem($div, { listItemData: item });
        });
    }
}