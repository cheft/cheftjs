module.exports = {
    on: {
        init: function() {
            this.list = ['广东', '广西', '广东', '广西', '广东', '广西', '广东', '广西', '广东', '广西', '广东', '广西'];
        }
    },
    do: {
        open: function() {
            this.tags.p.show();
        },
        selectP: function(e) {
            console.log(e.target.innerHTML);
            this.tags.p.close();
            this.tags.c.show();
        },
        selectC: function(e) {
            console.log(e.target.innerHTML);
            this.tags.c.close();
            this.tags.s.show();
        },
        selectS: function(e) {
            console.log(e.target.innerHTML);
            this.tags.s.close();
        }
    }
};
