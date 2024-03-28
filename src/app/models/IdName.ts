export class Fuels {
    id: number | null | undefined;
    name: string | null | undefined;
  //IdName - in loc de fuels, generic


    constructor (fuels: Fuels | null)
    {
      this.id = fuels?.id;
      this.name = fuels?.name;
    }
  
  }