import * as yup from 'yup';

const storeWeightCalculationSchemas = () => {
  return yup.object().shape({
    height: yup.number().required('身長の入力は必須です。'),
    weight: yup.number().required('体重の入力は必須です。'),
  });
};

export default storeWeightCalculationSchemas;
