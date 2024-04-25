import { Component, OnInit, Renderer2 } from '@angular/core';
import { ClientService } from '../../ContratService/client.service';
import { ActivatedRoute ,Router} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  errorMessage: string | null;
  successMessage: string;
  code_client : string;
  business_area : string;
  company_name : string;
  parent_company_name : string;
  parametre: string;
  parametreId: string;
  parametreIsTrue: string;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.parametreId = this.route.snapshot.queryParams['edit'] || undefined;
    this.parametre = this.route.snapshot.queryParams['name'] || undefined;
  }

  ngAfterViewInit(): void {
    if(this.parametre){
      const titlePage = document.querySelector('.titrePage');

      this.renderer.setProperty(titlePage, 'innerText', 'Modifier un client');
      const storedData = localStorage.getItem("userData");

      if(storedData != null){
        const userData = JSON.parse(storedData);

        const codeClient = document.querySelector('#codeClient') as HTMLInputElement;
        const businessArea = document.querySelector('#businessArea') as HTMLInputElement;
        const companyName = document.querySelector('#companyName') as HTMLInputElement;
        const CompanyParent = document.querySelector('#companyParent') as HTMLInputElement;

        codeClient.value = userData.userCode;
        businessArea.value = userData.userBusiness;
        companyName.value = userData.userCompany;
        CompanyParent.value = userData.userParentCompanyName;

        console.log(userData);
      }
    }
  }

  createClient(): void {
    this.errorMessage = null; // Réinitialiser le message d'erreur à chaque fois que la méthode est appelée

    // Vérifier si les champs requis sont vides
    if (!this.code_client) {
      this.errorMessage = "Le champ 'Code Client' est requis!";
    }
    if (!this.business_area) {
      this.errorMessage = "Le champ 'Domaine d'activité' est requis!";
    }
    if (!this.company_name) {
      this.errorMessage = "Le champ 'Nom de l'entreprise' est requis!";
    }

    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      return;
    }

    const clientData = {
      code_client: this.code_client,
      business_area: this.business_area,
      company_name: this.company_name,
      parent_company_name: this.parent_company_name
    };

    this.clientService.postClient(clientData).subscribe(
      (response) => {
        this.successMessage = 'L\'action s\'est déroulée avec succès.';
          setTimeout(() => {
          this.goToListclient();
        }, 2000);
      },
      (err) => {
        this.errorMessage = 'L\'action s\'est déroulée a echoué.';
        if (err && err.error && err.error.message) {
          this.errorMessage += ' ' + err.error.message;
        }
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    );
  }

  updateClient(): void {

    const storedData = localStorage.getItem("userData");
    const codeClient = document.querySelector('#codeClient') as HTMLInputElement;
    const businessArea = document.querySelector('#businessArea') as HTMLInputElement;
    const companyName = document.querySelector('#companyName') as HTMLInputElement;
    const parentCompanyName = document.querySelector('#companyParent') as HTMLInputElement;
  
    if (storedData != null) {
      const userData = JSON.parse(storedData);
            console.log (userData);
      const idClient = document.querySelector('#idClient') as HTMLInputElement;
    
      const id = +idClient.value; // ID de l'administrateur à mettre à jour
      const data = {
        code_client: codeClient.value,
        business_area: businessArea.value,
        company_name: companyName.value,
        parent_company_name: parentCompanyName.value
      };
  
      this.clientService.postClientUpdate(id,data)
        .subscribe(
          (response) => {
            this.successMessage = 'Client mis à jour avec succès';
            setTimeout(() => {
              this.goToListclient();
            }, 2000);
            console.log('client mis à jour avec succès :', response);
            // Effectuez les actions nécessaires après la mise à jour réussie
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du client :', error);
            // Traitez les erreurs de mise à jour de l'administrateur
          }
        );
      
    }
}

goToListclient(){
  const link = ['/listeClient'];
  this.router.navigate(link);
}
}