import Component from "../core/Component.js";

export default class Category extends Component{

    setup(){
        this.state = {
            categoryItems: {chart:'차트', Whook: 'Whook', event: '이벤트', news:'뉴스', store: '스토어', cash: '충전소'},
            selectedItem: 'chart'
        }
    }

    template(){
        return `
            ${Object.entries(this.state.categoryItems)
                .map(([key, value]) => `<button class="tab" data-category="${key}">${value}</button>`).join('')}
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