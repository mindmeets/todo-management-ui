import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retriveAllTodos(username: string | null) {
    return this.http.get<Todo[]>(`${API_URL}/users/${username}/todos`)
  }

  deleteTodo(username: string | null, id: number) {
    return this.http.delete(`${API_URL}/users/${username}/todos/${id}`)
  }

  retriveTodo(username: string | null, id: number) {
    return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`)
  }

  updateTodo(username: string | null, id: number, todo: Todo) {
    return this.http.put<Todo>(`${API_URL}/users/${username}/todos/${id}`, todo)
  }

  createTodo(username: string | null, todo: Todo) {
    return this.http.post(`${API_URL}/users/${username}/todos`, todo)
  }
}
