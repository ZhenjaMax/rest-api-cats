# Тестовое задание

-  [Зависимости и окружение](#зависимости-и-окружение)
-  [Запуск](#запуск)

-  [Описание структур данных](#описание-структур-данных)
    - [createCatDTO](#createcatdto)
    - [getCatDTO](#getcatdto)
    - [updateCatDTO](#updatecatdto)
    - [Cat](#cat)

-  [Описание API-запросов](#описание-api-запросов)

## Зависимости и окружение
- зависимости указаны в `package.json`
- PostgreSQL
  - настроить конфигурацию в файле `.env`
- S3-хранилище данных
  - в данном случае используется AWS-S3
  - настроить конфигурацию в файле `.env` (предоставить пользователя для доступа)

## Запуск
- скачайте репозиторий
- перейдите в директорию с проектом
- `yarn install`
- для запуска, используйте: `yarn run start`

# Описание структур данных
TIP: далее считается, что поле обязательное по умолчанию.

## createCatDTO
DTO, необходимый для добавления кота в БД.
### Описание объекта
  - имя: string
  - порода: string
  - цвет: string
  - возраст: number
    - неотрицательное число
  - цена за час аренды: number
    - неотрицательное число
### Пример JSON для DTO
```json
{
	"name": "Тиша",
	"breed": "Британская голубая",
	"color": "Серый",
	"age": 666,
	"costPerHour": 100500
}
```

## getCatDTO
DTO, необходимый для получения информации о коте из БД.
### Описание объекта
  - идентификатор: number
    - целое неотрицательное число
    - ключевое поле отношения в базе данных
### Пример JSON для DTO
```json
{
	"id": 23
}
```

## updateCatDTO
DTO, необходимый для изменения информации кота в БД. Все поля, кроме идентификатора являются необязательными.
### Описание объекта
  - имя: string
    - необязательное поле
  - порода: string
    - необязательное поле
  - цвет: string
    - необязательное поле
  - возраст: number
    - необязательное поле
    - неотрицательное число
  - цена за час аренды: number
    - необязательное поле
    - неотрицательное число
  - статус аренды: boolean
    - необязательное поле
### Пример JSON для DTO
```json
{
	"id": 23
}
```

## Cat
Экземпляр данных кота. Включает в себя все поля БД.
### Описание объекта
  - идентификатор: number
    - неотрицательное число
    - primary key
  - имя: string
  - порода: string
  - цвет: string
  - возраст: number
    - неотрицательное число
  - цена за час аренды: number
    - неотрицательное число
  - статус аренды: boolean
  - URL изображения: string|null
  - название изображения: string|null
### Пример JSON для DTO
```json
{
	"id": 23,
	"name": "Тиша",
	"breed": "Британская голубая",
	"color": "Серый",
	"age": 6,
	"costPerHour": 100500,
	"isBooked": false,
	"imageURL": null,
	"imageName": null
}
```

# Описание API-запросов
## /cats/create (POST)
Добавляет новый экземпляр данных кота в БД. При добавлении, экземпляру присваивается ID.
### Входные данные
  - [createCatDTO](#createcatdto)
### Выходные данные
  - [Cat](#cat)
### Пример входных данных (JSON)
```json
{
	"name": "Тиша",
	"breed": "Британская голубая",
	"color": "Серый",
	"age": 666,
	"costPerHour": 100500
}
```
### Пример выходных данных (JSON)
```json
{
	"name": "Тиша",
	"breed": "Британская голубая",
	"color": "Серый",
	"age": 666,
	"costPerHour": 100500,
	"imageURL": null,
	"imageName": null,
	"id": 23,
	"isBooked": false
}
```

## /cats/update (POST)
### Входные данные
  - [updateCatDTO](#updatecatdto)
### Выходные данные
  - [Cat](#cat)
### Пример входных данных (JSON)
```json
{
	"id": 23,
	"age": 6
}
```
### Пример выходных данных (JSON)
```json
{
	"id": 23,
	"name": "Тиша",
	"breed": "Британская голубая",
	"color": "Серый",
	"age": 6,
	"costPerHour": 100500,
	"isBooked": false,
	"imageURL": null,
	"imageName": null
}
```

## /cats/get/all (GET)
Получить массив, содержащий все объекты котов из БД.
### Входные данные
  - нет
### Выходные данные
  - \[[Cat](#cat)]
### Пример выходных данных (JSON)
```json
[
    {
        "id": 2,
        "name": "Анатолий",
        "breed": "Неизвестно",
        "color": "Рыжий",
        "age": 6,
        "costPerHour": 5,
        "isBooked": false,
        "imageURL": null,
        "imageName": null
    },
    {
        "id": 4,
        "name": "Чубайс",
        "breed": "Кимрийская",
        "color": "Бело-рыжий",
        "age": 66,
        "costPerHour": 1000,
        "isBooked": true,
        "imageURL": null,
        "imageName": null
    }
]
```

## /cats/get/one (GET)
Получить информацию о коте из БД по идентификатору.
### Входные данные
  - [getCatDTO](#getcatdto)
### Выходные данные
  - [Cat](#cat)
### Пример входных данных
```json
{
	"id": 23
}
```
### Пример выходных данных (JSON)
```json
{
	"id": 23,
	"name": "Тиша",
	"breed": "Британская голубая",
	"color": "Серый",
	"age": 6,
	"costPerHour": 100500,
	"isBooked": false,
	"imageURL": null,
	"imageName": null
}
```

## /cats/get/booked (GET)
Получить массив, содержащий всех забронированных котов; является забронированным, если поле `isBooked` истинно.
### Входные данные
  - нет
### Выходные данные
  - \[[Cat](#cat)]
### Пример выходных данных (JSON)
```json
[
    {
        "id": 4,
        "name": "Чубайс",
        "breed": "Кимрийская",
        "color": "Бело-рыжий",
        "age": 66,
        "costPerHour": 1000,
        "isBooked": true,
        "imageURL": null,
        "imageName": null
    }
]
```

## /cats/get/available (GET)
Получить массив, содержащий всех доступных для бронирования котов; является забронированным, если поле `isBooked` ложно.
### Входные данные
  - нет
### Выходные данные
  - \[[Cat](#cat)]
### Пример выходных данных (JSON)
```json
[
    {
        "id": 11,
        "name": "Муха",
        "breed": "Манчкин",
        "color": "Чёрный",
        "age": 1,
        "costPerHour": 600,
        "isBooked": false,
        "imageURL": null,
        "imageName": null
    },
    {
        "id": 13,
        "name": "Шлёпа",
        "breed": "Большой русский кот",
        "color": "Русый",
        "age": 500,
        "costPerHour": 999999,
        "isBooked": false,
        "imageURL": null,
        "imageName": null
    }
]
```

## /cats/delete (DELETE)
Удалить информацию о коте из БД по ID.
### Входные данные
  - [getCatDTO](#getcatdto)
### Выходные данные
  - [Cat](#cat)
    - идентификатор заменяется на -1
### Пример входных данных
```json
{
	"id": 23
}
```
### Пример выходных данных (JSON)
```json
{
	"id": -1,
	"name": "Тиша",
	"breed": "Британская голубая",
	"color": "Серый",
	"age": 6,
	"costPerHour": 100500,
	"isBooked": false,
	"imageURL": null,
	"imageName": null
}
```

## /cats/img_update/{id} (POST)
Загрузить изображение кота по ID из URL. Изображение отправляется в хранилище AWS S3 Bucket.
### Входные данные
  - идентификатор кота
    - указывается в URL
  - изображение кота
    - формат PNG, JPG, JPEG
    - с параметром KEY=`file`
### Выходные данные
  - [Cat](#cat)
### Пример входных данных
  - URL: `/cats/img_update/24`
  - см. изображение `8.png`, `floppa.png` в директории `/examples/images`, `/examples/` соответственно
### Пример выходных данных (JSON)
```json
{
    "id": 24,
    "name": "Шлёпа",
    "breed": "Каракал (большой русский кот)",
    "color": "Русый",
    "age": 3,
    "costPerHour": 125,
    "isBooked": false,
    "imageURL": "https://awscatbucket.s3.us-east-2.amazonaws.com/24_floppa.png",
    "imageName": "24_floppa.png"
}
```

## /cats/img_delete/{id} (DELETE)
Удалить изображение кота по ID из URL. Изображение также удаляется из хранилища.
  - идентификатор кота
    - указывается в URL
 ### Выходные данные
  - [Cat](#cat)
### Пример входных данных
  - URL: `/cats/img_update/24`
### Пример выходных данных (JSON)
```json
{
	"id": 24,
	"name": "Шлёпа",
	"breed": "Каракал (большой русский кот)",
	"color": "Русый",
	"age": 3,
	"costPerHour": 125,
	"isBooked": false,
	"imageURL": null,
	"imageName": null
}
```
