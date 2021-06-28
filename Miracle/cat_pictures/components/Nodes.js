import Component from "../core/Component.js";

export default class Nodes extends Component{
    setup(){    
        this.$state = {
            nodes : {},
            isRoot : true,
        };
    }

    template(){
        const PATH = {
            'DIRECTORY' : './assets/directory.png',
            'FILE' : './assets/file.png',
            'PREV' : './assets/prev.png',
        }
        const PREV = `
            <div class="Node">
                <img src="./assets/prev.png">
            </div>
        `
        const {nodes, } = this.$state;

        const keys = nodes ? Object.keys(nodes) : '';
        const HTML = keys && keys.map((key, idx)=>{
            const node = nodes[key];
            return `
                <div class="Node" data-id="${node.id}" data-seq="${idx}">
                    <img src="${PATH[node.type]}">
                    <div>${node.name}</div>
                </div> 
            `
        }).join('');
        
        return this.$state.isRoot ? HTML : (PREV + HTML);
    }

    setEvent(){
        const {handleClick} = this.$props;
        
        this.addEvent('click', '.Nodes', ({target})=>{
            const {nodes} = this.$state;
            const element = target.closest('.Node');
            
            element && handleClick({element, node:nodes[element.dataset.seq]});
        });
    }
    
    get getNodes(){return this.$state.nodes;}
}