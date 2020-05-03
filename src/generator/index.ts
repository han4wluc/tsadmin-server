import * as express from 'express';
import * as cors from 'cors';
import { omit } from 'lodash';
import { Repository } from 'typeorm';

import extractFilter from '../helpers/extractFilter';
import extractSort from '../helpers/extractSort';

import * as bodyParser from 'body-parser';

const _converFilterObj = (input): any => {
  const output = {};
  input.conditions.forEach(obj => {
    const { fieldName, value } = obj;
    output[fieldName] = value;
  });
  return output;
};

const _convertSortObj = (input): any => {
  const output = {};
  input.forEach(sortObj => {
    const { column, order } = sortObj;
    output[column] = order.toUpperCase();
  });
  return output;
};

const generate = (config, entitiesMap, getRepository, authToken?): any => {
  const router = express.Router();

  router.use(cors());
  router.use(bodyParser.json());

  if (authToken) {
    router.use((req, res, next) => {
      if (req.headers['authorization'] !== `Bearer ${authToken}`) {
        res.status(401).send();
        return;
      }
      next();
    });
  } else {
    if (process.env.NODE_ENV !== 'testing') {
      console.warn(
        'authToken was not provided, the API is available to the public',
      );
    }
  }

  router.post('/authorize', (req, res) => {
    res.status(200).json({
      success: true,
    });
    return;
  });

  router.get('/entities', (req, res) => {
    const entities = config.models.map(model => {
      return {
        id: model.id,
        label: model.label,
        routes: model.routes,
        columns: model.columns,
      };
    });
    res.status(200).json({
      entities,
    });
  });

  config.models.forEach(model => {
    const { label, entity, routes, responseOmitAttributes = [] } = model;

    const Entity = entitiesMap[entity];
    const repository: Repository<any> = getRepository(entity);

    if (routes.create && routes.create.enabled) {
      let omitAttributes = routes.create.omitAttributes || [];
      omitAttributes = omitAttributes.concat([
        'id',
        'uuid',
        'createdAt',
        'updatedAt',
        'version',
      ]);
      router.post(`/${label}`, async (req, res) => {
        const data = omit(req.body.data, omitAttributes);
        const item = new Entity(data);

        const savedItem = await repository.save(item);
        const result = omit(
          JSON.parse(JSON.stringify(savedItem)),
          responseOmitAttributes,
        );
        res.status(201).json(result);
      });
    }

    if (routes.getMany && routes.getMany.enabled) {
      router.get(`/${label}`, async (req, res) => {
        const pageNum =
          req.query.pageNum === undefined ? 1 : parseInt(req.query.pageNum, 10);
        const pageSize =
          req.query.pageSize === undefined
            ? 10
            : parseInt(req.query.pageSize, 10);
        const take = pageSize;
        const skip = (pageNum - 1) * pageSize;
        const conditionsObj = extractFilter(req.query.filter);
        const filterObj = _converFilterObj(conditionsObj);

        const columns = model.columns;
        Object.keys(filterObj).forEach(key => {
          const value = filterObj[key];
          columns.forEach(column => {
            if (column.id === key) {
              if (column.type === 'boolean') {
                if (value === 'true') {
                  filterObj[key] = true;
                }
                if (value === 'false') {
                  filterObj[key] = false;
                }
              }
            }
          });
        });

        const intermediateSortObj = extractSort(req.query.sort);
        const sortObj = _convertSortObj(intermediateSortObj);

        const [items, total] = await repository.findAndCount({
          where: filterObj,
          take,
          skip,
          order: sortObj,
          relations: model.relations || [],
        });

        const resultItems = items.map(item => {
          return omit(JSON.parse(JSON.stringify(item)), responseOmitAttributes);
        });
        res.status(200).json({
          items: resultItems,
          page: {
            num: pageNum,
            size: pageSize,
            total,
          },
          sort: intermediateSortObj,
          filter: filterObj,
        });
      });
    }

    if (routes.getOne && routes.getOne.enabled) {
      router.get(`/${label}/:id`, async (req, res) => {
        const { id } = req.params;
        const item = await repository.findOne(id);
        if (!item) {
          return res.status(404).send();
        }
        const result = omit(
          JSON.parse(JSON.stringify(item)),
          responseOmitAttributes,
        );
        res.status(200).json(result);
      });
    }

    if (routes.updateOne && routes.updateOne.enabled) {
      router.patch(`/${label}/:id`, async (req, res) => {
        const { id } = req.params;
        const item = await repository.findOne(id);
        if (!item) {
          return res.status(404).send();
        }
        let omitAttributes = routes.updateOne.omitAttributes || [];
        omitAttributes = omitAttributes.concat([
          'id',
          'uuid',
          'createdAt',
          'updatedAt',
          'version',
        ]);
        const data = omit(req.body.data, omitAttributes);
        Object.keys(data).map(key => {
          const value = req.body.data[key];
          item[key] = value;
        });
        const updatedItem = await repository.save(item);
        const result = omit(
          JSON.parse(JSON.stringify(updatedItem)),
          responseOmitAttributes,
        );
        res.status(200).json(result);
      });
    }

    if (routes.delete && routes.delete.enabled) {
      router.delete(`/${label}/:id`, async (req, res) => {
        const { id } = req.params;
        const item = await repository.findOne(id);
        if (!item) {
          return res.status(404).send();
        }
        await repository.remove(item);
        res.status(200).send();
      });
    }
  });
  return router;
};

export default generate;
