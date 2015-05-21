(function() {
  var Router, Storage, _extractParams, _routeToRegExp, _router, c, cheft, escapeRegExp, fn1, i, idCounter, item, len, namedParam, optionalParam, splatParam, toString, types,
    slice = [].slice;

  c = cheft = {
    version: '1.0.0'
  };

  idCounter = 0;

  toString = Object.prototype.toString;

  types = ['Function', 'Object', 'String', 'Array', 'Number', 'Boolean', 'Date', 'RegExp', 'Undefined', 'Null'];

  fn1 = function(item) {
    return c["is" + item] = function(obj) {
      return toString.call(obj) === ("[object " + item + "]");
    };
  };
  for (i = 0, len = types.length; i < len; i++) {
    item = types[i];
    fn1(item);
  }

  c.extend = function() {
    var j, key, len1, mixin, mixins, target, value;
    target = arguments[0], mixins = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (!target) {
      return target;
    }
    for (j = 0, len1 = mixins.length; j < len1; j++) {
      mixin = mixins[j];
      for (key in mixin) {
        value = mixin[key];
        target[key] = value;
      }
    }
    return target;
  };

  c.uniqueId = function(prefix) {
    return (prefix ? prefix : '') + ++idCounter;
  };

  optionalParam = /\((.*?)\)/g;

  namedParam = /(\(\?)?:\w+/g;

  splatParam = /\*\w+/g;

  escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  _routeToRegExp = function(route) {
    route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
      if (optional) {
        return match;
      } else {
        return '([^/?]+)';
      }
    }).replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
  };

  _extractParams = function(route, fragment) {
    var j, len1, p, params, results;
    params = route.exec(fragment).slice(1);
    results = [];
    for (j = 0, len1 = params.length; j < len1; j++) {
      p = params[j];
      results.push(decodeURIComponent(p) || null);
    }
    return results;
  };

  _router = function(router, args) {
    var opts, path, r, ref, results, route, routes;
    opts = router.opts;
    routes = opts.routes;
    path = args.join('/');
    results = [];
    for (r in routes) {
      route = _routeToRegExp(r);
      if (!route.test(path)) {
        continue;
      }
      if (c.isFunction(routes[r])) {
        results.push(routes[r].apply(router, _extractParams(route, path)));
      } else {
        results.push((ref = opts[routes[r]]) != null ? ref.apply(router, _extractParams(route, path)) : void 0);
      }
    }
    return results;
  };

  Router = (function() {
    function Router(opts) {
      this.opts = opts;
    }

    Router.prototype.start = function() {
      riot.route.exec((function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _router(_this, args);
        };
      })(this));
      riot.route((function(_this) {
        return function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _router(_this, args);
        };
      })(this));
      return riot.route.start();
    };

    Router.prototype.stop = function() {
      return riot.route.stop();
    };

    Router.prototype.to = function(hash) {
      return riot.route(hash);
    };

    Router.prototype.add = function(route, fn) {
      return this.opts.routes[route] = fn;
    };

    Router.prototype.remove = function(route) {
      return delete this.opts.routes[route];
    };

    return Router;

  })();

  Storage = (function() {
    function Storage(key1) {
      this.key = key1;
    }

    Storage.prototype.fetch = function() {
      return JSON.parse(localStorage.getItem(this.key) || '[]');
    };

    Storage.prototype.save = function(data) {
      return localStorage.setItem(this.key, JSON.stringify(data));
    };

    return Storage;

  })();

  c.Router = Router;

  c.Storage = Storage;

  window.c = c;

}).call(this);