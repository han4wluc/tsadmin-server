import * as path from 'path';
import { Builder, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import { getConnection, getRepository } from 'typeorm';

const loadFixtures = async (fixturesPath: string) => {
  try {
    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(getConnection(), new Parser());

    for (const fixture of fixtures) {
      const entity: any = await builder.build(fixture);
      const repository = getRepository(fixture.entity);
      await repository.save(entity);
    }
  } catch (err) {
    console.warn('error', err);
    throw err;
  }
};

export default loadFixtures;
