import styles from './styles.module.css';

export function Layout({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className={styles.layout} ref={ref}>
      {children}
    </div>
  );
}
