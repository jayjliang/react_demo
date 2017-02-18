import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './dev/js/reducers/index';
import App from './dev/js/components/App';
import { renderToString } from 'react-dom/server';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();




function handleRender(req, res) {
    let init_state = { 
        "todos":[
            {
                id: 1,
                text: 1,
                completed: false
            },
            {
                id: 2,
                text: 2,
                completed: true
            }
        ],
        "visibilityFilter":"SHOW_ALL"
    };
    const store = createStore(todoApp, init_state);

    const html = renderToString(
        <Provider store={store}>
            <App />
            </Provider>
    );

    const preloadedState = store.getState();
    res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Hello React!!</title>
          </head>
          <body>
            <div id="example">${html}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
            </script>
            <script src="./js/vendor.bundle.js"></script>
            <script src="./js/common.bundle.js"></script>
            <script src="./js/main.bundle.js"></script>
          </body>
        </html>
    `;
}

// 通常用于加载静态资源
app.use(express.static(__dirname + '/out'));

app.use(handleRender);

// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname, 'out', 'index.html'));
// });

app.listen(port);
console.log("server started on port " + port);
