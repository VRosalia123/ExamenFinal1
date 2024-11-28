import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado, Empleados } from '../interface/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  link = 'http://localhost:3000/api/empleados'
  constructor(private http:HttpClient) { }

  getAllEmpleados():Observable<Empleados>{
    return this.http.get<Empleados>(`${this.link}`)
  }

  postEmpleado(newEmpleado: Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(`${this.link}`, newEmpleado)
  }

  putEmpleado(id:String, newEmpleado:Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(`${this.link}/${id}`, newEmpleado)
  }

  deleteEmpleado(id:String):Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.link}/${id}`)
  }
}
