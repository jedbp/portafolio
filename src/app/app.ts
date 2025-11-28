import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // ========== INFORMACIÓN PERSONAL COMPLETA ==========
  userInfo = signal({
    nombreCompleto: 'Jesus Daniel Beltran Polo',
    titulo: 'Tecnologia en Sistemas',
    email: 'Jesusdanielbeltranpolo@gmail.com',
    telefono: '+57 3164509677',
    ubicacion: 'turbaco, colombia',
    foto: 'src/assets/images/imagen_perfil.jpg',
    acercaDe: 'Desarrollador de sistemas en formacion, aun sin experiencia laboral pero con muchas ganas de aprender y crecer profesionalmente. Apasionado por la tecnologia y el desarrollo de software.',
    redesSociales: [
      { nombre: 'GitHub', url: 'https://github.com/jedbp', icono: '🐱' },
      { nombre: 'LinkedIn', url: 'https://linkedin.com/in/TU_USUARIO_REAL', icono: '💼' }
    ]
  });

  // ========== INFORMACIÓN ACADÉMICA ==========
  educacion = signal([
    {
      institucion: 'Unitecnar',
      titulo: 'Tecnologia en Sistemas',
      periodo: '2023 - Presente',
      logros: ['Estudiante activo', 'Promedio destacado']
    }
  ]);

  // ========== HABILIDADES TÉCNICAS ==========
  habilidades = signal({
    lenguajes: ['Java', 'Python', 'HTML5', 'CSS'],
    frameworks: ['Angular', 'Node.js'],
    herramientas: ['Git', 'Visual Studio Code', 'NetBeans'],
    idiomas: [
      { idioma: 'Español', nivel: 'Nativo' },
      { idioma: 'Inglés', nivel: 'B1' }
    ]
  });

  // ========== 5 SIGNALS INTERACTIVOS ==========
  darkMode = signal(false);
  currentLanguage = signal('es');
  filtroHabilidades = signal('todos');
  visitCount = signal(0);
  contactForm = signal({
    nombre: '',
    email: '',
    mensaje: '',
    enviando: false
  });

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.incrementVisits();
  }

  ngOnInit() {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Cargar preferencia de tema desde localStorage
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme) {
        this.darkMode.set(savedTheme === 'true');
      }
      this.applyDarkMode();
    }
  }

  // ========== MÉTODOS ==========
  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
    if (isPlatformBrowser(this.platformId)) {
      this.applyDarkMode();
      // Guardar preferencia
      localStorage.setItem('darkMode', this.darkMode().toString());
    }
  }

  private applyDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.darkMode()) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }

  changeLanguage(lang: string) {
    this.currentLanguage.set(lang);
  }

  setFiltroHabilidades(tipo: string) {
    this.filtroHabilidades.set(tipo);
  }

  incrementVisits() {
    this.visitCount.update(count => count + 1);
  }

  updateContactForm(field: string, value: string) {
    this.contactForm.update(form => ({
      ...form,
      [field]: value
    }));
  }

  submitContactForm() {
    this.contactForm.update(form => ({ ...form, enviando: true }));
    setTimeout(() => {
      alert('¡Mensaje enviado con éxito!');
      this.contactForm.set({
        nombre: '',
        email: '',
        mensaje: '',
        enviando: false
      });
    }, 2000);
  }

  getHabilidadesFiltradas() {
    const filtro = this.filtroHabilidades();
    const habilidades = this.habilidades();

    if (filtro === 'todos') {
      return [
        ...habilidades.lenguajes.map(h => ({ tipo: 'lenguaje', nombre: h })),
        ...habilidades.frameworks.map(h => ({ tipo: 'framework', nombre: h })),
        ...habilidades.herramientas.map(h => ({ tipo: 'herramienta', nombre: h }))
      ];
    }

    // CORRECCIÓN: Manejar diferentes tipos de arrays
    const habilidadesArray = habilidades[filtro as keyof typeof habilidades];

    if (filtro === 'idiomas') {
      return (habilidadesArray as any[]).map((h: any) => ({
        tipo: filtro,
        nombre: `${h.idioma} - ${h.nivel}`
      }));
    }

    return (habilidadesArray as string[]).map((h: string) => ({
      tipo: filtro,
      nombre: h
    }));
  }
}
