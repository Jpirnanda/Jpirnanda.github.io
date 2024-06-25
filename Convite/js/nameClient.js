import { writeUserData } from './firebase.js'
import { listaClientes } from './lista.js'

// Função para obter o código (identificador) da URL
function getCodigoCliente() {
  var urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('c')
}

var codigoCliente = getCodigoCliente()

if (codigoCliente in listaClientes) {
  var cliente = listaClientes[codigoCliente]
  var cod = codigoCliente
  var nome = cliente.nome
  var cidade = cliente.cidade
  var celular = cliente.celular
  var quem_convidou = cliente.quem_convidou
  var cidade = cliente.cidade
  var obs = cliente.obs
  var classificacao = cliente.classificacao

  document.addEventListener('DOMContentLoaded', function () {
    const botao = document.getElementById('button')
    document.getElementById('clienteNome').textContent = nome + ','
    botao.addEventListener('click', function () {
      writeUserData(
        nome,
        cidade,
        celular,
        quem_convidou,
        obs,
        classificacao,
        cod,
      )
    })
  })
} else {
}
