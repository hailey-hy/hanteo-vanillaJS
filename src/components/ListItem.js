import Component from "../core/Component.js";

export default class ListItem extends Component{

    template(){
        const item = this.props.listItemData;
        if(!item) return '';
        return `
            <div class="list-item-wrapper">
                <div class="left-section">
                    
                </div>
                <div class="right-section">
                    <div>${item.name}</div>
                    <div>${item.lorem}</div>
                </div>
            </div>
        `;
    }
}