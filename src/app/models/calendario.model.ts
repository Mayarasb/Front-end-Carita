export class Calendario {
  public id?: number;
  public title!: string;
  public start!: string;
  public end?: string;
  public description?: string | null;
  public address?: string | null;
  public idParceiro?: number;
  public idOrganizacao?: number;   

  public parceiro?: { nome: string };
  public organizacao?: { nome: string };
}