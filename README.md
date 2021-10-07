# Тестовое задание

### Необходимые пакеты npm
    @nestjs/common
    @nestjs/config
    @nestjs/core
    @nestjs/platform-express
    @nestjs/swagger
    @nestjs/typeorm
    @types/multer
    swagger-ui-express
    typeorm
    pg
    aws-sdk
    class-transformer
    class-validator

### Необходимое окружение
- PostgreSQL
  - настроить конфигурацию в файле `.env`
- S3-хранилище данных
  - в данном случае используется AWS-S3
  - настроить конфигурацию в файле `.env` (предоставить пользователя для доступа)

### Перечисление запросов
TIP: подробное представление можно получить из Swagger, используя /api/
|№|Метод|URL|Описание|
|---|---|---|---|
|1|POST|/cats/create|Добавить новый экземпляр данных кота в БД|
|2|POST|/cats/update|Изменить информацию о коте по ID|
|3|GET|/cats/get/all|Получить список, содержащий всех котов|
|4|GET|/cats/get/one|Получить информацию о коте по ID|
|5|GET|/cats/get/booked|Получить список, содержащий всех забронированных котов|
|6|GET|get/available|Получить список, содержащий всех доступных для бронирования котов|
|7|DELETE|/cats/delete|Удалить информацию о коте по ID|
|8|POST|/cats/img_update/{id}|Загрузить изображение кота по ID из URL|
|9|DELETE|/cats/img_delete/{id}|Удалить изображение кота по ID из URL|

Примеры входных и выходных данных представлены изображениями и JSON в директории `examples`.

Пример содержания БД представлен на изображении ниже.
![image](https://user-images.githubusercontent.com/54914800/136454849-25ebd2dc-977e-4c7d-b118-008dd8f97d1a.png)
