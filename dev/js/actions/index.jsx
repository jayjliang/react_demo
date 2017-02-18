let nextTodoId = 0;
const load = () => {
  /*
  require.ensure(["../hello_world.jsx"], function(require) {
    console.log("load hello");
    // var hello = require("./hello_world.jsx").HelloWorld
  })
  */
  System.import("../hello_world.jsx").then(function() {
    console.log("load hello");
  });

};
export const addTodo = (text) => {
  load();
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};


export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

export const deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  };
};
