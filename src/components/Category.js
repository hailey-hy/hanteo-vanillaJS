import Component from "../core/Component.js";

export const CATEGORY = {chart:'차트', Whook: 'Whook', event: '이벤트', news:'뉴스', store: '스토어', cash: '충전소'}

export default class Category extends Component{

    setup(){
        this.state = {
            categoryItems: CATEGORY,
            selectedItem: this.props.currentCategory
        }
    }

    template(){
        return `<div class="tab-wrapper">
            ${Object.entries(this.state.categoryItems)
                .map(([key, value]) => `<button class="${this.state.selectedItem === key ? "tab selected" : "tab"}" data-category="${key}">${value}</button>`).join('')}
            </div>
        `
    }

    setEvent(){
        this.addEvent('click', '.tab', ({target}) => {
            const newCategory = target.dataset.category;
            this.setState({ selectedItem: newCategory });
            this.props.changeCategory(newCategory);
        })
    }
    
}