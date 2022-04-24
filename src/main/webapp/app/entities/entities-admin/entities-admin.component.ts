import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-entities-admin',
  templateUrl: './entities-admin.component.html',
})
export class EntitiesAdminComponent implements OnInit {
  constructor(protected activatedRoute: ActivatedRoute, protected router: Router) {}

  ngOnInit(): void {
    console.log(''); // eslint-disable-line no-console
  }
}
