import Component from "../core/Component.js";

export default class ListItem extends Component{

    template(){
        return `
            <div>${this.props.listItemData}</div>
        `
    }

}