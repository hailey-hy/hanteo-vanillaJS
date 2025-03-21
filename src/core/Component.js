export default class Component {
    state;

    constructor(root){
        this.$root = root;
        this.setup();
        this.render();
    }

    setup(){}

    template() { return ''}

    mounted() {}

    render() {
        this.$root.innerHTML = this.template();
        this.mounted();
    }
}