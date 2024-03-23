import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Prodotto } from 'src/app/model/prodotto';

interface PreviewImageStyle {
  left?: string;
  top?: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  prodotti: Prodotto[] = [];
  showPreview = false;
  hoveredImageUrl = '';
  mouseX = 0;
  mouseY = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProdotti();
  }

  getProdotti() {
    this.http.get<Prodotto[]>('http://localhost:8080/api/prodotti').subscribe(
      (response) => {
        console.log(response);
        this.prodotti = response;
        console.log(this.prodotti);
      },
      (error) => {
        console.error('Errore durante il recupero dei prodotti:', error);
      }
    );
  }

  showPreviewImage(imageUrl: string, event: MouseEvent): void {
    this.showPreview = true;
    this.hoveredImageUrl = imageUrl;
  
    // Otteniamo le coordinate relative all'elemento padre dell'immagine (td)
    const boundingRect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const offsetY = event.clientY - boundingRect.top;
  
    // Aggiungiamo l'offset dello scroll della finestra
    this.mouseX = event.clientX - offsetX;
    this.mouseY = event.clientY - offsetY;
  }

  hidePreviewImage(): void {
    this.showPreview = false;
    this.hoveredImageUrl = '';
  }

  getPreviewImageStyle(): PreviewImageStyle {
    const pageWidth = window.innerWidth;
    const previewImageStyle: PreviewImageStyle = {};
  
    // Calcoliamo la posizione relativa alla finestra di visualizzazione
    const viewportWidth = document.documentElement.clientWidth;
    const scrollX = window.scrollX || window.pageXOffset;
    const cursorX = this.mouseX - scrollX;
  
    // Se il cursore è più vicino al bordo destro della finestra di visualizzazione, posiziona l'anteprima a sinistra del cursore
    if (cursorX > viewportWidth / 2) {
      previewImageStyle.left = cursorX - 200 + 'px'; // 200 è la larghezza dell'anteprima immagine
    } else {
      previewImageStyle.left = cursorX + 'px';
    }
  
    previewImageStyle.top = this.mouseY + 'px';
  
    return previewImageStyle;
  }
}
