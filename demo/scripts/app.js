(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  module.exports = {
    init: function() {
      this.todoTag = this.parent.parent;
      this.todo = this.parent.t;
      return this.on('updated', function() {
        if (this.editing) {
          return this.editor.focus();
        }
      });
    },
    toEdit: function(e) {
      this.editing = true;
      return this.editor.value = this.todo.title;
    },
    didEdit: function(e) {
      var value;
      if (e.which === 13 || e.which === 0) {
        this.editing = false;
        if ((value = e.target.value)) {
          this.todo.title = value.trim();
        }
        return this.todoTag.trigger('save');
      }
    },
    toRemove: function() {
      return this.todoTag.trigger('remove', this.todo);
    },
    toggleTodo: function() {
      this.todo.completed = !this.todo.completed;
      this.todoTag.trigger('save');
      return true;
    }
  };

}).call(this);

},{}],2:[function(require,module,exports){
riot.tag('item', '<li class="{completed: todo.completed, editing: editing} todo"> <div class="view"> <input class="toggle" type="checkbox" __checked="{todo.completed}" onclick="{toggleTodo}"> <label ondblclick="{toEdit}">{todo.title}</label> <button class="destroy" onclick="{toRemove}"></button> </div> <input class="edit" name="editor" onblur="{didEdit}" onkeyup="{didEdit}"> </li>', function(opts) {
        this.mixin(require('./item'));
    
});
riot.tag('todo', '<section id="todoapp"> <header id="header"> <h1>todos</h1> <input id="new-todo" autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" onkeyup="{didAdd}"> </header> <section id="main" if="{todos.length}"> <input id="toggle-all" type="checkbox" __checked="{allDone}" onclick="{toggleAll}"> <ul id="todo-list"><item each="{t, i in filtered()}"></item></ul> </section> <footer id="footer" if="{todos.length}"> <span id="todo-count"> <strong>{remaining}</strong> {remaining > 1 ? \'items\' : \'item\'} left </span> <ul id="filters"><li each="{v in links}"><a class="{selected: parent.activeFilter == v.name}" href="#/{v.name}">{v.label}</a></li></ul> <button id="clear-completed" onclick="{removeCompleted}" if="{todos.length > remaining}">Clear completed</button> </footer> </section> <footer id="info"> <p>Double-click to edit a todo</p> <p>Written by <a href="http://github.com/cheft">Cheft</a> </p> <p>Part of <a href="http://todomvc.com">TodoMVC</a> </p> </footer>', function(opts) {
        this.mixin(require('./todo'));
    
});
},{"./item":1,"./todo":3}],3:[function(require,module,exports){
(function() {
  var storage;

  storage = new c.Storage('todo');

  module.exports = {
    init: function() {
      this.todos = storage.fetch();
      this.links = [
        {
          label: 'All',
          name: 'all'
        }, {
          label: 'Active',
          name: 'active'
        }, {
          label: 'Completed',
          name: 'completed'
        }
      ];
      this.on('remove', function(todo) {
        return this.todos.forEach((function(_this) {
          return function(t) {
            if (todo === t) {
              _this.todos.splice(_this.todos.indexOf(t), 1);
            }
            return _this.trigger('save');
          };
        })(this));
      });
      this.on('save', function() {
        storage.save(this.todos);
        return this.update();
      });
      return this.on('update', function() {
        this.remaining = (this.todos.filter(function(t) {
          return !t.completed;
        })).length;
        return this.allDone = this.remaining === 0;
      });
    },
    didAdd: function(e) {
      var value;
      if (e.which === 13 && (value = e.target.value)) {
        this.todos.push({
          title: value.trim(),
          completed: false
        });
        e.target.value = '';
        return this.trigger('save');
      }
    },
    filtered: function() {
      return this.todos;
    },
    toggleAll: function(e) {
      this.todos.forEach(function(t) {
        return t.completed = e.target.checked;
      });
      this.trigger('save');
      return true;
    },
    removeCompleted: function(e) {
      this.todos = this.todos.filter(function(t) {
        return !t.completed;
      });
      return this.trigger('save');
    }
  };

}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  var r;

  require('./app/todo/tag');

  r = new c.Router(require('./router'));

  r.start();

}).call(this);

},{"./app/todo/tag":2,"./router":5}],5:[function(require,module,exports){
(function() {
  module.exports = {
    routes: {
      'hello/:id/:name': 'hello',
      'test/p:id': 'test',
      'path/*path': 'path',
      'aa': function() {
        return console.log('aaaaaaa');
      },
      '': function() {
        return console.log('root');
      },
      '/': function() {
        return console.log('/');
      }
    },
    hello: function(id, name) {
      return console.log('hello' + id + 'name=' + name);
    },
    test: function(id) {
      return console.log("test" + id);
    },
    path: function(path) {
      return console.log(path);
    }
  };

}).call(this);

},{}]},{},[4])