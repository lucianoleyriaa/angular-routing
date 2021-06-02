import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server!: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.server = this.serversService.getServer(1);
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(Number(params.id));
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    // Obteniendo lo query params de la ruta
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams.allowEdit === '1' ? true : false;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    // Cuando se ejecuta este metodo router.navigate redirecciona la pagina hacia la ruta que le pasemos entre corchetes
    this.router.navigate(['/servers', this.server.id]);
  }

  backHome() {
    // Cuando se ejecuta este metodo router.navigate redirecciona la pagina hacia la ruta que le pasemos entre corchetes
    this.router.navigate(['']);
  }
}
