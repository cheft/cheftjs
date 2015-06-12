// Generated by CoffeeScript 1.9.1
var Store;

C.Store = Store = (function() {
  function Store(app, tag, options) {
    this.app = app;
    this.tag = tag;
    this.options = options;
    this.url = this.options.url;
    this.data = this.options.data || {};
    this.params = this.options.params || {};
    delete this.options.url;
    delete this.options.data;
    delete this.options.params;
  }

  Store.prototype.get = function(data) {
    return this.ajax({
      type: 'GET',
      url: this.url
    }, data, 'geted');
  };

  Store.prototype.post = function(data) {
    return this.ajax({
      type: 'POST',
      url: this.url
    }, data, 'posted');
  };

  Store.prototype.put = function(data) {
    return this.ajax({
      type: 'PUT',
      url: this.url + '/' + data.id
    }, data, 'puted');
  };

  Store.prototype.del = function(data) {
    return this.ajax({
      type: 'DELETE',
      url: this.url + '/' + data.id
    }, data, 'deleted');
  };

  Store.prototype.save = function(data) {
    if (data.id) {
      return this.put(data);
    } else {
      return this.post(data);
    }
  };

  Store.prototype.ajax = function(opts, data, evt) {
    var appendUrl, config, p, self;
    if (data == null) {
      data = {};
    }
    self = this;
    opts.contentType = this.app.contentType;
    config = C.extend(opts, this.options);
    config.url = this.app.urlRoot + config.url;
    appendUrl = '';
    for (p in this.params) {
      appendUrl += p + '=' + this.params[p] + '&';
    }
    if (appendUrl !== '') {
      config.url += '?' + appendUrl.substring(0, appendUrl.length - 1);
    }
    config.data = data;
    this.app.trigger('ajax', config);
    p = new C.Adapter.Promise();
    C.Adapter.ajax(config).done(function(resp) {
      self.set(resp);
      self.tag.trigger(evt, resp, 'success');
      this.app.trigger('ajaxed', resp, 'success');
      if (evt === ('posted' || 'puted')) {
        self.tag.trigger('saved', resp, 'success');
      }
      return p.resolve(resp);
    }).fail(function(resp) {
      self.tag.trigger(evt, resp, 'error');
      this.app.trigger('ajaxed', resp, 'error');
      if (evt === ('posted' || 'puted')) {
        self.tag.trigger('saved', resp, 'error');
      }
      return p.reject(resp);
    });
    return p.promise();
  };

  Store.prototype.set = function(d) {
    this.data = this.options.root ? d[this.options.root] : d;
    return this;
  };

  Store.prototype.clear = function() {
    this.data = {};
    return this;
  };

  return Store;

})();
