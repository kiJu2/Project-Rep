import Component from "../core/Component.js";

export default class Loading extends Component{
    setup(){
        const $App = document.querySelector('.App');

        this.$target = document.createElement('div');
        this.$target.className = 'Modal Loading';
        this.$target.setAttribute('style', 'display:none');

        $App.appendChild(this.$target);

        this.$state = {
            filePath : './assets/nyan-cat.gif',
            isOn : false,
        };
    }

    template(){
        const {isOn, filePath} = this.$state;
        const display = isOn ? 'block' : 'none';
        
        this.$target.setAttribute('style', 'display:'+display);

        return `
            <div class="content">
                <img src="${filePath}">
            </div>
        `
    }

    turnOnOff(){
        let {isOn} = this.$state;
        this.setState({isOn : !isOn});
    }
}
