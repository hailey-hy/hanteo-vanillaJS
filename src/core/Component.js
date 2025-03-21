export default class Component {

    constructor(root){
        this.$root = root;
        this.render();
    }

    template() { return ''}

    mounted() {}

    render() {
        this.$root.innerHTML = this.template();
        this.mounted();
    }
}