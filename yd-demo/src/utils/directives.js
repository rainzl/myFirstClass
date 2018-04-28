/*指令文件*/
import Vue from 'vue';
import common from "@/utils/common";
const inputEdit = Vue.directive('input-edit', {
  bind(el) {
    var $el = $(el);
    $el.on('mouseenter mouseleave click', (ev) => {
      $el.find('.el-input__suffix').css('display', ev.type == 'mouseenter' ? 'block' : 'none')
    })
  },
  inserted(el) {
    const $el = $(el);
    $el.find('.el-input__suffix').css('display', 'none')
  }
});

const openAccordion = Vue.directive('open-accordion', {
  bind(el, val) {
    var $el = $(el);
    $el.on('click', (ev) => {
      if (common.myBrowser() == 'IE' && (common.iEVersion() == 9)) {
        if ($el.hasClass('icon-left')) {
          $el.removeClass('icon-left').addClass('icon-down'); // ie9 不兼容过渡
          $el.parents('.accordion-panel').find('.accordion-panel-body').slideUp(500)  
        } else {
          $el.addClass('icon-left').removeClass('icon-down');
          $el.parents('.accordion-panel').find('.accordion-panel-body').slideDown(500)
        }
      } else {
        if ($el.hasClass('rotate')) {
          $el.removeClass('rotate');
          $el.parents('.accordion-panel').find('.accordion-panel-body').slideUp(500)
        } else {
          $el.addClass('rotate');
          $el.parents('.accordion-panel').find('.accordion-panel-body').slideDown(500)
        }
      }
    })
  }
});
const validateRequired = Vue.directive('required', {
  bind(el, val) {
    var $el = $(el).find('input');
    $el.on('focus', (ev) => {
      $el.removeClass('err');
    })
    $el.on('blur', (ev) => {
      if (_($el.val()).trim() == '') {
        $el.addClass('err');
      }
    })
  }
})
const autoFocus = Vue.directive('auto-focus', {
  inserted(el) {
    $(el).find('input').focus()
  }
})
// 只能输入数字的表单
const mustNumber = Vue.directive('number', {
  bind(el, val) {
    var $el = $(el).find('input');
    $el.on('keyup', (ev) => {
      $el.val($el.val().replace(/[^1234567890.]+/g, ''))
    })
  }
})

export {
  inputEdit,
  openAccordion,
  validateRequired,
  autoFocus,
  mustNumber
}
