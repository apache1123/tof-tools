import { List, ListItem, ListItemText, Stack } from "@mui/material";
import type {
  TimelineAction,
  TimelineEffect,
  TimelineRow,
  TimelineState,
} from "@xzdarcy/react-timeline-editor";
import { Timeline } from "@xzdarcy/react-timeline-editor";
import { useRef } from "react";

import type { CombatSimulatorSnapshot } from "../../models/combat-simulator/combat-simulator-snapshot";
import { AttackBuffEventRenderer } from "./AttackBuffEventRenderer";
import { AttackEventRenderer } from "./AttackEventRenderer";
import { CombatSimulatorTimelineScaleRenderer } from "./CombatSimulatorTimelineScaleRenderer";
import styles from "./styles.module.css";

export interface CombatSimulatorTimelineRow extends TimelineRow {
  displayName: string;
}

export interface CombatSimulatorTimelineAction extends TimelineAction {
  displayName: string;
  effectId: CombatSimulatorTimelineEffectId;
}

export type CombatSimulatorTimelineEffectId = "attack-event" | "buff-event";
export interface CombatSimulatorTimelineEffect extends TimelineEffect {
  id: CombatSimulatorTimelineEffectId;
}

const effects: Record<
  CombatSimulatorTimelineEffectId,
  CombatSimulatorTimelineEffect
> = {
  "attack-event": {
    id: "attack-event",
  },
  "buff-event": {
    id: "buff-event",
  },
};

export interface CombatSimulatorTimelineProps {
  combatSimulatorSnapshot: CombatSimulatorSnapshot;
}

export function CombatSimulatorTimeline({
  combatSimulatorSnapshot,
}: CombatSimulatorTimelineProps) {
  const editorData: CombatSimulatorTimelineRow[] =
    combatSimulatorSnapshot.weaponAttacks
      .map<CombatSimulatorTimelineRow>((weaponAttack) => ({
        id: weaponAttack.weaponId,
        displayName: weaponAttack.weaponDisplayName,
        actions:
          weaponAttack.attackTimeline.events.map<CombatSimulatorTimelineAction>(
            (event, index) => ({
              id: `${weaponAttack.weaponId}-${index}`,
              displayName: event.attackDisplayName,
              start: event.startTime,
              end: event.endTime,
              effectId: "attack-event",
            }),
          ),
        classNames: [styles.timelineRow],
      }))
      .concat(
        combatSimulatorSnapshot.passiveAttacks.map((attack) => ({
          id: attack.id,
          displayName: attack.displayName,
          actions: attack.timeline.events.map((event, index) => ({
            id: `${attack.id}-${index}`,
            displayName: attack.displayName,
            start: event.startTime,
            end: event.endTime,
            effectId: "attack-event",
          })),
          classNames: [styles.timelineRow],
        })),
      )
      .concat(
        combatSimulatorSnapshot.buffs.map((buff) => ({
          id: buff.id,
          displayName: buff.displayName,
          actions: buff.timeline.events.map((event, index) => ({
            id: `${buff.id}-${index}`,
            displayName: `${buff.displayName}`,
            start: event.startTime,
            end: event.endTime,
            effectId: "buff-event",
          })),
          classNames: [styles.timelineRow],
        })),
      )
      .concat(
        combatSimulatorSnapshot.resources.map((resource) => ({
          id: resource.id,
          displayName: resource.displayName,
          actions: resource.timeline.events.map((event, index) => ({
            id: `${resource.id}-${index}`,
            displayName: `${resource.displayName} - Amount: ${event.amount}. Cumulated: ${event.cumulatedAmount}`,
            start: event.startTime,
            end: event.endTime,
            effectId: "buff-event",
          })),
          classNames: [styles.timelineRow],
        })),
      );

  const listRef = useRef<HTMLUListElement>(null);
  const timelineRef = useRef<TimelineState>(null);

  return (
    <Stack direction="row">
      <List
        ref={listRef}
        onScroll={(e) => {
          if (timelineRef.current) {
            const target = e.target as HTMLUListElement;
            timelineRef.current.setScrollTop(target.scrollTop);
          }
        }}
        sx={{ mt: "34px", height: 1166, overflow: "scroll" }}
      >
        {editorData.map((row, i) => (
          <ListItem key={i} sx={{ height: 32 }} disablePadding>
            <ListItemText
              primary={row.displayName}
              primaryTypographyProps={{ variant: "body2" }}
              sx={{ whiteSpace: "nowrap" }}
            />
          </ListItem>
        ))}
      </List>
      <Timeline
        editorData={editorData}
        effects={effects}
        disableDrag
        autoScroll={true}
        getActionRender={(action) => {
          const typedAction = action as CombatSimulatorTimelineAction;
          if (typedAction.effectId === "attack-event") {
            return <AttackEventRenderer action={typedAction} />;
          } else {
            return <AttackBuffEventRenderer action={typedAction} />;
          }
        }}
        scale={1000} // 10s
        getScaleRender={(scale) => (
          <CombatSimulatorTimelineScaleRenderer scale={scale} />
        )}
        style={{ width: "100%", height: 1200 }}
        ref={timelineRef}
        onScroll={({ scrollTop }) => {
          if (listRef.current) {
            listRef.current.scrollTop = scrollTop;
          }
        }}
      />
    </Stack>
  );
}
