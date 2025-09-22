# ✈️ Airport Information API

A backend system to retrieve detailed airport information based on the provided IATA code.  
This project is built using **Node.js**, **Express**, **TypeORM**, and **SQLite**, with a relational schema for Airports, Cities, and Countries.

---

## 📌 Objective
Design and implement a backend service that:
- Retrieves airport information by `iata_code`.
- Uses a relational database with three tables: **Airport**, **City**, and **Country**.
- Leverages TypeORM relations to fetch data efficiently using a **single query**.

---

## 🗂️ Database Schema

### 1. **Airport Table**
| Column        | Type      | Description                          |
|---------------|----------|--------------------------------------|
| `id`          | Integer  | Primary key                         |
| `icao_code`   | String   | ICAO code of the airport            |
| `iata_code`   | String   | IATA code of the airport            |
| `name`        | String   | Airport name                        |
| `type`        | String   | Type (small_airport, medium_airport, etc.) |
| `latitude_deg`| Float    | Latitude of the airport             |
| `longitude_deg`| Float   | Longitude of the airport            |
| `elevation_ft`| Integer  | Elevation in feet                   |
| `city_id`     | Integer  | Foreign key → City table            |

---

### 2. **City Table**
| Column    | Type     | Description                          |
|-----------|---------|--------------------------------------|
| `id`     | Integer | Primary key                         |
| `name`   | String  | City name                           |
| `is_active`  | Boolean | Active status (true, false)     |
| `country_id` | Integer | Foreign key → Country table     |
| `lat`   | Float   | Latitude of city                     |
| `long`  | Float   | Longitude of city                    |

---

### 3. **Country Table**
| Column               | Type     | Description                          |
|---------------------|---------|--------------------------------------|
| `id`               | Integer | Primary key                         |
| `name`             | String  | Country name                        |
| `country_code_two` | String  | ISO two-letter country code         |
| `country_code_three`| String | ISO three-letter country code       |
| `mobile_code`      | Integer | Mobile dialing code                 |
| `continent_id`     | Integer | Continent reference                 |

---

## 🔗 Relationships
- **Airport → City**: Many-to-One (Each airport belongs to a city)
- **City → Country**: Many-to-One (Each city belongs to a country)

---

## 🚀 API Endpoint

### **GET /api/airport/:iata_code**

Retrieves detailed airport information for the given IATA code.

#### Request Parameters:
| Parameter    | Type   | Required | Description |
|-------------|-------|----------|-------------|
| `iata_code` | String | ✅ | IATA code of the airport |

---

#### Example Request:
```http
GET /api/airport/AGR

#### Example Response:
{
  "airport": {
    "id": 145,
    "icao_code": "VIAG",
    "iata_code": "AGR",
    "name": "Agra Airport / Agra Air Force Station",
    "type": "medium_airport",
    "latitude_deg": 27.157683,
    "longitude_deg": 77.960942,
    "elevation_ft": 551,
    "address": {
      "city": {
        "id": 436,
        "name": "Agra",
        "country_id": 76,
        "is_active": true,
        "lat": 27.18,
        "long": 78.02
      },
      "country": {
        "id": 76,
        "name": "India",
        "country_code_two": "IN",
        "country_code_three": "IND",
        "mobile_code": 91,
        "continent_id": 1
      }
    }
  }
}

## 🛠️ Tech Stack

Node.js – Backend runtime
Express.js – Web framework
TypeORM – ORM for managing database and relations
SQLite – Lightweight database for storage
dotenv – Environment variable management

## ⚙️ Installation & Setup

### Clone the repository

git clone https://github.com/doondisunkara/airportBackend.git
cd airport-backend


### Install dependencies

npm install


### Configure Environment
Create a .env file in the root:

PORT=3000


### Build the project

npm run build


### Run the project

npm start