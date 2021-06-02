import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server!: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(Number(id));
    console.log(this.server);
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(Number(params.id));
    });
  }

  onReload() {
    // relativeTo => me permite indicarle al metodo navigate en que url se encuentra el componente sobre el cual se esta ejecutando. Esto me sirve para trabajar con rutas relativas
    // Ejemplo '/servers' => ruta absoluta => localhost:4200/servers
    //         'server' => ruta relativa => .../server
    this.router.navigate(['servers'], { relativeTo: this.route });
    // this.router.navigate(['servers']);
  }

  onEdit() {
    // la opcion queryParamsHandling seteada a preserve permite preservar los query params (allowEdit en este ejemplo) cuando se cambie de ruta
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}
