export interface IDetailData {
  storeId: string;
  name: string;
  engName: string;
  socialLink: string | null;
  category?: string;
  address: string;
  detailAddress: string | null;
  nearestRoute: {
    subwayLine: string[] | null;
    routeInfo: string | null;
  } | null;
  operationTime: {
    day: string;
    startTime: string | null;
    endTime: string | null;
  }[];
  introduce: string | null;
  phoneNumber: string | null;
  coord: { lat: number; lng: number };
  description: string | null;
  concept: string[];
  updatedAt: Date;
  storeImages: {
    file_path: string;
    photoId: string;
    width: number;
    height: number;
  }[];
}
