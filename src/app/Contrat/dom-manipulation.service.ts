import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomManipulationService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setNavbarWidth(selector: string, width: string): void {
    const navbar = document.querySelector(selector) as HTMLElement;
    if (navbar) {
      this.renderer.setStyle(navbar, 'width', width);
    }
  }
}
