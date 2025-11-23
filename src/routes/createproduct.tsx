import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm, Controller } from 'react-hook-form'
import { Select, TextInput, NumberInput, Button, Group, Title, Paper } from '@mantine/core'
import { productsApi } from '../api/products'
import type { FormCreateProduct } from '../api/products'

export const Route = createFileRoute('/createproduct')({
  component: CreateProductPage,
})

function CreateProductPage() {
  const navigate = useNavigate()
  const { mutate, isLoading, error, result } = productsApi.createProduct('/api/products');

  const { control, handleSubmit, formState } = useForm<FormCreateProduct>({
    defaultValues: {
      name: '',
      price: 0,
      oldPrice: 0,
      discount: 0,
      isNew: true,
      category: 'sneakers',
      brand: 'nike',
      likes: 0,
      orders: 0,
      sizes: [35, 36, 37],
    },
    mode: 'onChange'
  })
  if (result) navigate({ to: '/' })

  const onSubmit = (formData: FormCreateProduct) => {mutate(formData);};

  const validations = {
    name: { required: true, minLength: 2, pattern: /^[А-ЯЁ][а-яё]+/ },
    price: { required: true, min: 1 },
    oldPrice: { required: false, min: 1 },
    discount: { required: false, min: 0, max: 100 },
    select: { required: true },
    count: { required: true, min: 0 },
  }

const categories = [
    { value: '1', label: 'Обувь' },
    { value: '2', label: 'Одежда' },
  ]

  const brands = [
    { value: '1', label: 'Timberland' },
    { value: '2', label: 'Nike' },
  ]

  const fields = [
    { name: 'name', label: 'Название', placeholder: 'Ботинки', type: 'text' },
    { name: 'price', label: 'Цена', placeholder: '2990', type: 'number' },
    { name: 'oldPrice', label: 'Старая цена', placeholder: '3990', type: 'number' },
    { name: 'discount', label: 'Скидка (%)', placeholder: '25', type: 'number' },
    { name: 'category', label: 'Категория', placeholder: 'Выберите', type: 'select' },
    { name: 'brand', label: 'Бренд', placeholder: 'Выберите', type: 'select' },
    { name: 'likes', label: 'Лайки', placeholder: '0', type: 'number' },
    { name: 'orders', label: 'Заказы', placeholder: '0', type: 'number' },
  ] as const

  return (
    <Paper p="xl" shadow="sm" radius="md" className="max-w-md mx-auto mt-10">
    <Title order={2} mb="lg" ta="center">Создать товар</Title>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map(({ name, label, placeholder, type }) => (
        <Controller
          key={name}
          name={name as keyof FormCreateProduct}
          control={control}
          rules={
            name === 'name' ? validations.name :
              name === 'price' ? validations.price :
                name === 'oldPrice' ? validations.oldPrice :
                  name === 'discount' ? validations.discount :
                    (name === 'category' || name === 'brand') ? validations.select :
                      validations.count
          }
          render={({ field, fieldState }) => {
            if (type === 'text') {
              return (
                <TextInput
                  label={label}
                  placeholder={placeholder}
                  error={fieldState.invalid ? 'Некорректное значение' : undefined}
                  {...field}
                />
              )
            } else if (type === 'select') {
              const options = name === 'category' ? categories : brands
              return (
                <Select
                  label={label}
                  placeholder={placeholder}
                  data={options}
                  error={fieldState.invalid ? 'Выберите значение' : undefined}
                  value={field.value?.toString()}
                  onChange={(value) => field.onChange(value ? parseInt(value) : 0)}
                />
              )
            } else {
              return (
                <NumberInput
                  label={label}
                  placeholder={placeholder}
                  error={fieldState.invalid ? 'Некорректное значение' : undefined}
                  value={field.value as number}
                  onChange={(value) => field.onChange(value ?? 0)}
                />
              )
            }
          }}
        />
      ))}

      <Group justify="center" mt="md">
        <Button type="submit" loading={isLoading} disabled={!formState.isValid}>
          Создать
        </Button>
      </Group>
    </form>
  </Paper>
  )
}