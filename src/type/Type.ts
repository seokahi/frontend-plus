export interface PostUserProps {
    _id: number;
    name: string;
    profile: string;
}
  
export interface ProductImage {
    url: string;
    fileName: string;
    orgName: string;
}
  
export interface Product {
    name: string;
    image: ProductImage;
}
  
export  interface PostDetailProps {
    _id: number;
    title: string;
    content: string;
    tag: string;
    views: number;
    user: PostUserProps;
    type: string;
    createdAt: string;
    updatedAt: string;
    repliesCount: number;
    product: Product;
    image: string;
}


export interface PostRepliesProps {
    _id: number;
    user_id: number;
    user: PostUserProps;
    content: string;
    like: number;
    createAt: string;
    updateAt: string;
  }

  

export interface LocalStorageProps {
    _id: number,
  email: string,
  name:string,
  profileImage: string,
  accessToken: string,
  refreshToken: string
}