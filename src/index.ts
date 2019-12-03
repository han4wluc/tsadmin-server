

import { createApp } from './express'
import generator from './generator'
import {User} from './entity/User'


const main = async () => {
    const app = await createApp()
    const config = {
        models: [{
            label: 'users',
            entity: User,
            routes: {
                create: {
                    enabled: true
                },
                getMany: {
                    enabled: true
                }
            }
        }]
    }
    generator(app, config)
    app.listen(3000)
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
}


main().then(() => {
    console.log('started')
}).catch(() => {
    console.log('error')
})

