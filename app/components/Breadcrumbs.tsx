import React from "react";
import { prettifyPath, prettifyPathArray } from "../utils";
import { VscChevronRight, VscFolder } from "react-icons/vsc";
import Link from "next/link";


function Breadcrumbs({ path }: { path: string }) {
  const prettyPathArray = prettifyPathArray(path);
  return (
    <div className="flex gap-2 items-center px-4 pt-4 pb-6 from-black via-black/80 to-transparent bg-gradient-to-b absolute top-0 w-full opacity-90 z-10 text-lg">
      <VscFolder size={22} />
      <div className="flex flex-row w-full overflow-x-auto">
      {prettyPathArray.map((p, i, a) => {
        let link = "/";
        for (let c = 1; c <= i; c++) {
          link += a[c] + "/";
        }
        return (
          <div className="flex flex-row" key={i}>
            {!!(i > 0) && <VscChevronRight size={28} />}
            <Link href={prettifyPath(link)} className="text font-semibold text-nowrap">
              {p}
            </Link>
          </div>
        );
      })}</div>
    </div>
  );
}

export default Breadcrumbs;