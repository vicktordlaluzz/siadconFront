import { DireccionI } from './direccion-i';
export interface UsuarioI {
    _id: String;
    nombre: String;
    apaterno: String;
    curp: String;
    rfc: String;
    telefono: String;
    direccion: DireccionI;
    email: String;
    puesto: String;
    img?: String;
    amaterno?: String;
}
