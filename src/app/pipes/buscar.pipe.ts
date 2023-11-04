import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {
  
   /**
   * Transform
   *
   * @param {any[]} data
   * @param {string} searchText
   * @param {string} searchColumnName
   *
   * @returns {any}
   */
   

    transform(data: any[], searchText: string, searchColumnName: string): any[] {
      if (!data) return [];
      if (!searchText) return data;
  
      searchText = searchText.toLowerCase();
      if (!searchColumnName) {
        return data.filter(obj =>{
          return Object.keys(obj).some(key => { 
            if (String(obj[key]) !== '[object Object]') {
              return String(obj[key]).toLowerCase().includes(searchText);
            }
            const data2 :any[] = [obj[key]];
            let salida : boolean = false;
            if (data2.filter(obj2 => Object.keys(obj2).some(key2 => String(obj2[key2]).toLowerCase().includes(searchText))) != null) {
              if (Object.keys(obj[key]).some(key2 => String(obj[key][key2]).toLowerCase().includes(searchText))) {
                salida = true;
              }
            }
            return salida;
          });
        });
      }
      return data.filter(filtrado => {
        return filtrado[searchColumnName].toLowerCase().includes(searchText);
      });
     }

  

}