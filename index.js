'use strict';

var loaderUtils = require('loader-utils');

function escapeCharacters(token) {
    return token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function constructRegex(pragma, exclusive) {
    var prefix = exclusive ? 'exclude' : 'include';
    pragma = escapeCharacters(pragma);

    var s = '[\\t ]*\\/\\/>>\\s?' +
        prefix +
        'Start\\s?\\(\\s?(["\'])' +
        pragma +
        '\\1\\s?,\\s?pragmas\\.' +
        pragma +
        '\\s?\\)\\s?;?' +

        // multiline code block
        '[\\s\\S]*?' +

        // end comment
        '[\\t ]*\\/\\/>>\\s?' +
        prefix +
        'End\\s?\\(\\s?(["\'])' +
        pragma +
        '\\2\\s?\\)\\s?;?\\s?[\\t ]*\\n?';

    return new RegExp(s, 'gm');
}

function stripPragmas(context, source) {
    var options = loaderUtils.getOptions(context) || {};
    var pragmas = options.pragmas || {};

    for (var key in pragmas) {
        if (pragmas.hasOwnProperty(key)) {
            source = source.replace(constructRegex(key, pragmas[key]), '');
        }
    }

    if (context.cacheable) {
        context.cacheable(true);
    }

    return source;
}

module.exports = function (source, map) {
    this.callback(null, stripPragmas(this, source), map);
};