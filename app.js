'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost',
  state: {
    strictHeader: false
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => reply.response('API REST with Hapi 18.1.0').code(200)
});

server.route({
  method: 'GET',
  path: '/user/{id}',
  options: {
    validate: {
      params: {
        id: Joi.number().required()
      }
    }
  },
  handler: (request, reply) => {
    const user = {
      id: request.params.id,
      name: 'User Demo',
      lastname: 'User Demo Lastname'
    };

    return reply.response(user).code(200);
  }
});

server.route({
  method: 'POST',
  path: '/user',
  options: {
    validate: {
      payload: {
        name: Joi.string().required(),
        lastname: Joi.string().required()
      }
    }
  },
  handler: (request, reply) => {
    return reply.response(request.payload).code(201);
  }
});

server.route({
  method: 'PUT',
  path: '/user/{id}',
  options: {
    validate: {
      params: {
        id: Joi.number().required()
      },
      payload: {
        name: Joi.string().required(),
        lastname: Joi.string().required()
      }
    }
  },
  handler: (request, reply) => {
    Object.assign(request.payload, { id: request.params.id });
    return reply.response(request.payload).code(200);
  }
});

server.route({
  method: 'DELETE',
  path: '/user/{id}',
  options: {
    validate: {
      params: {
        id: Joi.number().required()
      }
    }
  },
  handler: (request, reply) => {
    const { id } = request.params;
    return reply.response(`User with id ${id} was deleted`).code(200);
  }
});

const init = async () => {
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

init();
