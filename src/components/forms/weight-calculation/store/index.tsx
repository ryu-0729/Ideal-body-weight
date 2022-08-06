import {
  FC,
  useCallback,
  FormEvent,
  ChangeEvent,
  FocusEvent,
  useState,
} from 'react';
import { useFormik, FormikConfig } from 'formik';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';

import { useCalculationFuncs } from '@/hooks/useCalculationFuncs';

import Chart from '@/components/units/weight-calculation/chart';

type Param = {
  height: number
  weight: number
};

type BodyInfo = {
  appropriateWeight: string
  cosmeticWeight: string
  cinderellaWeight: string
};

const initialBodyInfo: BodyInfo = {
  appropriateWeight: '',
  cosmeticWeight: '',
  cinderellaWeight: '',
};

const StoreWeightCalculation: FC = () => {
  const [bodyInfo, setBodyInfo] = useState<BodyInfo>(initialBodyInfo);
  const { idealBodyWeight } = useCalculationFuncs();

  const onSubmitHandler = useCallback<FormikConfig<Param>['onSubmit']>(
    ({ height, weight }, isSubmitting) => {
      const result = idealBodyWeight(height, weight);
      setBodyInfo(result);
      isSubmitting.setSubmitting(false);
    },
    [idealBodyWeight],
  );

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
    isSubmitting,
  } = useFormik<Param>({
    initialValues: {
      height: 0,
      weight: 0,
    },
    enableReinitialize: true,
    // TODO: バリデーションの追加
    onSubmit: onSubmitHandler,
  });

  const onSubmitFormHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
  }, [handleSubmit]);

  const onChangeInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  }, [handleChange]);

  const onBlurInputHandler = useCallback((e: FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
  }, [handleBlur]);

  return (
    <Container maxWidth={false}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Card sx={{ height: '100%' }}>
            <CardHeader title="身長/体重入力フォーム" />
            <Divider />
            <CardContent>
              <form onSubmit={onSubmitFormHandler}>
                <Box
                  sx={{
                    height: 250,
                    position: 'relative',
                  }}
                >
                  <TextField
                    name="height"
                    fullWidth
                    label="身長"
                    margin="normal"
                    variant="outlined"
                    onBlur={onBlurInputHandler}
                    onChange={onChangeInputHandler}
                    value={values.height}
                    error={Boolean(touched.height && errors.height)}
                    helperText={touched.height && errors.height}
                  />
                  <TextField
                    name="weight"
                    fullWidth
                    label="体重"
                    margin="normal"
                    variant="outlined"
                    onBlur={onBlurInputHandler}
                    onChange={onChangeInputHandler}
                    value={values.weight}
                    error={Boolean(touched.weight && errors.weight)}
                    helperText={touched.weight && errors.weight}
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={!isValid || isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      理想の体重計算
                    </Button>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <Chart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StoreWeightCalculation;
