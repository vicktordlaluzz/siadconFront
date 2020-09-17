import { Component, OnInit } from '@angular/core';
import { TramitesService } from 'src/app/services/tramites.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { TramiteI } from '../../models/tramite-i';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tramiteslist',
  templateUrl: './tramiteslist.component.html',
  styleUrls: ['./tramiteslist.component.css']
})
export class TramiteslistComponent implements OnInit {

  tramites: TramiteI[];
  p = 1;
  
  searchForm: FormGroup;
  filtrado = '';

  constructor(private tramitesService: TramitesService,
              private fb: FormBuilder,
              private router: Router) {
    this.getTramites();
    this.buildForm();
  }

  ngOnInit(): void {
  }

  
  getTramites(){
    this.tramitesService.getTramites()
        .subscribe((res: any) => {
          this.tramites = res.tramites;
        }, err => console.log(err)
        );
  }

  buildForm(){
    this.searchForm = this.fb.group({
      termino: ['']
    });
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.filtrado = value.termino;
      });
  }

  verTramite(tramite: string){
    this.router.navigateByUrl(`/dashboard/tramite/${tramite}`);
  }

  deleteTramite(tramite: string){
    
    console.log('eliminar tramite con ID: ',tramite);

  }
}
