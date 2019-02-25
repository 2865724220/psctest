import Vue from 'vue'

import toastComponent from './toast'

var toast = {}

toast.install = function (Vue, options = {}) {
  let removeDom = event =>{
    event.target.parentNode.removeChild(event.target)
  }

  const ToastController = Vue.extend(toastComponent)

  ToastController.prototype.close = function () {
    this.visible = false
    this.$el.parentNode.removeChild(this.$el)
  }

  Vue.prototype.$toast = (option = {}) => {
    let instance = new ToastController().$mount(document.createElement('div'));
    let duration = option.duration || 2000
    instance.text = typeof option === 'string' ? option:option.text

    document.body.appendChild(instance.$el)
    instance.visible = true

    setTimeout(()=>{
      instance.close()
    },duration)

  }

}

export default toast

