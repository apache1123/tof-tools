import Image from "next/image";

export function Logo() {
  return <Image src="/coco.png" alt="logo" width={50} height={50} priority />;
}
