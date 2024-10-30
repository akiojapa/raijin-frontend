import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule } from 'primeng/carousel'; 
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    CarouselModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: { ngSkipHydration: 'true' }
})
export class LoginComponent {

  loginForm: FormGroup;
  passwordFieldType: boolean = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // Dados fictícios para o carousel
  usersFeedbacks = [
    { name: 'João Silva', comment: 'Parabéns por entregar o projeto no prazo! Sua equipe fez um excelente trabalho de gerenciamento de tempo e comunicação com os outros departamentos.', rating: 5 },
    { name: 'Maria Souza', comment: 'Vi que você tem estado tendo dificuldade em se comunicar de forma clara e concisa em reuniões. Gostaria de sugerir que você pratique suas habilidades de comunicação e se prepare melhor para as reuniões.', rating: 4 },
    { name: 'Carlos Pereira', comment: 'Notamos que você tem sido muito eficiente em suas tarefas diárias, mas precisamos que você preste mais atenção nos detalhes. Gostaríamos de ver melhorias na precisão dos relatórios.', rating: 5 }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.toastService.success('Usuário logado com sucesso!');
          this.router.navigate(['/menu/chat']); // Navega para /menu/chat
        },
        error: (error: any) => {
          this.toastService.error('Erro ao logar usuário!');
        }
      });
    } else {
      if (this.loginForm.get('password')?.hasError('required')) {
        this.toastService.error('Por favor, insira a senha.');
      }
      if (this.loginForm.get('username')?.hasError('required')) {
        this.toastService.error('Por favor, insira o nome de usuário.');
      }
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = !this.passwordFieldType;
  }
}
