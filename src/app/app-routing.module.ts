import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  // path: => indica la ruta y component => indica el componente que se a renderizar cuando se ingrese a esa ruta
  // /:id y :name => me indican que la ruta va a recibir parametros. Pueden ser numeros o un strings
  // { path: 'users/:id/:name', component: UserComponent },
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id', component: UserComponent },
      { path: ':id/:name', component: UserComponent },
    ],
  },
  {
    path: 'servers',
    component: ServersComponent,
    children: [
      // Nested routes
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}