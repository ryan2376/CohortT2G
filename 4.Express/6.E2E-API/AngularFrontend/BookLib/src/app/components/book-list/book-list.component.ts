// src/app/components/book-list/book-list.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A classic novel about the American Dream.",
      image: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel about surveillance and control.",
      image: "https://i.ebayimg.com/images/g/vZQAAeSwSbRnrJge/s-l500.webp"
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      description: "A romantic novel about love and social class.",
      image: "https://i.ebayimg.com/images/g/ikQAAOSwm8JnkrMW/s-l500.webp"
    }
  ];

  onRegisterLinkClick() {
    console.log('Register link clicked!');
  }
}