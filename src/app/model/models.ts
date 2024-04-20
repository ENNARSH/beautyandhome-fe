export interface OrdineProdotto {
    prodottoId: number | undefined;
    quantita: number | undefined;
  }

  export interface OrdineCompleto {
    ordine: Ordine;
    ordineProdotti: OrdineProdotto[];
  }

  export interface Ordine {
    id?: number;
    nome: string;
    cognome: string;
    indirizzo: string;
    cap: string;
    provincia: string;
    comune: string;
    telefono: string;
    email: string;
    dataOrdine: Date;
    totale: number;
  }

  export interface Prodotto {
    id?: number;
    nome?: string;
    descrizione?: string;
    prezzo?: number;
    marca?: string;
    ml?: number;
    categoria?: string;
    immagine?: string;
    quantitaInCarrello?: number;
  }
  
  export interface PreviewImageStyle {
    left?: string;
    top?: string;
  }
  