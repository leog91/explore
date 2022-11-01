import Link from "next/link";

interface CourseBase {
  name: string;
}

interface PaidCourse extends CourseBase {
  price: number;
  link?: never;
}

type PaidType = CourseBase;

interface FreeCourse extends CourseBase {
  price?: never;
  link: string;
}

type Course = FreeCourse | PaidCourse;

const myCourse: Course = {
  name: "233",
  // price: 123,
  link: "dddd",
};

type Pages = {
  url: string;
  label: string;
}[];

const pages: Pages = [
  { url: "aim", label: "aim" },
  { url: "shed", label: "shed" },
  { url: "playtime", label: "playtime" },
  { url: "admin", label: "admin" },
];

export default function Home() {
  return (
    <div className=" flex  flex-col justify-center items-center">
      <main className=" max-w-3xl   bg-gray-800 ">
        <h1 className="text-3xl font-bold underline bg-red-500">
          Hello world!
        </h1>
        <div className="flex flex-col items-center space-y-3 mt-4">
          {pages.map((p) => (
            <Link
              className="underline-offset-1 text-lg underline"
              key={p.url}
              href={p.url}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
