import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  
  todos: Todo[] = []
  deleteMessage: string = ''
  // = [
  //   new Todo(1, 'Learn Javascript', true, new Date()),
  //   new Todo(2, 'Learn AWS', false, new Date()),
  //   new Todo(3, 'Take Rest', false, new Date())
  // ]

  constructor(
    private todoService: TodoDataService,
    private auth: BasicAuthenticationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.refreshTodos()
  }
  refreshTodos() {
    const user: string | null = this.auth.getAuthenticatedUser()
    this.todoService.retriveAllTodos(user).subscribe(response => {
      this.todos = response
    })
  }

  updateTodo(id: number) {
    this.router.navigate(['todos', id])
  }

  deleteTodo(id: number) {
    const user: string | null = this.auth.getAuthenticatedUser()
    this.todoService.deleteTodo(user, id).subscribe(response => {
      this.deleteMessage = `Delete of Todo ${id} successful!`
      this.refreshTodos()
    })
  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }

}
