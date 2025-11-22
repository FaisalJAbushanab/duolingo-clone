import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/hr.svg"
            alt="الكرواتية"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          الكرواتية
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/es.svg"
            alt="الإسبانية"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          الإسبانية
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/fr.svg"
            alt="الفرنسية"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          الفرنسية
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/it.svg"
            alt="الإيطالية"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          الإيطالية
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/jp.svg"
            alt="اليابانية"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          اليابانية
        </Button>
      </div>
    </div>
  );
};
