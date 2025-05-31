import { NextSeo } from "next-seo";
import React from "react";

interface SeoProps {
  type:
    | "main"
    | "viewer"
    | "ranking"
    | "user"
    | "analyze"
    | "grade"
    | "skill"
    | "table";
  uid?: string;
  avatar?: string;
  nickname?: string;
}

export const Seo = ({ type, uid, avatar, nickname }: SeoProps) => {
  if (type === "main") {
    return (
      <NextSeo
        title="Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr",
          title: "Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }

  if (type === "analyze") {
    return (
      <NextSeo
        title="Analyze | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/analyze",
          title: "Analyze | Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }

  if (type === "grade") {
    return (
      <NextSeo
        title="Grade | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/grade",
          title: "Grade | Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }

  if (type === "ranking") {
    return (
      <NextSeo
        title="Ranking | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/ranking",
          title: "Ranking | Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }

  if (type === "skill") {
    return (
      <NextSeo
        title="段位認定 | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/skill",
          title: "段位認定 | Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }

  if (type === "table") {
    return (
      <NextSeo
        title="Table | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/table",
          title: "Table | Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }

  if (type === "viewer") {
    return (
      <NextSeo
        title="BMS Viewer | Asuma Toki"
        description="BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS"
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: "https://asumatoki.kr/tools/viewer",
          title: "BMS Viewer | Asuma Toki",
          description:
            "BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS",
          images: [
            {
              url: "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }

  if (type === "user") {
    return (
      <NextSeo
        title={`${nickname} | Asuma Toki`}
        description={`${nickname} BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS`}
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: `https://asumatoki.kr/user/${uid}`,
          title: `${nickname} | Asuma Toki`,
          description: `${nickname} BMS 난이도표, 발광BMS, 새틀라이트, 스텔라, 에리팩, 5key BMS, 5key Aery, Satelite, Stella, Insane BMS`,
          images: [
            {
              url: avatar
                ? `https://cdn.discordapp.com/avatars/${uid}/${avatar}`
                : "/assets/images/logo.png",
              width: 400,
              height: 400,
            },
          ],
        }}
      />
    );
  }
};
