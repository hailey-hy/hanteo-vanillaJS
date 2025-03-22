import Component from "../core/Component.js";

export default class ListItem extends Component{

    template(){
        const item = this.props.listItemData;
        if(!item) return '';
        return `
            <div>${item.name}</div>
            <div>${item.lorem}</div>
        `;
    }
}