import { Injectable } from '@angular/core';
import { CanMatch } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  canMatch(): boolean | Observable<boolean> | Promise<boolean> {
    const token = localStorage.getItem('token');
    return !!token; 
  }
}
