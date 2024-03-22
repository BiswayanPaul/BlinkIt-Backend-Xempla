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


#### Create customer:
- **Method**: POST
- **URL**: `{{base_url}}/api/v1/customer/signup`
- **Body**:
  ```json
  {
    "c_name": "John Doe",
    "c_phone": 1234567890,
    "c_email": "john@example.com",
    "c_loc": [40.7128, -74.0060],
    "c_rating": 5,
    "c_password": "password123"
  }
  ```

<!-- #### Create deliveryPerson:
- **Method**: POST
- **URL**: `{{base_url}}/api/v1/create/deliveryPerson`
- **Body**:
  ```json
  {
    "d_id": "delivery001",
    "d_name": "David Johnson",
    "d_phone": 1112223333,
    "d_email": "david@example.com",
    "d_init_loc": [40.7128, -74.0060],
    "d_curr_loc": [40.7128, -74.0060],
    "d_rating": 4.8,
    "d_password": "deliverypassword123",
    "d_idle": true
  }
  ``` -->

#### Create Product:
- **Method**: POST
- **URL**: `{{base_url}}/api/v1/create/product`
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
- **URL**: `{{base_url}}/api/v1/read/retailer`

#### Create store :
- **Method**: POST
- **URL**: `{{base_url}}/api/v1/create/store`
- **Body**:
``` json
{
    "r_id" : "rtlr_5",
    "product_list": [
        {
            "p_id": "p_1",
            "amount": 8,
            "price" : 10
        },
        {
            "p_id": "p_5",
            "amount": 16,
            "price" : 24
        }
    ]
}
```


#### Update Store:
- **Method**: PATCH
- **URL**: `{{base_url}}/api/v1/update/store/5fcbf6e5c017b405d04b18bc`
- **Body**:
  ```json
  {
      "product_list": [
          {
              "p_id": "2",
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
- **URL**: `{{base_url}}/api/v1/delete/product/:id`

## Order Req Body :

```json
{
    "payment_mode" : "cash",
    "payment_status" : "pending", 
    "shipping_address" : {
        "street": "Shaktigarh",
        "area": "Jadavpur",
        "city": "Kolkata",
        "state": "West Bengal",
        "country": "India",
        "pincode": "700032"
    },
    "co_ordinates" : {
        "latt" : "22.49074978890007", 
        "long" : "88.36865439226197"
    },
    "products" : [{
        "p_id" : "1",
        "amount" : 1
    }]
}
```


