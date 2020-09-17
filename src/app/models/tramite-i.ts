export interface TramiteI {
    registro: {
        registro: string;
        nombre: string;
        monto: number;
    };
    hipoteca: {
        registro: string;
        nombre: string;
        monto: number;
    };
    fechaI: Date;
    activo: boolean;
    _id: string;
    cliente: {
        _id: string;
        nombre: string;
        apaterno: string;
        amaterno: string;
        rfc: string;
    };
    anio: number;
    tipo: {
        _id: string;
        nombre: string;
    };
    montoS: number;
    montoA: number;
    honorario: number;
    comentarios: string;
    usuarioAlta: {
        _id: string;
        nombre: string;
    };
    usuarioMod: {
        img: string;
        _id: string;
        nombre: string;
    };
    estado: {
        _id: string;
        estado: string;
    };
    modificacion: Date;
}
