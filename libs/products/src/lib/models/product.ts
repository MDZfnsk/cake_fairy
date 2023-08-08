// import { Category } from './category';
// import { Store } from  '@cakefairy/stores';


// export class Store {
//     id?: string;
//     name?: string;
//     description?: string;
//     profileImage?: string;
//     owner?: string;
//   }

export class Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    images?: string[];  
    price: number;
    category?: string;
    store?: any;
    dateCreated?: Date;
}
