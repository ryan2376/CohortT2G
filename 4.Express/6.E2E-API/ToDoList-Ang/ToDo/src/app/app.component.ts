import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { log } from 'console';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todoList: TodoItem[] = []
  newTask: string = ''

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false
      }
      this.todoList.push(newTodoItem)
      this.newTask = ''
    }
  }

  toggleCompleted(index: number):void {
    this.todoList[index].completed =!this.todoList[index].completed
    console.log(this.todoList);
  }

  deleteTask(id: number) :void{
    this.todoList = this.todoList.filter(item => item.id !== id)
    console.log(this.todoList);
    
  }
}
