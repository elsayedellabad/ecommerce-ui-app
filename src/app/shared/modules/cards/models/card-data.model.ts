export interface CardDataModel {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  price: number;
  // created_date: string;
  // updated_date: string;
  // published_date: string;
}

export function emptyCardData(): CardDataModel {
  return {
    title: '',
    category: '',
    imageUrl: '',
    description: '',
    price: 0
  }

}
