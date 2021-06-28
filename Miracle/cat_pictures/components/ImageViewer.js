import Component from "../core/Component.js";

export default class ImageViewer extends Component{
    setup(){
        const $App = document.querySelector('.App');

        this.$target = document.createElement('div');
        this.$target.className = 'Modal ImageViewer';
        this.$target.setAttribute('style', 'display:none');

        $App.appendChild(this.$target);

        this.$state = {
            filePath : '',
            isOn : false,
            _IMAGE_POINT : 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public',
        };
    }

    template(){
        const {filePath, isOn, _IMAGE_POINT} = this.$state;
        const display = isOn ? 'block' : 'none';
        const URL = (filePath === '') ? '' : _IMAGE_POINT + filePath;
        
        this.$target.setAttribute('style', 'display:'+display);

        return `
            <div class="content">
                <img src="${URL}">
            </div>
        `
    }

    setEvent(){
        const {keyUp} = this.$props;
        
        window.addEventListener('keyup', ({key})=>{
            if(key == 'Escape'){
                this.setState({isOn:false});
            }
        });
    }

}
