import Banner from "./components/Banner.js";
import Category from "./components/Category.js";
import Footer from "./components/Footer.js";
import List from "./components/List.js";
import Component from "./core/Component.js";

export default class App extends Component {
    template(){
        return (
            `
                <header>
                    <nav data-component='category'></nav>
                    <section data-component='banner'></section>
                </header>
                <main data-component='list'></main>
                <footer data-component='footer'></footer>
            `
        )
    }

    mounted(){
        const $category = this.$root.querySelector("[data-component='category']");
        const $banner = this.$root.querySelector("[data-component='banner']");
        const $list = this.$root.querySelector("[data-component='list']");
        const $footer = this.$root.querySelector("[data-component='footer']");

        new Category($category);
        new Banner($banner);
        new List($list);
        new Footer($footer);
    }
}