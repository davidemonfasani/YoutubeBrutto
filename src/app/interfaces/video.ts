export interface Video {
  id: number,
  titolo : string,
  descrizione : string,
  linkvideo : string,
  linkimage : string,
  utente_username : string,
  utente_pic: string| null,
  utente_id: number,
  utente_iscrizioni_count: number,
  visualizzazioni:number,
  created_at:string;
}
