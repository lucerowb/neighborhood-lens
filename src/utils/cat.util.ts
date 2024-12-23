import Cat1 from "@/assets/img/cat/cat-1.png";
import Cat2 from "@/assets/img/cat/cat-2.png";
import Cat3 from "@/assets/img/cat/cat-3.png";
import Cat4 from "@/assets/img/cat/cat-4.png";
import Cat5 from "@/assets/img/cat/cat-5.png";
import Cat6 from "@/assets/img/cat/cat-6.png";
import Cat7 from "@/assets/img/cat/cat-7.png";

export const getCatImage = (index: number) => {
  switch (index) {
    case 1:
      return Cat1;
    case 2:
      return Cat2;
    case 3:
      return Cat3;
    case 4:
      return Cat4;
    case 5:
      return Cat5;
    case 6:
      return Cat6;
    case 7:
      return Cat7;
    default:
      return Cat1;
  }
};
