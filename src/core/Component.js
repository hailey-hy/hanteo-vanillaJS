export default class Component {
    constructor(root){
        this.root = root;
        this.render();
    }

    template() { return ''}

    render() {
        this.root.innerHTML = this.template();
    }
}