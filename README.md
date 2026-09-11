# TechTrader

A full-stack marketplace for buying and selling used and new tech devices (monitors, TVs, laptops, etc.). Traders can browse and search listings, register an account, add devices to a cart, check out, and list their own devices for sale. The backend is a Spring Boot REST API secured with RSA-signed JWTs issued by a self-hosted OAuth2 resource server; the frontend is a React + TypeScript SPA with Redux Toolkit for state management.

## Tech Stack

**Backend**
- Java 17, Spring Boot 3.2.5
- Spring Security + Spring OAuth2 Resource Server (JWT auth)
- Spring Data JPA / Hibernate
- PostgreSQL
- Lombok, Bean Validation (`spring-boot-starter-validation`)
- Maven (with Maven Wrapper)

**Frontend**
- React 18 + TypeScript, built with Vite
- Redux Toolkit + `redux-persist` for client-side state
- React Router
- Axios for API requests
- MUI, Bootstrap, styled-components/Emotion for UI

**Infra**
- Docker Compose for the local PostgreSQL instance

## Architecture

The backend follows a standard layered structure:

- **Controller layer** (`controller/`, `auth/`) — REST endpoints for auth, devices, listings, cart, and transactions
- **Service layer** (`service/`) — business logic (searching/paginating devices, managing carts, creating listings, processing purchases)
- **Repository layer** (`repository/`) — Spring Data JPA repositories over the entities below
- **Entity model** (`model/`) — `Trader`, `Device`, `Listing`, `Cart`, `Transaction`, `Order` (mapped as `purchase_order`), related by JPA associations (e.g. a `Trader` has one `Cart`, a `Listing` wraps a `Device`, a `Transaction` aggregates `Order`s)

**Authentication** is handled with RSA key-pair signed JWTs:
- `SecurityConfig` configures Spring Security as a stateless OAuth2 resource server, decoding/validating tokens with `NimbusJwtDecoder` against an RSA public key, and issuing them with `NimbusJwtEncoder` against the matching private key (`RsaKeyProperties`, loaded from `classpath:certs/`)
- `POST /api/auth/login` accepts HTTP Basic credentials, authenticates against a `JpaUserDetailsService`-backed `Trader`, and returns a `TokenService`-generated JWT (1-hour expiry, scope claim built from the trader's roles)
- Passwords are hashed with `BCryptPasswordEncoder`
- All endpoints other than device browsing, registration, and login require a valid bearer token

The frontend is a single-page app with route-based pages (`Home`, `ProductList`, `Product`, `Cart`, `Login`, `Register`) and two Redux slices (`userRedux`, `cartRedux`) whose state is persisted to local storage via `redux-persist`.

## Key Features

- **Device catalog & search** — browse by category/page, keyword search across title/type/specs, and price-range filtering, all paginated server-side (`DeviceController` / `DeviceService`)
- **Peer-to-peer listings** — authenticated traders can create, update, and delete their own device listings (`ListingController` / `ListService`)
- **Cart** — add/remove devices from a per-trader cart (`CartController` / `CartService`)
- **Checkout & order history** — purchase a cart's contents as a transaction, which aggregates individual orders and computes the total from each listing's device price and quantity (`Transaction.calculateTotal`)
- **JWT-based auth** — registration with validated input (`RegisterForm` + Bean Validation), login issuing a signed JWT, role-based authorization via Spring Security

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate (HTTP Basic) and receive a JWT |
| POST | `/api/trader/register` | Register a new trader |
| PUT | `/api/trader/update` | Update the authenticated trader's profile |
| GET | `/api/device/{device_id}` | Get a single device |
| GET | `/api/device/type/{type}/{page}` | List devices by type, paginated |
| GET | `/api/device/page/{page}` | List devices, paginated |
| GET | `/api/device/search/{keyword}/{page}` | Search devices by keyword |
| GET | `/api/device/price_between/{page}/{min}/{max}` | Filter devices by price range |
| GET | `/api/list` | Get the authenticated trader's listings |
| POST | `/api/list` | Create a listing |
| PUT | `/api/list` | Update a listing |
| DELETE | `/api/list/{id}` | Delete a listing |
| GET | `/api/cart` | Get the authenticated trader's cart |
| PUT | `/api/cart/add/{device_id}` | Add a device to the cart |
| PUT | `/api/cart/remove/{device_id}` | Remove a device from the cart |
| GET | `/api/transaction` | Get the authenticated trader's transaction history |
| POST | `/api/transaction` | Purchase the devices in a submitted list |

## Getting Started

### Prerequisites
- Java 17
- Node.js
- Docker (for PostgreSQL)

### Backend

```bash
cd backend
docker-compose up -d          # starts PostgreSQL on localhost:5432
./mvnw spring-boot:run         # runs the API on localhost:8080
```

The app expects an RSA key pair at `src/main/resources/certs/private.pem` and `public.pem` (referenced by `rsa.private-key` / `rsa.public-key` in `application.properties`) and connects to the `tech_trader_db` database defined in `docker-compose.yml`.

### Frontend

```bash
cd frontend
yarn install
yarn dev                       # runs the app on localhost:5173
```

## Screenshots

### Home Page
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/ca7744b2-5dae-4e32-851b-b71443c075fa)
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/44a036a9-ec00-4fc4-be00-ff50f9d13a07)
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/c996d4ac-3236-4f2f-bb4b-3fe429897d7b)
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/39246363-c805-40bf-9cff-7ae992758fc3)

### Product Page
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/2c0faf30-6cfb-4363-b43a-c39829420c77)

Detailed product view:
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/2277d13e-bea2-49e7-a5d4-2acd735d76db)

### Login Page
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/0c79ae39-8761-4c8c-a1e8-902a5e87f049)

Header after successful login:
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/1d83573d-a69a-4af8-8de4-d23663453cf6)

### Register Page
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/9586abd5-6958-4bd2-b359-e98f1c95a144)

### Cart Page
![image](https://github.com/mohassy/e-commerce_site/assets/118586460/2e3ef657-7ede-4246-b234-d7daa191588b)
