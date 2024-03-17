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
    "p_id": "3",
    "r_id": "3",
    "p_name": "Headphones",
    "price": 99,
    "amount": 50
  }
  ```

#### Read Retailer:
- **Method**: GET
- **URL**: `{{base_url}}/read/retailer`

#### Update Store:
- **Method**: PATCH
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
