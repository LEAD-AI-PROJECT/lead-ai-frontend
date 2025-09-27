import { StaticImageData } from "next/image";
import newEvent1 from "@public/assets/img/home/news.event1.png";
import newEvent2 from "@public/assets/img/home/news.event2.png";
import newEvent3 from "@public/assets/img/home/news.event3.png";
import newEvent4 from "@public/assets/img/home/news.event4.png";

export interface HomeNewsEventItemProps {
     date?: string;
     description: string;
     link: string;
     title: string;
     image: StaticImageData;
     user: string;
}

export const HomeNewsEventItem: HomeNewsEventItemProps[] = [
     {
          image: newEvent1,
          user: "Skiff Team",
          title: "A list of services training AI on your data",
          description: "Companies known to use, sell, or share user data to train AI models.",
          link: "",
     },
     {
          image: newEvent2,
          user: "Guy Serfaty",
          title: "Skiff Calendar Widget on iOS",
          description: "The Skiff Calendar widget is now released on iOS!",
          link: "",
     },
     {
          image: newEvent3,
          user: "Richard Liu",
          title: "How to change your email address without losing crucial data—available solutions",
          description:
               "Is your current email address ready for a change Learn how to change your email address effortlessly using the available methods.",
          link: "",
     },
     {
          image: newEvent4,
          user: "Gilbert Zhang",
          title: "The best email clients for Mac—the ultimate guide",
          description:
               "Discover the best email clients for Mac. Compare the presented options and choose a convenient solution to streamline your inbox and increase productivity.",
          link: "",
     },
     {
          image: newEvent1,
          user: "Skiff Team",
          title: "A list of services training AI on your data",
          description: "Companies known to use, sell, or share user data to train AI models.",
          link: "",
     },
     {
          image: newEvent2,
          user: "Guy Serfaty",
          title: "Skiff Calendar Widget on iOS",
          description: "The Skiff Calendar widget is now released on iOS!",
          link: "",
     },
     {
          image: newEvent3,
          user: "Richard Liu",
          title: "How to change your email address without losing crucial data—available solutions",
          description:
               "Is your current email address ready for a change Learn how to change your email address effortlessly using the available methods.",
          link: "",
     },
     {
          image: newEvent4,
          user: "Gilbert Zhang",
          title: "The best email clients for Mac—the ultimate guide",
          description:
               "Discover the best email clients for Mac. Compare the presented options and choose a convenient solution to streamline your inbox and increase productivity.",
          link: "",
     },
];
