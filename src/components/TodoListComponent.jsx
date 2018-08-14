import React from 'react'
import TodoComponent from './TodoComponent'

class TodoListComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        {this.props.todos.map(todo => <TodoComponent key={todo.id} todo={todo} handleClick={() => this.props.handleTodoClick(todo.id)} selectedTodoId={this.props.selectedTodoId} handleCloseClick={() => this.props.removeTodo(todo.id)}/>)}
      </div>
    )
  }
}

export default TodoListComponent