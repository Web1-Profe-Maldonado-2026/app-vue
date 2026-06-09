<script setup lang="ts">
import { ref } from 'vue';

// 1. EL CONTRATO: Obligamos a que cada producto tenga una estructura idéntica
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  imagen: string;
}

// 2. EL INTERRUPTOR: Falso significa "bloqueado", verdadero significa "acceso concedido"
const isAuthenticated = ref<boolean>(false);

// 3. CAPTURA DE TECLADO: Variables reactivas conectadas al formulario
const username = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');

// 4. LA BASE DE DATOS LOCAL: Datos duros protegidos por el contrato
const listaProductos: Producto[] = [
  { 
    id: 101, 
    nombre: "Teclado Mecánico RGB", 
    precio: 250, 
    stock: 12, 
    imagen: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    id: 102, 
    nombre: "Mouse Óptico Inalámbrico", 
    precio: 110, 
    stock: 20, 
    imagen: "src/assets/images/teclado.jpg" 
  },
  { 
    id: 103, 
    nombre: "Monitor Gamer 24' 144Hz", 
    precio: 1450, 
    stock: 5, 
    imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400" 
  }
];

// 5. ACCIÓN A: Validar credenciales (El guardián)
const handleLogin = (): void => {
  // Comparamos el valor interno (.value) de lo escrito con nuestro usuario maestro
  if (username.value === 'felix.maldonado' && password.value === 'itpm2026') {
    isAuthenticated.value = true; // Movemos el interruptor a VERDADERO
    errorMessage.value = '';       // Limpiamos errores anteriores
  } else {
    errorMessage.value = '❌ Credenciales incorrectas. Intente de nuevo, colega.';
  }
};

// 6. ACCIÓN B: El Reto de Salida (Cerrar Sesión)
const handleLogout = (): void => {
  isAuthenticated.value = false; // El interruptor vuelve a FALSO, destruyendo el panel
  username.value = '';           // Limpieza de seguridad en memoria
  password.value = '';
};
</script>

<template>

  <div class="container mt-5" style="max-width: 600px; font-family: sans-serif;">

    <div v-if="!isAuthenticated" class="card shadow p-4">
      <h3 class="text-center mb-4">🔐 Control de Acceso - ITPM</h3>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label fw-bold">Usuario Docente</label>
          <input v-model="username" type="text" class="form-control" placeholder="felix.maldonado" required />
        </div>
        
        <div class="mb-3">
          <label class="form-label fw-bold">Contraseña</label>
          <input v-model="password" type="password" class="form-control" placeholder="••••••••" required />
        </div>

        <div v-if="errorMessage" class="alert alert-danger py-2 small text-center">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary w-100 fw-bold">Ingresar al Sistema</button>
      </form>
    </div>


    <div v-else class="card shadow p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="text-success m-0">🚀 Almacén Activo</h3>
        <button @click="handleLogout" class="btn btn-danger btn-sm fw-bold">Salir 🚪</button>
      </div>
      
      <p>Bienvenido, <strong>Lic. Félix Maldonado</strong>. Inventario verificado por TypeScript:</p>
      <hr />

      <!--<ul class="list-group">
        <li v-for="p in listaProductos" :key="p.id" class="list-group-item d-flex justify-content-between">
          <div>
            <strong>📦 {{ p.nombre }}</strong> <br>
            <small class="text-muted">Código Interno: {{ p.id }}</small>
          </div>
          <span class="badge bg-dark align-self-center py-2">
            Bs. {{ p.precio }} | Stock: {{ p.stock }} uds.
          </span>
        </li>
      </ul>-->
      <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
  <div v-for="p in listaProductos" :key="p.id" class="col">
    <div class="card h-100 shadow-sm border-0 bg-light">
      <img :src="p.imagen" class="card-img-top" :alt="p.nombre" style="height: 150px; object-fit: cover;">
      
      <div class="card-body p-3">
        <h6 class="card-title fw-bold mb-1">{{ p.nombre }}</h6>
        <p class="card-text text-muted small mb-2">ID: {{ p.id }}</p>
        
        <div class="d-flex justify-content-between align-items-center">
          <span class="badge bg-success">Bs. {{ p.precio }}</span>
          <span class="text-primary small fw-bold">{{ p.stock }} pzas.</span>
        </div>
      </div>
      
      <div class="card-footer bg-white border-0 p-2">
        <button class="btn btn-outline-dark btn-sm w-100">Gestionar Stock</button>
      </div>
    </div>
  </div>
</div>
    </div>

  </div>
</template>
