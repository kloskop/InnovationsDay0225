import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FcmTokenService {
  private _currentToken = '';

  public get CurrentToken(): string {
    return this._currentToken;
  }

  public setCurrentToken(token: string): void {
    this._currentToken = token;
  }
}
