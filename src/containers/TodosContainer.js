import React, {Component} from 'react';
import TodoModel from '../models/Todo';
import Todos from '../components/Todos';
import CreateTodoForm from '../components/CreateTodoForm';

class TodosContainer extends Component{
    constructor(){
        super();
        this.state={
            todos:[],
        };
    };

    componentDidMount(){
        this.fetchData();
    };

    createTodo=(todo)=>{
        let newTodo={
            body:todo,
            completed:false,
        };

        TodoModel.create(newTodo).then((res)=>{
            let todos = this.state.todos;
            todos.push(res.data);
            this.setState(          {todos:todos});
        });
    };

    fetchData=()=>{
        TodoModel.all().then((res)=>{
            this.setState({
                todos:res.data.todos,
            })
        })
    }
    render(){
        return(
            <div className='todosContainer'>
                <h2>This is the todos container</h2>
                <CreateTodoForm
                createTodo={this.createTodo}/>
                <Todos todos={this.state.todos}/>
            </div>
        );
    };
};

export default TodosContainer;