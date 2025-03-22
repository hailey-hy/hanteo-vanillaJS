import Component from "../core/Component.js";
import ListItem from "./ListItem.js";

export default class List extends Component{

    setup(){
        this.state = { listItemData : this.props.currentCategory}
    }


    template(){
        return `
            <section id="list-container"></section>
        `
    }

    mounted () {
        const $container = this.$root.querySelector("#list-container");
        
        new ListItem($container, { listItemData: this.state.listItemData })
    }
}