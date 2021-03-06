const _extractOperator = (input: string): string => {
  return input.substring(4, input.length - 1);
};

const _extractConditions = (input: string): string[] => {
  return input.split(',');
};

const _extractValues = (input: string): string[] => {
  return input.split(':');
};

const extractFilter = (input: string): object => {
  const output = {
    operator: 'AND',
    conditions: [],
  };

  if (!input) {
    return output;
  }

  const raw = _extractOperator(input);
  const conditions = _extractConditions(raw);

  conditions.forEach(conditionObj => {
    const [fieldName, filter, value] = _extractValues(conditionObj);
    output.conditions.push({
      fieldName,
      filter,
      value,
    });
  });

  return output;
};

export default extractFilter;
