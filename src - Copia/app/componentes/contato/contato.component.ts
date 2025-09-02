import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
 
@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  ContatoForm: FormGroup;
  showAlert = false;
 
  constructor(private fb: FormBuilder) {
    this.ContatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
 
  ngOnInit(): void {
    emailjs.init("lSbGXiqPZ4Ib2qSIh"); // Inicializa o EmailJS neste ponto
  }
 
  async onSubmit(): Promise<void> {
    if (this.ContatoForm.valid) {
      console.log('Formulário válido:', this.ContatoForm.value);
      this.showAlert = true;
 
      // Prepara os dados que serão enviados para o EmailJS
      const formData = {
        from_name: this.ContatoForm.value.nome,         // Nome do usuário
        from_email: this.ContatoForm.value.email,       // E-mail do usuário
        message: this.ContatoForm.value.mensagem,       // Mensagem do formulário
        to_email: "projetocaritavotorantim@gmail.com" //email fixo que vai ser enviado
      };
 
      try {
        // Envia o formulário para o EmailJS
        const response = await emailjs.send("service_74bgz9g", "template_vk6coos", formData);
 
        console.log("Mensagem enviada com sucesso:", response);
        alert("Mensagem enviada com sucesso!"); // Mensagem de sucesso
        this.ContatoForm.reset(); // Reseta o formulário após o envio
      } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar mensagem. Tente novamente!");
      } finally {
        setTimeout(() => this.showAlert = false, 4000); // Reseta o alerta após 4 segundos
      }
    } else {
      console.log('Formulário inválido');
    }
  }
}