export default (input: string): any => {
  if (input === undefined) {
    return [];
  }
  return input.split(',').map((val: string) => {
    const [column, order] = val.split(':');
    return {
      column,
      order,
    };
  });
};
