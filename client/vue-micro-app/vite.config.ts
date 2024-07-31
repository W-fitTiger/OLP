import { defineConfig, createLogger } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import svgr from 'vite-plugin-svgr'
import qiankun from "vite-plugin-qiankun"
import html from "@rollup/plugin-html"
import legacy from "@vitejs/plugin-legacy"
const logger = createLogger()

const root = path.resolve(__dirname)

const backendUrl = process.env.BACKEND_URL


export default defineConfig({
    base: "/",
    //   mode:"development",
    // define:{},
    plugins: [vue(), svgr(),qiankun("vue_micro_app",{useDevMode:true})],
    publicDir: "dist",
    //   cacheDir:"",
    resolve: {
        alias: {
            lodash: path.resolve(root, 'node_modules', 'lodash'),
            '@': path.resolve(root, './src')

        },
        extensions: ['.vue', '.ts', '.js', '.json', ".less", ".css"],
    },
    server: {
        port: 3110,
        host: '127.0.0.1',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        cors: {
            credentials: true
        },
        proxy: {
            '/api': {
                target: "http://100.81.77.234:3000",
                changeOrigin: true
            }
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    build: {
        target: "esnext",
        lib: {
            entry: './index.html',
            name: 'vue-micro-app',
            formats: ['umd']
        }

    },
    define: {
        "process.env": {}
    },
    customLogger: logger,
    esbuild: {
        jsxInject: `import React from 'react'`,
    }
})
