'use strict';

const createItems = () => {
  const items = Array.from(Array(15)).map((_, index) => ({
    description: `item-${index + 1}`,
    example: `example-${index + 1}`,
    resources: `resource-${index + 1}`,
    createdOn: new Date(),
    changedOn: new Date()
  }));
  return items;
};

const createCommands = (index) => ({
  type: `commandType-${index + 1}`,
  createdOn: new Date(),
  changedOn: new Date()
});

const generateDemodata = () =>
  Array.from(Array(100)).map((_, index) => ({
    ...createCommands(index),
    items: createItems()
  }));

const createDemodata = db => {
  return db.models.Command.bulkCreate(
    generateDemodata(),
    {
      include: [
        {
          model: db.models.CommandItem,
          as: 'items'
        },
      ]
    }
  );
}

module.exports = createDemodata;
