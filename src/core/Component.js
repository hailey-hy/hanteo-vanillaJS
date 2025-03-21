export default class Component {
    state;
    props;

    constructor(root, props){
        this.$root = root;
        this.props = props;
        this.setup();
        this.render();
        this.setEvent();
    }

    setup(){}

    setState(newState){
        this.state = {...this.state, ...newState};
        this.render();
    }

    setEvent(){}

    addEvent(eventType, selector, callback) {
        this.$root.addEventListener(eventType, (event) => {
            if(!event.target.closest(selector)) return false;
            callback(event);
        })
    }

    template() { return ''}

    mounted() {}

    render() {
        this.$root.innerHTML = this.template();
        this.mounted();
    }
}