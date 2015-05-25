((root, factory) ->
    if typeof define is 'function' and define.amd
        define ['riot'], (riot) ->
            factory root, riot
    else if typeof exports is 'object'
        riot = require('riot')
        module.exports = factory root, riot
    else
        root.Cheft = factory root, riot
) window, (root, riot) ->
    C = Cheft = version: '1.0.0'

    idCounter = 0
    toString = Object.prototype.toString
    types = [
        'Function', 'Object', 'String', 'Array', 'Number'
        'Boolean', 'Date', 'RegExp', 'Undefined', 'Null'
    ]

    for item in types
        do (item) -> C["is#{item}"] = (obj) -> toString.call(obj) is "[object #{item}]"

    C.extend = (target, mixins...) ->
        return target unless target
        target[key] = value for key, value of mixin for mixin in mixins
        target

    C.uniqueId = (prefix) -> (if prefix then prefix else '') + ++idCounter

    C.mixin = (tag, obj) ->
        tag.mixin obj.actions if obj.actions
        return unless obj.events
        for item of obj.events
            do (item) -> tag.on item, obj.events[item]

    # @include core/application.coffee
    # @include core/router.coffee
    # @include core/cache.coffee
    # @include core/adapter.coffee
    # @include core/request.coffee

    Cheft
