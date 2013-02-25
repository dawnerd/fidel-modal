
$.declare('modal', {
  defaults: {
    modalClass: 'modal',
    backdropClass: 'modal-backdrop',
    backdropBlurClass: 'modal-backdrop-blur',
    backdropClick: true,
    blurBackdrop: false
  },

  init: function() {

    if ($('.modal').length !== 0) {
      $('.modal').modal('hide');
    }

    this.show();
    if (this.backdropClick) {
      this.getBackdrop().on('click', this.proxy(this.hide));
    }
  },

  getBackdrop: function() {
    return $('.'+this.backdropClass);
  },

  showBackdrop: function() {
    this.hideBackdrop();
    var el = $('<div/>').addClass(this.backdropClass);
    var body = $('body');

    body.append(el);

    if (this.blurBackdrop) {
      body.addClass(this.backdropBlurClass);
    }
  },

  hideBackdrop: function() {
    this.getBackdrop().remove();
    if (this.blurBackdrop) {
      $('body').removeClass(this.backdropBlurClass);
    }
  },

  show: function() {
    this.el.addClass(this.modalClass);
    $('body').css('overflow', 'hidden');
    this.showBackdrop();
    this.el.show();
    this.emit('show');
  },

  hide: function() {
    this.el.removeClass(this.modalClass);
    $('body').css('overflow', '');
    this.hideBackdrop();
    this.el.hide();
    this.emit('hide');
    this.el.removeData('modal');
  }
});
