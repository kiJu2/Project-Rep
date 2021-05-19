export default class Component {
  $target;
  $props;
  $state;
  
  constructor ($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup () {};
  mount () {};
  template () { return ''; }

  setEvent () {}
  setState (newState) {
    this.$state = { ...this.$state,  ...newState };
    this.render();
  }

  addEvent (eventType, selector, callback) {
    console.log(eventType, selector, callback);
    const children = [ ...this.$target.querySelectorAll(selector) ];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    })
  }

  render () {
      this.$target.innerHTML = this.template();
      this.mount();
      this.didMount();
    }

  didMount(){}
}

// Reference : 참고하여 수정하였습니다.
// https://github.com/kiJu2/simple-component/blob/master/example08/src/core/Component.js


