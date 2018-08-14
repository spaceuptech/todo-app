import React from 'react'
import TodoListComponent from './TodoListComponent'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], text: '', selectedTodoId: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTodoClick = this.handleTodoClick.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  render() {
    return (
      <div className="todo-app-container">
      <div className="todo-app-title">Todos</div>
        <div className="todo-app-card">
          <form onSubmit={this.handleSubmit}>
            <input
              style={{ width: '100%', padding: '20px', fontSize: '1.2rem' }}
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
              placeholder="What needs to be done?"
            />
          </form>
          <TodoListComponent todos={this.state.todos} handleTodoClick={this.handleTodoClick} selectedTodoId={this.state.selectedTodoId} removeTodo={this.removeTodo}/>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleTodoClick(id) {
    this.setState({ selectedTodoId: id });
  }

  removeTodo(id) {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      todos: prevState.todos.concat(newItem),
      text: ''
    }));
  }
}


export default TodoApp