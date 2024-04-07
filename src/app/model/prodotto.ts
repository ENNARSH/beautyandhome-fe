export interface Prodotto {
  id?: number;
  nome?: string;
  descrizione?: string;
  prezzo?: number;
  marca?: string;
  quantita?: number;
  categoria?: string;
  immagine?: string;
  quantitaInCarrello?: number;
}

export interface PreviewImageStyle {
  left?: string;
  top?: string;
}
