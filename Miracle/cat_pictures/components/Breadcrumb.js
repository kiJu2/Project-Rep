import Component from "../core/Component.js";

export default class Breadcrumb extends Component{
    setup(){
        this.$state = {
            path : [],
        }
    }

    template(){
        const {path} = this.$state;
        
        return `
            <div>Root</div>
            ${path.map(v=>`<div>${v}</div>`).join('')}
        `
    }
}