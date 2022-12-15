import { Request, Response } from 'express';
import logger from 'jet-logger';

import HttpStatusCodes from '../configurations/HttpStatusCodes';
import itemUtils from '../utils/item-utils';
import { validateItem, validateItemId } from '../utils/item-validator';

const paths = {
  basePath: '/items',
  get: '/all',
  add: '/add',
  update: '/update',
  delete: '/delete/:id',
} as const;


async function getAll(req: Request, res: Response) {
  try {
    const items = itemUtils.getAll();
    return res.status(HttpStatusCodes.OK).json(items);
  } catch (err) {
    logger.err(err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function add(req: Request, res: Response) {
  try {
    const newItem = req.body;
    const validationErrors = validateItem(newItem);
    if (validationErrors.length > 0) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json(validationErrors.join(', '));
    }
    itemUtils.addItem(newItem);
    const items = itemUtils.getAll();
    return res.status(HttpStatusCodes.CREATED).json(items);
  } catch (err) {
    logger.err(err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function update(req: Request, res: Response) {
  try {
    const updatedItem = req.body;
    const validationErrors = validateItem(updatedItem);
    if (validationErrors.length > 0) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json(validationErrors.join(', '));
    }
    itemUtils.updateItem(updatedItem);
    const items = itemUtils.getAll();
    return res.status(HttpStatusCodes.OK).json(items);
  } catch (err) {
    logger.err(err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

async function _delete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validationErrors = validateItemId(id);
    if (validationErrors.length > 0) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json(validationErrors.join(', '));
    }
    itemUtils.deleteItem(id);
    const items = itemUtils.getAll();
    return res.status(HttpStatusCodes.OK).json(items);
  } catch (err) {
    logger.err(err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
}

export default {
  paths,
  getAll,
  add,
  update,
  delete: _delete,
} as const;
