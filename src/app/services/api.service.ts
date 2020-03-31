import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { MovieResponse } from '../shared/movie-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string;
  private apiKey: string;
  private imageUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL;
    this.imageUrl = environment.IMAGE_URL;
    this.apiKey = environment.API_KEY;
  }

  getPopularMovies(page: number = 1) {
    console.log(this.apiUrl, this.imageUrl)
    const params = new HttpParams().set('api_key', this.apiKey)
    .set('page', page.toString());
    const reqUrl = this.apiUrl + 'movie/popular';
    return this.http.get<MovieResponse>( reqUrl, {
      params
    })
    .pipe(
      tap(_ => console.log('fetched popular movies')),
      map((data: MovieResponse) => data),
      catchError(this.handleError<MovieResponse>('getMovie'))
    );
  }

  searchMovie(movieName: string, page: number = 1) {
    const params = new HttpParams().set('api_key', this.apiKey)
    .set('page', page.toString())
    .set('query', movieName);
    const reqUrl = this.apiUrl + 'search/movie';
    return this.http.get<MovieResponse>(reqUrl, { params })
    .pipe(
      tap(_ => console.log('fetched search results')),
      map((data: MovieResponse) => data),
      catchError(this.handleError<MovieResponse>('searchMovie')),
    );
  }

  getPosterUrl(posterPath: string): string {
    posterPath.trim();
    return this.imageUrl + 'w300' + posterPath;
  }

  private handleError<T>(op = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
