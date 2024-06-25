// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import {
  push,
  getDatabase,
  ref,
  set,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClsYfI5lykFK43H_sMEQ0khZ80l424zJ8',
  authDomain: 'mudanca-cf.firebaseapp.com',
  databaseURL: 'https://mudanca-cf-default-rtdb.firebaseio.com',
  projectId: 'mudanca-cf',
  storageBucket: 'mudanca-cf.appspot.com',
  messagingSenderId: '636264863134',
  appId: '1:636264863134:web:70a57a19457f1c4f7b728f',
  databaseURL: 'https://mudanca-cf-default-rtdb.firebaseio.com',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

function writeUserData(
  nome,
  cidade,
  celular,
  quem_convidou,
  obs,
  classificacao,
  cod,
) {
  const db = getDatabase()
  const confirmadosRef = ref(db, 'confirmados/' + cod)

  // Defina os dados para o nó com o CPF sem pontos como chave
  set(confirmadosRef, {
    nome: nome,
    cidade: cidade,
    celular: celular,
    quem_convidou: quem_convidou,
    obs: obs,
    classificacao: classificacao,
  })
  // alert('Enviado com sucesso.')
}

export { writeUserData }
