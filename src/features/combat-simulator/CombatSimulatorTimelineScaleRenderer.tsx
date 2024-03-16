export function CombatSimulatorTimelineScaleRenderer(props: { scale: number }) {
  const { scale } = props;
  const min = parseInt(scale / 60000 + '');
  const second = (((scale / 1000) % 60) + '').padStart(2, '0');
  return <>{`${min}:${second}`}</>;
}
