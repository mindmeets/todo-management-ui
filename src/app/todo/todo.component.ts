import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  TODAY = new Date()
  id: number = -1
  user: string | null = ''
  todo: Todo = new Todo(-1, '', false, new Date())

  constructor(
    private todoService: TodoDataService,
    private authService: BasicAuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser()
    this.id = this.route.snapshot.params['id']
    if (this.id != -1) {
      this.todoService.retriveTodo(this.user, this.id).subscribe(response => {
        this.todo = response
      })
    }
  }

  
  saveTodo() {
    if (this.id !== -1) {
      this.todoService.updateTodo(this.user, this.id, this.todo).subscribe(response => {
        console.log(response)
        this.router.navigate(['todos'])
      })
    } else {
      this.todoService.createTodo(this.user, this.todo).subscribe(response => {
        console.log(response)
        this.router.navigate(['todos'])
      })
    }
  }
}
