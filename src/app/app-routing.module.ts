import {UserComponent} from './users/user/user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {UsersComponent} from './users/users.component';
import {ServersComponent} from './servers/servers.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ServerComponent} from './servers/server/server.component';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
import {CanDeactivateGuardService} from './can-deactivate-guard.service';
import {ErrorComponent} from './error/error.component';
import {ServerResolverService} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'users',
        component: UsersComponent,
        children: [
            {
                path: ':id/:name',
                component: UserComponent
            }
        ]
    },
    {
        path: 'servers',
        // canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        component: ServersComponent,
        children: [
            {
                path: ':id/edit',
                component: EditServerComponent, canDeactivate: [CanDeactivateGuardService]
            },
            {
                path: ':id',
                resolve: {
                    server: ServerResolverService
                },
                component: ServerComponent
            }
        ]
    },
    {
        path: 'not-found',
        // component: PageNotFoundComponent
        component: ErrorComponent,
        data: {message: 'Page not found!'}
    },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}