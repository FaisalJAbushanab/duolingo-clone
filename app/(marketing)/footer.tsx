import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/quests.svg"
            alt="أسئلة تدريبية"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          أحدث التجميعات لاختبار القدرات
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/leaderboard.svg"
            alt="تقدّمك"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          تابع تقدمك في كل مهارة
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/points.svg"
            alt="النقاط"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          نقاط وتجميع يحفّزك على الاستمرار
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/heart.svg"
            alt="الاستمرارية"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          مراجعة يومية خفيفة تناسب جدولك
        </Button>

        {/* <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/shop.svg"
            alt="خطط التدريب"
            height={32}
            width={40}
            className="ml-4 rounded-md"
          />
          خطط تدريب مرنة لطلاب الثانوية
        </Button> */}
      </div>
    </div>
  );
};
