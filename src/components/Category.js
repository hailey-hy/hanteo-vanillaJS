import Component from "../core/Component.js";

export default class Category extends Component{

    setup(){
        this.state = {
            catogoryItems: ['차트', 'Whook', '이벤트', '뉴스', '스토어', '충전소'],
            selectedItem: '차트'
        }
    }

    template(){
        return `
            ${this.state.catogoryItems
                .map((item) => `<button class="tab" data-category="${item}">${item}</button>`).join('')}
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