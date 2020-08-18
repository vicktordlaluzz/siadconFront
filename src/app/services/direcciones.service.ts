import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

    public estados;
    public municipios;
    private url = 'https://api-sepomex.hckdrk.mx/query';
  
    constructor(private http: HttpClient) { 
        this.getEstados();
    }

    getEstados(){
        const seccion = '/get_estados';
        this.http.get(this.url + seccion).subscribe((resp: any) => {
            this.estados = resp.response.estado;
        });
    }

    getMunicipios( estado: string ){
        const seccion = '/get_municipio_por_estado/';
        this.http.get(this.url + seccion + estado).subscribe((resp: any) => {
            this.municipios = resp.response.municipios;
        });
    }
}
