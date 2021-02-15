import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseContratos } from '../../shared/model/contrato';
import { PagamentoPlano } from '../../shared/model/pagamentoPlano';
import { ContratoService } from '../../shared/services/contrato-service';
import { PagamentoPlanoServiceService } from '../../shared/services/pagamento-plano-service.service';


@Component({
  selector: 'app-pagamento-plano',
  templateUrl: './pagamento-plano.component.html',
  styleUrls: ['./pagamento-plano.component.css']
})
export class PagamentoPlanoComponent implements OnInit {
  constructor(
  public contratoService: ContratoService,
  public pagamentoPlanoService: PagamentoPlanoServiceService,
  private router: Router 
  ) { }

  request: PagamentoPlano = {
    idUsuario: 14,
    idAgPaciente: 3
  }

  responseContratos : ResponseContratos [];
  idPlano

  ngOnInit(): void {
    this.listarContratoPorUsuario(6);
  }

  listarContratoPorUsuario(idUsuario: number){

    this.contratoService.buscarPlanosPaciente(idUsuario).subscribe(
      response => {
       this.responseContratos = response;
      }
    )
  }
    
    cadastrarPagtoPlano() {
      this.pagamentoPlanoService.cadastrarPlano(this.request).subscribe(
        response => {
          alert('plano cadastrado com sucesso');
          this.router.navigate(['/pagamento-plano']);
        },
        error => {
          alert('algo inesperado aconteceu');
        }
      )
    }
    salvarPagtoPlanoLs(){
      this.idAgPacienteString = this.idAgPacienteEscolhida.toString();
      localStorage.setItem("idAgPaciente", this.idAgPacienteString)
    }

  }


