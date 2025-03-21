export default class Component {
    state;
    props;

    constructor(root, props){
        this.$root = root;
        this.props = props;
        this.setup();
        this.render();
    }

    setup(){}

    setState(newState){
        this.state = {...this.state, ...newState};
        this.render();
    }

    template() { return ''}

    mounted() {}

    render() {
        this.$root.innerHTML = this.template();
        this.mounted();
    }
}