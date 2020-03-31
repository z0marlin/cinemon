import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private breakpoints = {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
  };

  constructor() { }

  getScreenBreakpoint(screenSize: number): string {
    for (const sz of Object.keys(this.breakpoints)) {
      if (this.breakpoints[sz] <= screenSize) {
        return sz;
      }
    }
    return 'xs';
  }
}
