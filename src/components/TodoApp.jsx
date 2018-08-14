import React from 'react'
import TodoListComponent from './TodoListComponent'
import { db } from '../client'
import { and, cond } from 'space-api'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], text: '', selectedTodoId: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTodoClick = this.handleTodoClick.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  componentDidMount() {
    // Get user id from local storage
    const userId = localStorage.getItem('userId')

    // Send query to get all todos
    db.get('todos').where(and(cond('userId', '==', userId))).all().then(res => {
      if (res.status === 200) {
        // res.data contains the documents returned by the database
        if (res.data.result)
          this.setState({ todos: res.data.result })
        return;
      }
      console.log('Get Failed:', res);
    }).catch(ex => {
      // Exception occured while processing request
    });
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
          <TodoListComponent todos={this.state.todos} handleTodoClick={this.handleTodoClick} selectedTodoId={this.state.selectedTodoId} removeTodo={this.removeTodo} />
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
    db.delete('todos').where(and(cond('id', '==', id))).one().then(res => {
      if (res.status === 200) {
        // The todo was deleted successfully
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
        return;
      }
      console.log('Delete Failed:', res)
    }).catch(ex => {
      // Exception occured while processing request
      console.log('Delete Exception:', ex)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now(),
      userId: localStorage.getItem('userId')
    };

    this.setState({ text: '' });

    db.insert('todos').one(newItem).then(res => {
      if (res.status === 200) {
        // Document was inserted successfully
        this.setState(prevState => ({
          todos: prevState.todos.concat(newItem),
          text: ''
        }));
        return;
      }
      console.log('Insert Failed:', res)
    }).catch(ex => {
      // Exception occured while processing request
      console.log('Insert Exception:', ex)
    });
  }
}


export default TodoApp