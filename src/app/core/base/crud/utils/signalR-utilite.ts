import { Injectable, ChangeDetectorRef } from '@angular/core';
import { AuthTokenType, AuthService } from '@app/core/auth/services/auth.service';
import * as signalR from '@aspnet/signalr';
import { ValidationAuthTokenUser } from '@app/core/auth/services';

@Injectable({
    providedIn: 'root'
})

export class SignalRUtilite {

    constructor(private authService: ValidationAuthTokenUser) { }

    SignalRConnection(connectionString: string, func: void): void {
        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(connectionString + '/notificationHub/?access_token=' + this.authService.getRawAuthToken(AuthTokenType.AccessToken))
            .build();
        connection.start().then(function () {
        }).catch(function (err) {
        });
        connection.on('BroadcastMessage', () => {
            func;
        });
    }
}
