var Store;

C.Store = Store = (function() {
  function Store(tag, options) {
    this.tag = tag;
    this.options = options;
    this.params = C.extend({}, this.options.params);
    this.url = this.options.url;
    this.data = this.options.data || {};
  }

  Store.prototype.getParams = function() {
    return this.params;
  };

  Store.prototype.get = function(obj) {
    var p;
    p = new C.Adapter.Promise();
    this.ajax({
      type: 'GET',
      url: this.url
    }, obj).done((function(_this) {
      return function(resp) {
        _this.set(resp);
        return p.resolve(resp);
      };
    })(this)).fail(function(resp) {
      return p.reject(resp);
    });
    return p.promise();
  };

  Store.prototype.post = function(obj) {
    return this.ajax({
      type: 'POST',
      url: this.url
    }, obj);
  };

  Store.prototype.put = function(obj) {
    return this.ajax({
      type: 'PUT',
      url: this.url + '/' + obj.id
    }, obj);
  };

  Store.prototype.del = function(obj) {
    return this.ajax({
      type: 'DELETE',
      url: this.url + '/' + obj.id
    }, obj);
  };

  Store.prototype.save = function(obj) {
    if (this.data.id) {
      return this.put(obj);
    } else {
      return this.post(obj);
    }
  };

  Store.prototype.ajax = function(params, obj) {
    var p;
    if (obj == null) {
      obj = {};
    }
    params.data = obj;
    p = new C.Adapter.Promise();
    return C.Adapter.ajax(params);
  };

  Store.prototype.set = function(d) {
    this.data = this.options.root ? d[this.options.root] : d;
    return this;
  };

  Store.prototype.clear = function(trigger) {
    this.data = {};
    return this;
  };

  return Store;

})();
