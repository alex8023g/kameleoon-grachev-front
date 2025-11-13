import FileSaver from 'file-saver';
import { useCallback } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import styles from './styles.module.css';

export function DownLoadBtn({
  getPng,
  isLoading,
}: {
  getPng: (callback?: BlobCallback) => Promise<string | undefined>;
  isLoading: boolean;
}) {
  // const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();
    if (png) {
      FileSaver.saveAs(png, 'myChart.png');
    }
  }, [getPng]);

  return (
    <button className={styles.downloadBtn} onClick={handleDownload} disabled={isLoading}>
      <ArrowDownTrayIcon />
    </button>
  );
}
