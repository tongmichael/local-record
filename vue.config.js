const path = require("path");

module.exports = {

    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        proxy: {
            '/': {
                target: 'http://192.168.50.103:8093',
                changeOrigin: true,
                autoRewrite: true,
                ws: false,
            },
        },
        disableHostCheck: true
    },

}