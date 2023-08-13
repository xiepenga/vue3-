import { camelize, } from '@vue/shared'
const getStyle = (
    element,
    styleName
) => {
    if ( !element || !styleName) return ''

    let key = camelize(styleName)
    if (key === 'float') key = 'cssFloat'
    try {
        const style = (element.style)[key]
        if (style) return style
        const computed = document.defaultView?.getComputedStyle(element, '')
        return computed ? computed[key] : ''
    } catch {
        return (element.style)[key]
    }
}
const isScroll = (el) => {
    const overflow = getStyle(el, 'overflow')
    return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}
export const getScrollContainer = (el,) => {

    let parent = el
    while (parent) {
        if ([window, document, document.documentElement].includes(parent))
            return window

        if (isScroll(parent,)) return parent

        parent = parent.parentNode
    }

    return parent
}
export const isInContainer = (
    el,
    container
  ) => {
    if (!el || !container) return false
  
    const elRect = el.getBoundingClientRect()
  
    let containerRect
    if (container) {
      containerRect = container.getBoundingClientRect()
    } else {
      containerRect = {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0,
      }
    }
    return (
      elRect.top < containerRect.bottom &&
      elRect.bottom > containerRect.top &&
      elRect.right > containerRect.left &&
      elRect.left < containerRect.right
    )
  }

export const imageProps = {

    hideOnClickModal: Boolean,
    src: {
        type: String,
        default: '',
    },

    fit: {
        type: String,
        values: ['', 'contain', 'cover', 'fill', 'none', 'scale-down'],
        default: '',
    },

    loading: {
        type: String,
        values: ['eager', 'lazy'],
    },
    lazy: Boolean,

    scrollContainer: {
        type: String || Object,
    },
    previewSrcList: {
        type: Array,
        default: () => ([]),
    },
    previewTeleported: Boolean,
    zIndex: {
        type: Number,
    },
    initialIndex: {
        type: Number,
        default: 0,
    },
    infinite: {
        type: Boolean,
        default: true,
    },
    closeOnPressEscape: {
        type: Boolean,
        default: true,
    },
    zoomRate: {
        type: Number,
        default: 1.2,
    },
    customRequest:{
        type:Boolean,
        default:false
    },
    httpRequest:{
        type:Function ||undefined 
    }
}
export const imageEmits = ['load','error','switch','close','show']