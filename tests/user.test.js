const request = require('supertest');
const API_URL = "https://reqres.in"

describe('Testando requisições com o método GET', () => {

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

  it.skip('Valida o status 201, se o campo createdAt existe e as chaves/valores name, job, id', async () => {
    const data = {
      name: "morpheus",
      job: "leader",
      id: "127",
      createdAt: "2022-02-11T20:46:47.756Z"
    }
    await request(API_URL)
      .post('/api/users')
      .set('Accept', 'application/json/')
      .expect(201)
      .then(response => {
        expect(response.body).toContain(data.createdAt)
        // expect(response.body).toEqual(data)
      })
  })




    
})