
import {getRepository} from "typeorm";

import extractFilter from '../helpers/extractFilter'


const _converFilterObj = (input) => {
    const output = {}
    input.conditions.forEach((obj) => {
        const {
            fieldName,
            value
        } = obj
        output[fieldName] = value
    })
    return output
}

const generate = (app, config) => {    
    config.models.forEach((model) => {
        const {
            label, entity: Entity, routes
        } = model

        const repository = getRepository(Entity);

        if (routes.create && routes.create.enabled) {
            app.post(`/${label}`, async (req, res) => {
                const item = new Entity(req.body)
                await repository.save(item)
                res.status(201).json(item)
            })
        }

        if (routes.getMany && routes.getMany.enabled) {
            app.get(`/${label}`, async (req, res) => {
                const conditionsObj = extractFilter(req.query.filter)
                const filterObj = _converFilterObj(conditionsObj)
                console.warn('filterObj', filterObj)
                const items = await repository.find(filterObj);
                res.status(200).json({items})
            })
        }
    })
}

export default generate

