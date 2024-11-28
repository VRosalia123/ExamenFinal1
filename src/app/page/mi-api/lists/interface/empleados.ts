export interface Empleados {
    empleados: Empleado[];
}

export interface Empleado {
    _id?:            string;
    nombreEmpleado: string;
    puesto:         string;
    salario:        number;
    estado:         string;
}
