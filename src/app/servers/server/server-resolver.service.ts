import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ServersService} from '../servers.service';

interface ServerInterface {
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class ServerResolverService implements Resolve<ServerInterface> {

    constructor(private serversService: ServersService) {}
    // noinspection JSAnnotator
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerInterface> | Promise<ServerInterface> | ServerInterface {
        return this.serversService.getServer(+route.params['id']);
    }
}