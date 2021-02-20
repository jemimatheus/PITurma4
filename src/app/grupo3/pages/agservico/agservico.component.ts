import { Component, OnInit } from '@angular/core';
import { ResponseLojas } from '../../shared/model/lojas.model';
import { Servicos, ResponseServicos } from '../../shared/model/servico.model';
import { ServicoService } from '../../shared/service/servico.service';
import { LojaService } from '../../shared/service/lojas.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HorarioService } from '../../shared/service/horario.service';
import { Horario, ResponseDatas, DtHorario } from '../../shared/model/horario.model';
import { AgServico } from '../../shared/model/agservico.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agservico',
  templateUrl: './agservico.component.html',
  styleUrls: ['./agservico.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class AgservicoComponent implements OnInit {
  
  local: string; 
  idLoja: number; 
  idServico: number;
  horario: string;
  data: string; 
  agendamentos: AgServico[];
  servicos: Servicos[];
  ag: AgServico;

  cliente = JSON.parse(localStorage.getItem("cliente"));
  ehLogado = JSON.parse(localStorage.getItem("isLogado"));
  

  hrManha: string[]; //todos os horários da manhã
  hrTarde: string[]; //todos os horários da tarde
  hrNoite: string[]; //todos os horários da noite

  hrManhaExibir: string[]; //apenas horários disponíveis da manhã
  hrTardeExibir: string[]; //apenas horários disponíveis da tarde
  hrNoiteExibir: string[]; //apenas horários disponíveis da noite

  hrIndisp: string[]; //recebe os horários que já estão agendados

  exibir: boolean = false; //variavel que exibe os horários
  exibir2: boolean = false; //variavel que exibe a parte de data/hora
  tem: boolean;
  spinResponseLojas: boolean = false;
  spinResponseHoras: boolean = false;

  responseServicos : ResponseServicos; //recebe os serviços
  responseLojas : ResponseLojas[]; //recebe as lojas
  responseDatas : ResponseDatas[];

  constructor(private servicoService : ServicoService, private lojaService : LojaService, config: NgbModalConfig, private modalService: NgbModal, private horarioService : HorarioService, private router: Router) { 
    config.backdrop = 'static';
    config.keyboard = false;

    this.hrManha = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    this.hrTarde = ["15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
    this.hrNoite = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
    this.hrManhaExibir = new Array; 
    this.hrTardeExibir = new Array; 
    this.hrNoiteExibir = new Array; 
    this.agendamentos = new Array; 
    this.servicos = new Array;

  }

  ngOnInit(): void {
    this.listarServicos();
  }

  open(content) {
    this.modalService.open(content);
  }

  getLoja(id: number){
    this.idLoja = id; 
    console.log("Id seviço: "+ this.idServico);
    console.log("Id loja: "+id); 

    this.exibir2 = true;
  }

  getServico(id: number){
    this.idServico = id;
    console.log("Id serviço: "+id);
  }

  getHora(hora: string){
    this.horario = hora;
    console.log("Horario: "+hora);
  }

  listarServicos(){
    this.servicoService.getServicos().subscribe(
      response => {
        this.responseServicos = response;
      }
    )
  }

  buscarLojaPorLocal(){
    this.spinResponseLojas = true;
    this.lojaService.getLojasPorLocalidade(this.local).subscribe (
      response => {
        this.responseLojas = response;
        this.spinResponseLojas = false;
        if (response.length == 0){
          alert("Sua busca não retornou resultados");
        }
        
      }
    )
  }

  getHorasIndisponiveis(data: string){
    this.data = data;
    this.spinResponseHoras = true;

    this.horarioService.getHorasIndisponiveis(this.idLoja, data).subscribe(
      response => {
        this.hrIndisp = response;
        console.log(response);

        //comparando os horários 

        //horários manhã
        for(let m=0; m<6; m++){
          this.tem = false; 
          for(let i=0; i<this.hrIndisp.length; i++){
            if (this.hrManha[m].localeCompare(this.hrIndisp[i]) == 0){
              this.tem = true;
            }
          }
          if (this.tem == false){
            this.hrManhaExibir.push(this.hrManha[m]);
          }
        }

        //horários tarde
        for(let m=0; m<6; m++){
          this.tem = false; 
          for(let i=0; i<this.hrIndisp.length; i++){
            if (this.hrTarde[m].localeCompare(this.hrIndisp[i]) == 0){
              this.tem = true;
            }

          }
          if (this.tem == false){
            this.hrTardeExibir.push(this.hrTarde[m]);
          }
        }

        //horarios noite
        for(let m=0; m<6; m++){
          this.tem = false; 
          for(let i=0; i<this.hrIndisp.length; i++){
            if (this.hrNoite[m].localeCompare(this.hrIndisp[i]) == 0){
              this.tem = true;
            }

          }
          if (this.tem == false){
            this.hrNoiteExibir.push(this.hrNoite[m]);
          }
        }
        this.spinResponseHoras = false;
        this.exibir = true;
      }
    )
    console.log(this.hrIndisp);
    
    
  }
  
  salvarAgServico(){
    try{
      this.agendamentos = JSON.parse(localStorage.getItem("agendamentos"));
    }catch{
    }

    if(this.agendamentos == null){
      this.agendamentos = new Array;
    }

    //adicionar o agendamento atual no array de agendamentos 
    this.ag = new AgServico(); 
    this.ag.idLoja = this.idLoja;
   
    this.ag.idServico = this.idServico;
    this.ag.dtDataHora =  "02/02/2021 " + this.horario + ":00"; 
    console.log(this.ag.dtHr);
    console.log("Serviço salvo com sucesso!");
    this.agendamentos.push(this.ag) ;
    //depois enviar o array agendamentos para a pag de pagamentos. 
    localStorage.setItem("agendamentos", JSON.stringify(this.agendamentos));
    
    
  }

  concluirAgServico(callback: any){

    callback('Cross click');//fechar a modal

    if (this.idServico == null){
      alert('Não é possível salvar agendamento sem escolher um serviço')
    }else if (this.horario == null){
      alert('Não é possível salvar agendamento sem escolher um horário')
    }else{
      this.salvarAgServico();
      this.router.navigate(['/pagamento-servico']);
    }
    
  }

  novoAgServico(callback: any){
    callback('Cross click');//fechar a modal

    if (this.idServico == null){
      alert('Não é possível salvar agendamento sem escolher um serviço')
    }else if (this.horario == null){
      alert('Não é possível salvar agendamento sem escolher um horário')
    }else{
      this.salvarAgServico();
      window.location.reload();
    }
    
  }
  
}
