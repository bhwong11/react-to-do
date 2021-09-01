import React, {Component} from 'react';
import TodoModel from '../models/Todo';
import Todos from '../components/Todos';
import CreateTodoForm from '../components/CreateTodoForm';

class TodosContainer extends Component{
        state={
            todos:[],
        };


    componentDidMount(){
        this.fetchData();
    };
    //componentDidMount() {
    //    console.log("component C mounted");
    //  }

    createTodo=(todo)=>{
        let newTodo={
            body:todo,
            completed:false,
        };

        TodoModel.create(newTodo).then((res)=>{
            let todos = this.state.todos;
            todos.push(res.data);
            this.setState({todos:todos});
        });
    };

    deleteTodo=(todo)=>{
        TodoModel.delete(todo).then((res)=>{
            let todos = this.state.todos.filter((todo)=>{
                return todo._id !==res.data._id;
            });
            this.setState({
                todos:todos,
            });
        });
    };

    updateTodo=todo=>{
        const isUpdatedTodo = t=>{
            console.log(t._id === todo._id)
            return t._id === todo._id;
        };

        TodoModel.update(todo).then((res)=>{
            console.log(res)
            let todos = this.state.todos;
            todos.find(isUpdatedTodo).body = todo.body;
            this.setState({todos:todos});
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
        //console.log('render')
        //function fTest(){
        //    console.log('hello')
        //    console.log('hello1')
        //}
        //const returnR = async function returnR(){
        //    let r = null
        //    await TodoModel.all().then((res)=>{
        //    r = res.data
        //    console.log('res')
        //})
        //console.log(r)
        //console.log('something')
        //}
        //returnR()
        //fTest()
        

        return(
            <div className='todosContainer'>
                <h2>This is the todos container</h2>
                <CreateTodoForm
                createTodo={this.createTodo}/>
                <Todos todos={this.state.todos} 
                updateTodo ={this.updateTodo}
                deleteTodo={this.deleteTodo}/>
            </div>
        );
    };
};

export default TodosContainer;