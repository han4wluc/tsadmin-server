import { getRepository } from 'typeorm';
import * as cors from 'cors';
import { entitiesMap } from '~/entity';

import extractFilter from '~/helpers/extractFilter';

const _converFilterObj = (input): any => {
  const output = {};
  input.conditions.forEach(obj => {
    const { fieldName, value } = obj;
    output[fieldName] = value;
  });
  return output;
};

const generate = (app, config): any => {
  app.use(cors());

  app.get('/entities', (req, res) => {
    res.status(200).json({
      entities: config.models.map(model => {
        return {
          id: model.id,
          label: model.label,
          routes: model.routes,
          columns: entitiesMap[model.entity].toAdminJson().columns,
        };
      }),
    });
  });

  config.models.forEach(model => {
    const { label, entity, routes } = model;

    const Entity = entitiesMap[entity];

    const repository = getRepository(Entity);

    if (routes.create && routes.create.enabled) {
      app.post(`/${label}`, async (req, res) => {
        const item = new Entity(req.body);
        await repository.save(item);
        res.status(201).json(item);
      });
    }

    if (routes.getMany && routes.getMany.enabled) {
      app.get(`/${label}`, async (req, res) => {
        const conditionsObj = extractFilter(req.query.filter);
        const filterObj = _converFilterObj(conditionsObj);
        const items = await repository.find(filterObj);
        res.status(200).json({ items });
      });
    }

    if (routes.getOne && routes.getOne.enabled) {
      app.get(`/${label}/:id`, async (req, res) => {
        const { id } = req.params;
        const item = await repository.findOne(id);
        if (!item) {
          return res.status(404).send();
        }
        res.status(200).json(item);
      });
    }

    if (routes.updateOne && routes.updateOne.enabled) {
      app.patch(`/${label}/:id`, async (req, res) => {
        const { id } = req.params;
        const item = await repository.findOne(id);
        if (!item) {
          return res.status(404).send();
        }
        Object.keys(req.body).map(key => {
          const value = req.body[key];
          item[key] = value;
        });
        await repository.save(item);
        res.status(200).json(item);
      });
    }

    if (routes.delete && routes.delete.enabled) {
      app.delete(`/${label}/:id`, async (req, res) => {
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
};

export default generate;
