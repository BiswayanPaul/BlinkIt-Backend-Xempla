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

Order Req Body :

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
        "p_id" : "p_1",
        "amount" : 1
    },{
        "p_id" : "p_2",
        "amount" : 5
    }]
}
```
add products : 
order req body : 
``` json
 { 
     "p_id" : "p_3",
     "r_id" : "rtlr_4",
    "p_name" : "Product 3",
    "price" : 20,
    "amount" : 10
}
```
add store :
order req body :
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
