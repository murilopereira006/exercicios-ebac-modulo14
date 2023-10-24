/// <reference types="cypress" />
import contrato from '../contracts/usuario.contract'

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios',
          }).then(response => {
               contrato.validateAsync(response.body);
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios',
          }).then(response => {
               expect(response.status).to.equal(200);
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.cadastrarUsuarios("Linux da Silva", "linux@qa.com.br", "teste123", "true")
               .then(response => {
                    expect(response.status).to.equal(201);
                    expect(response.body.message).to.equal("Cadastro realizado com sucesso")
               })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuarios("Fulano da Silva", "fulano@qa.com", "teste", "true")
               .then(response => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message).to.equal("Este email já está sendo usado")
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.cadastrarUsuarios("Inacio", "inicaio@qa.com", "teste213", "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         body:
                         {
                              "nome": "nome",
                              "email": "email@email.com",
                              "password": "password",
                              "administrador": "false"
                         }
                    }).then(response => {
                         expect(response.status).to.equal(200);
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                    })
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.cadastrarUsuarios("Goku", "goku@qa.com", "teste213", "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,
                         body:
                         {
                              "nome": "nome",
                              "email": "email@email.com",
                              "password": "password",
                              "administrador": "false"
                         }
                    }).then(response => {
                         expect(response.status).to.equal(200)
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                    })
               })
     });


});
