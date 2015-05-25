riot.tag('item', '<li class="{completed: t.completed, editing: editing} todo"> <div class="view"> <input class="toggle" type="checkbox" __checked="{t.completed}" onclick="{toggleTodo}"> <label ondblclick="{toEdit}">{t.title}</label> <button class="destroy" onclick="{toRemove}"></button> </div> <input class="edit" name="editor" onblur="{didEdit}" onkeyup="{didEdit}"> </li>', function(opts) {
        Cheft.mixin(this, require('./item'));
    
});
riot.tag('todo', '<section id="todoapp"> <header id="header"> <h1>todos</h1> <input id="new-todo" autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" onkeyup="{didAdd}"> </header> <section id="main" if="{todos.length}"> <input id="toggle-all" type="checkbox" __checked="{allDone}" onclick="{toggleAll}"> <ul id="todo-list"><item each="{t in filtered()}"></item></ul> </section> <footer id="footer" if="{todos.length}"> <span id="todo-count"> <strong>{remaining}</strong> {remaining > 1 ? \'items\' : \'item\'} left </span> <ul id="filters"><li each="{v in links}"><a class="{selected: parent.activeFilter == v.name}" href="#start/todos/{v.name}">{v.label}</a></li></ul> <button id="clear-completed" onclick="{removeCompleted}" if="{todos.length > remaining}">Clear completed</button> </footer> </section> <footer id="info"> <p>Double-click to edit a todo</p> <p>Written by <a href="http://github.com/cheft">Cheft</a> </p> <p>Part of <a href="http://todomvc.com">TodoMVC</a> </p> </footer>', function(opts) {
        Cheft.mixin(this, require('./todo'));
    
});