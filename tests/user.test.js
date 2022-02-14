const request = require('supertest');
require('dotenv').config();
const API_URL = process.env.BASE_URL;

describe('Testando endpoints da API ReqRes', () => {

  it('Valida o status 200 e a quantidade de usuários retornados', async () => {
    await request(API_URL)
      .get('/api/users?page=2')
      .set('Accept', 'application/json/')
      .expect(200)
      .then(response => {
        expect(response.body.total).toEqual(12)
      })
  })

  it('Valida o status 200 e se existe um usuário com id:9', async () => {
    await request(API_URL)
      .get('/api/users?page=2')
      .set('Accept', 'application/json/')
      .expect(200)
      .then(response => {
        expect(response.body.data[2].id).toEqual(9)
      })
  })

  it('Valida status 200 e se retorna todos os campos da requisição', async () => {
    const data = {
      "data": {
          "id": 2,
          "email": "janet.weaver@reqres.in",
          "first_name": "Janet",
          "last_name": "Weaver",
          "avatar": "https://reqres.in/img/faces/2-image.jpg"
      },
      "support": {
          "url": "https://reqres.in/#support-heading",
          "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
      }
    }

    await request(API_URL)
      .get('/api/users/2')
      .set('Accept', 'application/json/')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(data)
      })
  })

  it('Valida o status 404 e o retorno de um objeto vazio', async () => {
    await request(API_URL)
      .get('/api/users/23')
      .set('Accept', 'application/json/')
      .expect(404)
      .then(response => {
        expect(response.body).toEqual({})
      })
  })

  it('Valida o status 201, se o campo createdAt existe e as chaves/valores name, job, id', async () => {
    const data = {
      name: "morpheus",
      job: "leader",
      id: "127",
      createdAt: "2022-02-14T16:18:52.640Z"
    }
    await request(API_URL)
      .post('/api/users')
      .set('Accept', 'application/json/')
      .send({
        "name": "morpheus",
        "job": "leader"
      })
      .expect(201)
      .then(response => {
        expect(response.body.name).toEqual(data.name)
        expect(response.body.job).toEqual(data.job)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
      })
  })

  it('Valida que foi retornado o status 204', async () => {
    await request(API_URL)
      .delete('/api/users/2')
      .set('Accept', 'application/json/')
      .expect(204)
  })

  it('Valida o status 200, e verifica se foi feito o login e retorna o token de auth', async () => {
    const data = {
      "token": "QpwL5tke4Pnpja7X4"
    }

    await request(API_URL)
      .post('/api/login')
      .set('Accept', 'application/json/')
      .send({
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
      })
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(data)
        console.log(data)
      })
  })

  it('Valida o status 200, quantidade de usuários retornados e se existe um id:3', async () => {
    await request(API_URL)
      .get('/api/users?delay=3')
      .set('Accept', 'application/json/')
      .expect(200)
      .then(response => {
        expect(response.body.total).toEqual(12)
        expect(response.body.data[2].id).toEqual(3)
      })
  })




    
})