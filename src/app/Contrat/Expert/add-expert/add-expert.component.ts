import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ExpertService } from "../../ContratService/expert.service";
import { DomManipulationService } from "../../dom-manipulation.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-add-expert",
  templateUrl: "./add-expert.component.html",
  styleUrls: ["./add-expert.component.css"],
})
export class AddExpertComponent implements OnInit {
  errorMessage: string | null;
  successMessage: string;
  name_expert: string = "";
  lastname: string = "";
  email: string = "";
  telephone: string = "";
  company: string = "";
  id_expertise: number | null = null; // L'utilisateur doit choisir une expertise
  expertises: any[] = []; // Liste des expertises récupérées

  showExpertiseForm: boolean = false;
  // Propriété pour suivre l'état du basculement
  isMessageVisible: boolean = false;
  isAjouterVisible: boolean = true;
  selectedExpertId: string | null = null;
  isDetailsVisible: boolean = false;
  arrayUrl: string[];

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  expert: any[] = [];
  expertise: any[] = [];

  constructor(
    private router: Router,
    private expertService: ExpertService,
    private domManipulationService: DomManipulationService
  ) {
    this.arrayUrl = [
      "/createClient",
      "/familly",
      "/createAdmin",
      "/createExpert",
      "/createDirector",
    ];
  }

  ngOnInit(): void {
    this.getListExpert();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.checkAndSetNavbarWidth(currentUrl);
      });

    // Check the URL initially when the component is loaded
    this.checkAndSetNavbarWidth(this.router.url);
  }

  private checkAndSetNavbarWidth(currentUrl: string): void {
    const navbarWidth = this.arrayUrl.includes(currentUrl) ? "13rem" : "1rem";
    this.domManipulationService.setNavbarWidth(".navbarcontent", navbarWidth);
  }

  getListExpert() {
    this.expertService.getExpert().subscribe(
      (expert) => {
        this.expert = expert;
        console.log(this.expert);
      },
      (error) => {
        console.log("erreur", error);
      }
    );
  }

  toggleExpertiseForm() {
    this.showExpertiseForm = !this.showExpertiseForm;
  }

  cancel() {
    this.showExpertiseForm = false;
  }

  validate() {
    // Logique pour valider l'ajout d'une expertise
    this.showExpertiseForm = false;
  }
  goToListExpert(): void {
    const link = ["/listExpert"];
    this.router.navigate(link);
  }

  onButtonClickAddExpert(): void {
    this.isMessageVisible = !this.isMessageVisible;
    this.isAjouterVisible = !this.isAjouterVisible;
    const elements = document.querySelectorAll(".content_btnAddExpert");

    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.marginBottom = "0rem";
    });
  }

  onExpertChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedExpertId = selectElement.value;
    if (!this.selectedExpertId) {
      this.isDetailsVisible = false;
    }
    console.log("Selected expert ID:", this.selectedExpertId);
  }

  validerChoix(event: Event): void {
    if (
      this.selectedExpertId === null ||
      this.selectedExpertId === undefined ||
      this.selectedExpertId === "none"
    ) {
      this.isDetailsVisible = true;
    } else {
      if (
        this.selectedExpertId === null ||
        this.selectedExpertId === undefined ||
        this.selectedExpertId === "none"
      ) {
        this.selectedExpertId = this.selectedExpertId;
        console.log("Selected expert ID:", this.selectedExpertId);
      } else {
        this.selectedExpertId = this.selectedExpertId;
        this.isDetailsVisible = true;
        this.isDetailsVisible = false;
        this.isAjouterVisible = !this.isAjouterVisible;
        this.isMessageVisible = !this.isMessageVisible;
      }
    }
  }

  endChoix(event: Event): void {
    this.selectedExpertId = null;
    this.isDetailsVisible = false;
    this.isAjouterVisible = !this.isAjouterVisible;
    this.isMessageVisible = !this.isMessageVisible;
    console.log("Selected expert ID:", this.selectedExpertId);
  }

  addExpert(): void {
    this.errorMessage = null;
    if (!this.name_expert) {
      this.errorMessage = "le nom de l'expert est requis";
    }
    if (!this.lastname) {
      this.errorMessage = "le prenom est requis";
    }
    if (!this.emailPattern.test(this.email)) {
      this.errorMessage =
        "Action echoué : L'email doit etre au format @gmail.com";
      return;
    }
    if (!this.telephone) {
      this.errorMessage = "le numero de telephone est requis";
    }
    if (!this.company) {
      this.errorMessage = "le nom de la societé est requise";
    }
    if (!this.selectedExpertId) {
      this.errorMessage = "le nom de la societé est requise";
    }
    console.log(this.name_expert);
    console.log(this.lastname);
    console.log(this.email);
    console.log(this.telephone);
    console.log(this.selectedExpertId);
    console.log(this.company);

    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      return;
    }
    const newExpert = {
      name_expert: this.name_expert,
      lastname: this.lastname,
      email: this.email,
      telephone: this.telephone,
      company: this.company,
      id_expertise: this.selectedExpertId // On envoie uniquement l'ID de l'expertise
    };

    this.expertService.postExpert(newExpert).subscribe(
      (response) => {
        this.successMessage = 'Expert ajouté avec succès !';
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout de l\'expert';
        this.successMessage = '';
      }
    );
  }
}
