import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

import { MovieResponse } from 'src/app/shared/movie-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentView = 'Popular Movies';
  title = 'cinetime';
  totalPages: number;
  totalResults: number;
  searchMovie: string;
  searchMode: boolean;
  movies;
  loaded = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.initSetup();
  }

  private initSetup(): void {
    this.loaded = false;
    this.searchMode = false;
    this.searchMovie = '';

    this.api.getPopularMovies().subscribe((res: MovieResponse) => {
      this.totalPages = res.total_pages;
      this.totalResults = res.total_results;
      this.movies = res.results;
      this.loaded = true;
      console.log(this.totalPages, this.totalResults);
    });
  }

  onPageChange($event) {
    console.log($event);
    this.api.getPopularMovies($event.page).subscribe((res: MovieResponse) => {
      this.movies = res.results;
      // this.scrollToTop();
    });
  }

  onSearch($event) {
    console.log($event);
    this.searchMovie = $event.movieName;
    this.searchMode = true;

    this.api.searchMovie(this.searchMovie, $event.page).subscribe((res: MovieResponse) => {
      this.movies = res.results;
      this.currentView = 'Search results for ' + this.searchMovie;
    });
  }

  onHome() {
    this.initSetup();
  }
}
