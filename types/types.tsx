export interface Course {
   id: number;
   title: string;
   subtitle: string;
   url: string;
   is_paid: boolean;
   price: string;
   visibil_instructors: Instructor[];
   image_480x270: string;
   image_240x135: string;
   image_125_H: string;
   num_reviews: number;
   is_practise_test_course: boolean;
   published_title: string;
   tracking_id: string;
   local: {
      title: string;
      english_title: string;
      simple_english_title: string;
   }
   result: any;

}

export interface Instructor {
   id: number;
   title: string;
}