import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, SegmentedControl, Checkbox, Button, Stack } from '@mantine/core';

import useMutation from '../hooks/useMutation';
import { ordersApi } from '../api/orders';
import type { CreateOrder } from '../types';

export const Route = createFileRoute('/zakazik')({
  component: OrderPage,
  validateSearch: (search: Record<string, any>) => ({
    productId: Number(search.productId ?? 0),
  }),
});

type OrderFormData = CreateOrder & {
  agreeWithTerms: boolean;
};

function OrderPage() {
  const { productId } = Route.useSearch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<OrderFormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      delivery: 'courier',
      productId,
      agreeWithTerms: false,
    },
  });

  const { mutate, data: createdOrder, isPending } = useMutation({
    queryFunction: ordersApi.create,
  });

  useEffect(() => {
    if (createdOrder) {
      navigate({ to: '/' });
    }
  }, [createdOrder, navigate]);

  const submitHandler = (values: OrderFormData) => {
    const { agreeWithTerms, ...orderData } = values;
    mutate(orderData);
  };

  const nameRules = {
    required: 'Обязательное поле',
    minLength: { value: 2, message: 'Минимум 2 символа' },
    pattern: { value: /^[А-ЯЁ][а-яё]+$/, message: 'Только кириллица, с заглавной буквы' },
  };

  return (
    <Stack gap="md" mt="xl" maw={420} mx="auto">
      <div>Товар ID: {productId}</div>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack gap="sm">
          <Controller
            control={control}
            name="firstName"
            rules={nameRules}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Имя"
                placeholder="Иван"
                error={errors.firstName?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={nameRules}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Фамилия"
                placeholder="Иванов"
                error={errors.lastName?.message}
                required
              />
            )}
          />

          <Controller
            control={control}
            name="delivery"
            render={({ field }) => (
              <SegmentedControl
                {...field}
                fullWidth
                data={[
                  { label: 'Курьерская доставка', value: 'courier' },
                  { label: 'Самовывоз', value: 'pickup' },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="agreeWithTerms"
            rules={{ required: 'Необходимо согласие' }}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                label="Согласен с условиями доставки и возврата"
                error={errors.agreeWithTerms?.message}
              />
            )}
          />

          <Button
            type="submit"
            loading={isPending}
            disabled={!isValid || isPending}
            fullWidth
            mt="md"
          >
            Оформить заказ
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}