declare type Coordinates = {
    lat: number;
    lng: number;
  };
  
declare type Address = {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
};
  
  declare type Hair = {
    color: string;
    type: string;
  };
  
declare type BankDetails = {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
};
  
declare type CompanyAddress = {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
};
  
declare type Company = {
    address: CompanyAddress;
    department: string;
    name: string;
    title: string;
  };
  
declare type CryptoDetails = {
    coin: string;
    wallet: string;
    network: string;
  };
  
declare type User = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    domain: string;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: BankDetails;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: CryptoDetails;
  };


  type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  
  export const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ]
  
declare type UserResult = {
  users: User[]
  total: number
  skip: number
  limit: number
}