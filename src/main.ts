/*Trae de la biblioteca oficial de Vue la función maestra llamada createApp (Crear Aplicación) */
import { createApp } from 'vue'

/*Carga globalmente nuestro archivo local de estilos personalizados*/
import './style.css'

/*Trae el componente principal llamado App.vue */
import App from './App.vue'


/*createApp(App) toma su componente principal (el cerebro y el esqueleto que analizamos)*/
/* (Montar en #app) le dice a Vue: "Busca en el archivo index.html un elemento que tenga 
el ID app (que usualmente es un <div id="app"></div> vacío) 
e inyéctale ahí adentro todo nuestro sistema modificado en tiempo real" */
createApp(App).mount('#app')
