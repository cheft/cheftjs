require('../hello/tag');
riot.tag('test', '<hello></hello><world></world> <h3 onclick="{test1}">{title1}</h3> <h3 onclick="{test2}">{title2}</h3> <h3 onclick="{test3}">{title3}</h3> <input type="text" onkeyup="{fill}" onfocus="{test1}">', function(opts) {
        this.mixin(require('./test'));
    
});
riot.tag('world', '<h1>world</h1>', function(opts) {

});