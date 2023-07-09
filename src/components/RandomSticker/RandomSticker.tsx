import { IconButton } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images: string[] = [
  'fenrir_excite.gif',
  'alyss_bonk.gif',
  '下次再见.png',
  '幻剏悉研究V 03.gif',
  '幻剏悉研究V 09.gif',
  '幻剏悉研究V 10.gif',
  '幻剏悉研究V 12.gif',
  '幻剏悉研究V 13.gif',
  '幻剏悉研究V 14.gif',
  '幻剏悉研究V 15.gif',
  '幻剏悉研究V 16.gif',
  '幻塔1周年庆典 06.gif',
  '幻塔1周年庆典 13.gif',
  '幻塔1周年庆典 15.gif',
  '幻塔1周年庆典II 01.gif',
  '幻塔1周年庆典II 03.gif',
  '幻塔1周年庆典II 06.gif',
  '幻塔1周年庆典II 08.gif',
  '幻塔1周年庆典II 10.gif',
  '幻塔1周年庆典II 12.gif',
  '幻塔幸运时刻 07.gif',
  '幻塔幸运时刻 11.gif',
  '幻塔幸运时刻 13.gif',
  '幻塔拟态研究Ⅳ 11.gif',
  '幻塔拟态研究Ⅳ 16.gif',
  '幻塔拟态研究I 06.gif',
  '幻塔拟态研究I 16.gif',
  '幻塔拟态研究II 04.gif',
  '幻塔拟态研究III 14.gif',
  '幻塔拟态研究III 15.gif',
  '幻塔拟态研究III 16.gif',
  '节日快乐.png',
  '谁在看我.png',
  '集体阵亡.png',
];

export function RandomSticker({ size = 240 }: { size?: number }) {
  const [image, setImage] = useState<string>();

  const randomImage = () => {
    const nextImage = images[Math.floor(Math.random() * images.length)];
    if (nextImage !== image) {
      setImage(nextImage);
    } else {
      randomImage();
    }
  };

  useEffect(() => {
    randomImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imagePath = `/stickers/${image}`;

  return (
    <IconButton onClick={() => randomImage()}>
      {image && (
        <Image src={imagePath} alt={image} width={size} height={size} />
      )}
    </IconButton>
  );
}
