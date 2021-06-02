import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user!: { id: number; name: string };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.user = {
      // snapshop.params => me permite acceder a los parametros de la ruta
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    // params => es un observable que le va a avisar a angular cuando haya un cambio
    this.route.params.subscribe((params: Params) => {
      this.user = {
        id: params['id'],
        name: params['name'],
      };
    });
  }

  // onEdit() {
  //   this.router.navigate(['']);
  // }
}
