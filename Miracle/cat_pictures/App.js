import Component from "./core/Component.js";
import API from './utill.js';

import Nodes from "./components/Nodes.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageViewer from "./components/ImageViewer.js";
import Loading from "./components/Loding.js";

export default class App extends Component{
    localStorage = window.localStorage;

    setup(){
        this.$state = {
            depth : 0,
            path : [],
        }
        localStorage.clear();
        // localStorage.setItem(this.$state.filePath, JSON.stringify(this.$state));
    }

    template(){
        return `
        <nav class="Breadcrumb">
        </nav>
        <div class="Nodes">
        </div>
        `
    }
    
    mount(){
        const {handleClickNodes} = this;

        const $breadcrumb = this.$target.querySelector('.Breadcrumb');
        const $nodes = this.$target.querySelector('.Nodes');
        
        this.components = {
            breadcrumb : new Breadcrumb($breadcrumb,),
            nodes : new Nodes($nodes, {
                handleClick : handleClickNodes.bind(this),
            }),
            imageViewer : new ImageViewer(null, {}),
            loading : new Loading(null, {}),
        }
    }

    async handleClickNodes({node}){
        const {breadcrumb, nodes, imageViewer} = this.components;
        const path = this.$state.path;
        const {cache, request} = this;
        
        if(!node){
            // isPrev
            if(!!path.length){
                const parent = path.pop();
                const parentId = parent ? parent.id : 'root';
                const prevNodes = cache(parentId);
                
                breadcrumb.setState({'path': path.map(v=> v.name)});
                nodes.setState({nodes:(JSON.parse(prevNodes)), isRoot : parentId === 'root'});
            }
            return;
        };
        
        switch(node.type){
            case('DIRECTORY'):
                const storageNodes = cache(node.id);
                const response = storageNodes ? JSON.parse(storageNodes) : await request.call(this, node.id);
                const nodeParent = node.parent ? node.parent : {'id' : 'root'};

                nodes.setState({nodes : response, isRoot : false});
                localStorage.setItem(node.id, JSON.stringify(nodes.getNodes));
                path.push({name : node.name, ...nodeParent});
                
                break;
            case('FILE'):
                imageViewer.setState({isOn : true, filePath : node.filePath});

                break;
        }
        breadcrumb.setState({'path': path.map(v=> v.name)});
    }

    async didMount(){
        const {nodes} = this.components;
        const {cache, request} = this;

        const storageNodes = cache('root');
        const response = storageNodes ? JSON.parse(storageNodes) : await request.call(this);

        localStorage.setItem('root', JSON.stringify(response));
        nodes.setState({nodes : response});
    }
    
    cache(key){
        return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }

    async request(URL){
        const {loading} = this.components;

        loading.turnOnOff();
        const response = await API.request(URL);
        loading.turnOnOff();
        
        return response;
    }
}