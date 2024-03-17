# BlinkIt-Backend-Xempla

## Run Locally

Clone the project

```bash
  git clone https://github.com/BiswayanPaul/BlinkIt-Backend-Xempla.git
```

Go to the Backend directory

```bash
  cd Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


#### Create Product:
- **Method**: POST
- **URL**: `{{base_url}}/create/product`
- **Body**:
  ```json
  {
      "p_name": "New Product",
      "price": 99.99,
      "amount": 10
  }
  ```

#### Read Retailer:
- **Method**: GET
- **URL**: `{{base_url}}/read/retailer`

#### Update Store:
- **Method**: PUT
- **URL**: `{{base_url}}/update/store/5fcbf6e5c017b405d04b18bc`
- **Body**:
  ```json
  {
      "product_list": [
          {
              "p_id": "3",
              "amount": 15
          },
          {
              "p_id": "6",
              "amount": 5
          }
      ]
  }
  ```

#### Delete Product:
- **Method**: DELETE
- **URL**: `{{base_url}}/delete/product/5fcbf6e5c017b405d04b18bc`
