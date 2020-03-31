import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent implements OnInit {

  currentPage: number;
  @Input() totalPages: number;
  haveMoreBackward: boolean;
  haveMoreForward: boolean;
  @Input() title;
  @Input() movies;
  @Output() changePage = new EventEmitter();

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.haveMoreBackward = false;
    this.haveMoreForward = (this.totalPages > 1) ? true: false;
    console.log(this.currentPage, this.haveMoreBackward, this.haveMoreForward);
  }

  nextPage(): void {
    if (!this.haveMoreForward) {
      return;
    }
    this.currentPage++;
    if (this.currentPage === this.totalPages) {
      this.haveMoreForward = false;
    }
    if (this.currentPage > 1) {
      this.haveMoreBackward = true;
    }
    this.changePage.emit({page: this.currentPage});
  }

  prevPage(): void {
    if (!this.haveMoreBackward) {
      return;
    }
    this.currentPage--;
    if (this.currentPage === 1) {
      this.haveMoreBackward = false;
    }
    if (this.currentPage < this.totalPages) {
      this.haveMoreForward = true;
    }
    this.changePage.emit({ page: this.currentPage });
  }

  getPosterUrl(posterPath: string): string {
    if (posterPath == null) {
      return 'https://via.placeholder.com/300x450?text=Poster%20unavailable';
    }
    return this.api.getPosterUrl(posterPath);
  }

  private scrollToTop() {
    const element = document.getElementById('movie-box-top');
    // console
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

}
