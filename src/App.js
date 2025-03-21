import Component from "./core/Component.js";

export default class App extends Component {
    template(){
        return (
            `
                <header>
                    <nav></nav>
                    <section></section>
                </header>
                <main></main>
                <footer></footer>
            `
        )
    }
}