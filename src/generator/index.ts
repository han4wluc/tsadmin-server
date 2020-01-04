import * as express from 'express';
import * as cors from 'cors';
import * as serve from 'express-static';

import extractFilter from '../helpers/extractFilter';
import extractSort from '../helpers/extractSort';

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

const generate = (config, entitiesMap, getRepository): any => {
  const router = express.Router();

  router.use(cors());

  router.get('/entities', (req, res) => {
    const entities = config.models.map(model => {
      return {
        id: model.id,
        label: model.label,
        routes: model.routes,
        columns: entitiesMap[model.entity].toAdminJson().columns,
      };
    });
    res.status(200).json({
      entities,
    });
  });

  config.models.forEach(model => {
    const { label, entity, routes } = model;

    const Entity = entitiesMap[entity];
    const repository = getRepository(entity);

    if (routes.create && routes.create.enabled) {
      router.post(`/${label}`, async (req, res) => {
        const item = new Entity(req.body.data);
        await repository.save(item);
        res.status(201).json(item);
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
        const intermediateSortObj = extractSort(req.query.sort);
        const sortObj = _convertSortObj(intermediateSortObj);
        const [items, total] = await repository
          .createQueryBuilder(label)
          .where(filterObj)
          .take(take)
          .skip(skip)
          .orderBy(sortObj)
          .getManyAndCount();
        res.status(200).json({
          items,
          page: {
            num: pageNum,
            size: pageSize,
            total,
          },
          sort: intermediateSortObj,
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
        res.status(200).json(item);
      });
    }

    if (routes.updateOne && routes.updateOne.enabled) {
      router.patch(`/${label}/:id`, async (req, res) => {
        const { id } = req.params;
        const item = await repository.findOne(id);
        if (!item) {
          return res.status(404).send();
        }
        Object.keys(req.body.data).map(key => {
          const value = req.body.data[key];
          item[key] = value;
        });
        await repository.save(item);
        res.status(200).json(item);
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

export function admin() {
  return serve(__dirname + '/../../../static');
}
