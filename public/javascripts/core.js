'use strict';

/**********************************
 ************ REQUIRE *************
 **********************************/
var require = function (name, handler) {
    handler = handler || function (source, path, mod) {
        mod.exports = {};
        eval('(function (module, exports) { ' + source + '\n//*/\n})(mod, mod.exports);//@ sourceURL=/' + path);
    };

    if (require.moduleRoot && require.moduleRoot[require.moduleRoot.length-1] != '/') require.moduleRoot += '/';

    var path = name.split('/');
    var fileName = path.pop();

    if (!/.js$/.test(fileName)) {
        fileName = fileName + '.js';
    }

    path.push(fileName);
    path = require.moduleRoot + path.join('/');

    var mod = require.modules[path];

    if (mod === undefined) {

        // load file with blocking (!)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, false);
        xhr.send();

        // OK: when we're using async-loading we can don't use "onreadystatechange" callback
        var source = xhr.responseText;
        if (xhr.status === 200) {
            mod = {};
            try {
                handler(source, path, mod);
            } catch (e) {
                console.error('Error in file ' + path + ': ', e, e.stack);
            }
            if (require.developmentMode) enableCallLog(mod);
        }
        // NOT OK: handling errors here
        else {
            console.log(
                [
                    'require.js loading file "' + path + '" was failed.',
                    'Status: ' + xhr.status,
                    'State: ' + xhr.readyState
                ].join('\n')
            );
        }

        // caching
        require.modules[path] = mod;
    }

    return mod.exports;
};
require.moduleRoot = '/javascripts/';
require.modules = {};
