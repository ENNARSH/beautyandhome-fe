import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prodotto } from 'src/app/model/prodotto';

interface PreviewImageStyle {
  left?: string;
  top?: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {

  prodotti: Prodotto[] = [];
  showPreview = false;
  hoveredImageUrl = '';
  mouseX = 0;
  mouseY = 0;
  selectedCategories: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.getProdottiFiltered('Fragranze maschili');
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

  getProdottiFiltered(categoria: string) {
    const url = `http://localhost:8080/api/prodotti/filtered?categoria=${categoria}`;
  
    this.http.get<Prodotto[]>(url).subscribe(
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

  toggleCategoryFilter(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }

    // Chiamata alla funzione per filtrare i prodotti
    this.filterProducts();
  }

  filterProducts() {
    // Implementa qui la logica per filtrare i prodotti in base alle categorie selezionate
    // Puoi utilizzare un servizio per recuperare i prodotti filtrati dal backend
    // Oppure puoi filtrare direttamente l'array `prodotti` presente nel componente
    // Assicurati di considerare sia le categorie selezionate che eventuali altri filtri applicati
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

  searchProducts(searchTerm: string): void {
    if (searchTerm.trim() !== '') {
      // Effettua la ricerca solo se il termine di ricerca non è vuoto
      this.prodotti = this.prodotti.filter(prodotto =>
        prodotto.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Se il termine di ricerca è vuoto, ripristina la lista completa dei prodotti
      this.getProdotti();
    }
  }

  onProductSelected(id: number) {
    this.router.navigate(['/catalog/details'], { queryParams: { id: id } }); // Navigation with query param
  }


}
