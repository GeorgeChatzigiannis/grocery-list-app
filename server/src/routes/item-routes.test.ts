import { Request, Response } from 'express';
import {
  createRequest, createResponse, MockRequest, MockResponse,
} from 'node-mocks-http';
import itemRoutes from './item-routes';
import itemUtil from '../utils/item-utils';
import * as itemValidator from '../utils/item-validator';

describe('Item Routes', () => {
  let request: MockRequest<Request>;
  let response: MockResponse<Response>;
  describe('GET /items/all', () => {
    const items = [{id: 1, name: 'item1', isComplete: false}, {id: 2, name: 'item2', isComplete: false}];
    beforeEach(() => {
      request = createRequest();
      response = createResponse();
    });
    it('should return 200 OK', async () => {
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => items);
      await itemRoutes.getAll(request, response);
      expect(response.statusCode).toBe(200);
    });
    it('should return an array of list items', async () => {
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => items);
      await itemRoutes.getAll(request, response);
      expect(response._getJSONData()).toStrictEqual(items);
    });
    it('should return 500 if there was an error thrown', async () => {
      const err = new Error('Error');
      jest.spyOn(itemUtil, 'getAll').mockImplementation(() => {
        throw err;
      });
      await itemRoutes.getAll(request, response);
      expect(response.statusCode).toBe(500);
    });
  });
  describe('POST /items/add', () => {
    const items = [{id: 1, name: 'item1', isComplete: false}, {id: 2, name: 'item2', isComplete: false}];
    beforeEach(() => {
      request = createRequest({
        method: 'POST',
        body: {
          id: 3,
          name: 'item3',
          isComplete: false,
        }
      });
      response = createResponse();
    });
    it('should return 201 CREATED', async () => {
      const newItems = [...items, request.body];
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => []);
      jest.spyOn(itemUtil, 'addItem').mockImplementationOnce(() => {});
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => newItems);
      await itemRoutes.add(request, response);
      expect(response.statusCode).toBe(201);
    });
    it('should return an array including the new list item', async () => {
      const newItems = [...items, request.body];
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => []);
      jest.spyOn(itemUtil, 'addItem').mockImplementationOnce(() => {});
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => newItems);
      await itemRoutes.add(request, response);
      expect(response._getJSONData()).toStrictEqual(newItems);
    });
    it('should return 400 if there was a validation error', async () => {
      const validationErrors = ['error1', 'error2'];
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => validationErrors);
      await itemRoutes.add(request, response);
      expect(response.statusCode).toBe(400);
    });
    it('should return the validation errors when they occur', async () => {
      const validationErrors = ['error1', 'error2'];
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => validationErrors);
      await itemRoutes.add(request, response);
      expect(response._getJSONData()).toStrictEqual(validationErrors.join(', '));
    });
    it('should return 500 if there was an error thrown', async () => {
      const err = new Error('Error');
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => []);
      jest.spyOn(itemUtil, 'addItem').mockImplementation(() => {
        throw err;
      });
      await itemRoutes.add(request, response);
      expect(response.statusCode).toBe(500);
    });
  });
  describe('PUT /items/update', () => {
    const items = [{id: 1, name: 'item1', isComplete: false}, {id: 2, name: 'item2', isComplete: false}];
    beforeEach(() => {
      request = createRequest({
        method: 'PUT',
        body: {
          id: 2,
          name: 'new value',
          isComplete: false,
        }
      });
      response = createResponse();
    });
    it('should return 200 OK', async () => {
      const newItems = [...items];
      newItems[1] = request.body;
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => []);
      jest.spyOn(itemUtil, 'updateItem').mockImplementationOnce(() => {});
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => newItems);
      await itemRoutes.update(request, response);
      expect(response.statusCode).toBe(200);
    });
    it('should return an array including the new list item', async () => {
      const newItems = [...items];
      newItems[1] = request.body;
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => []);
      jest.spyOn(itemUtil, 'updateItem').mockImplementationOnce(() => {});
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => newItems);
      await itemRoutes.update(request, response);
      expect(response._getJSONData()).toStrictEqual(newItems);
    });
    it('should return 400 if there was a validation error', async () => {
      const validationErrors = ['error1', 'error2'];
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => validationErrors);
      await itemRoutes.update(request, response);
      expect(response.statusCode).toBe(400);
    });
    it('should return the validation errors when they occur', async () => {
      const validationErrors = ['error1', 'error2'];
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => validationErrors);
      await itemRoutes.update(request, response);
      expect(response._getJSONData()).toStrictEqual(validationErrors.join(', '));
    });
    it('should return 500 if there was an error thrown', async () => {
      const err = new Error('Error');
      jest.spyOn(itemValidator, 'validateItem').mockImplementationOnce(() => []);
      jest.spyOn(itemUtil, 'updateItem').mockImplementation(() => {
        throw err;
      });
      await itemRoutes.update(request, response);
      expect(response.statusCode).toBe(500);
    });
  });
  describe('DELETE /items/delete/:id', () => {
    const items = [{id: 1, name: 'item1', isComplete: false}, {id: 2, name: 'item2', isComplete: false}];
    beforeEach(() => {
      request = createRequest({
        method: 'DELETE',
        params: {
          id: 2,
        }
      });
      response = createResponse();
    });
    it('should return 200 OK', async () => {
      const newItems = [items[0]];
      jest.spyOn(itemUtil, 'deleteItem').mockImplementationOnce(() => {});
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => newItems);
      await itemRoutes.delete(request, response);
      expect(response.statusCode).toBe(200);
    });
    it('should return an array excluding the deleted item', async () => {
      const newItems = [items[0]];
      jest.spyOn(itemUtil, 'deleteItem').mockImplementationOnce(() => {});
      jest.spyOn(itemUtil, 'getAll').mockImplementationOnce(() => newItems);
      await itemRoutes.delete(request, response);
      expect(response._getJSONData()).toStrictEqual(newItems);
    });
    it ('should return 400 if there are validation errors', async () => {
      jest.spyOn(itemValidator, 'validateItemId').mockImplementationOnce(() => ['error1']);
      await itemRoutes.delete(request, response);
      expect(response.statusCode).toBe(400);
    });
    it('should return the validation errors when they occur', async () => {
      const validationErrors = ['error1'];
      jest.spyOn(itemValidator, 'validateItemId').mockImplementationOnce(() => validationErrors);
      await itemRoutes.delete(request, response);
      expect(response._getJSONData()).toStrictEqual(validationErrors.join(', '));
    });
    it('should return 500 if there was an error thrown', async () => {
      const err = new Error('Error');
      jest.spyOn(itemUtil, 'deleteItem').mockImplementation(() => {
        throw err;
      });
      await itemRoutes.delete(request, response);
      expect(response.statusCode).toBe(500);
    });
  });
});